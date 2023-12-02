import { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import FormInput from './profile/FormInput';
import { ButtonClose, ErrorMessage } from './profile/ProfilePanel.styles';
import useUser from '../lib/useUser';
import { isSSR } from '../lib/fetcher';

const MessageOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 6;
  cursor: url(/icons/cross-white.svg) 16 16, pointer;
`;

const Message = styled.div`
  position: absolute;
  width: 355px;
  min-height: 240px;
  padding: 20px 20px 0;
  background: #fff;
  border-radius: 4px;
  color: #000;
  z-index: 7;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2));
  // Fix bug in Safari
  transform: translateZ(0);

  img {
    display: inline-block;
    width: 50px;
    height: 25px;
  }

  & > p {
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 34px;
    line-height: 1.3;
    color: #181818;
  }

  form {
    margin-top: 19px;
    text-align: center;

    label + p {
      margin-top: 20px;
    }

    input[type='submit'] {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    input[type='submit'] + button {
      width: auto;
      line-height: 1;
      text-align: center;
      color: #181818;
      margin-bottom: 32px;
    }
  }
`;

const SubscribeMessage = () => {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState('');
  const timeoutID = useRef<number | undefined>();

  const showMessage = () => {
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => setActive(true), 15000);
  };

  useEffect(() => {
    const subscribed = JSON.parse(localStorage.getItem('subscribed'));
    const currentDate = new Date();
    const remindAgainDate = new Date(subscribed?.remindAgainDate) || null;

    if (!active && !subscribed?.value && !user?.email) {
      if (
        !subscribed ||
        (!subscribed?.value && remindAgainDate === null) ||
        remindAgainDate < currentDate
      ) {
        showMessage();
        window.addEventListener('click', showMessage);
        window.addEventListener('keypress', showMessage);
      }
    }

    return () => {
      window.removeEventListener('click', showMessage);
      window.removeEventListener('keypress', showMessage);
      clearTimeout(timeoutID.current);
    };
  }, [active, user?.email]);

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus('SUCCESS');
        const subscribed = { value: true, remindAgainDate: null };
        localStorage.setItem('subscribed', JSON.stringify(subscribed));
        timeoutID.current = setTimeout(() => setActive(false), 2000);
      } else {
        setStatus('ERROR');
      }
    };
    xhr.send(data);
  };

  const handleClose = () => {
    clearTimeout(timeoutID.current);
    setActive(false);

    const remindAgainDate = new Date();
    remindAgainDate.setHours(remindAgainDate.getHours() + 24);
    const subscribed = { value: false, remindAgainDate: remindAgainDate };
    localStorage.setItem('subscribed', JSON.stringify(subscribed));
  };

  return active && !user?.email ? (
    <>
      <MessageOverlay onClick={handleClose} />
      <Message>
        <ButtonClose onClick={handleClose} />
        {status === 'SUCCESS' ? (
          <p>
            Thank you!
            <br />
            We promise not to spam you, will just let you know once our stories are ready
          </p>
        ) : (
          <>
            <p>
              Get exclusive <img src="/images/logo-black.svg" alt="logo" /> Trulyco content in your
              inbox.
            </p>

            <form action="https://formspree.io/f/xayldqvr" method="POST" onSubmit={submitForm}>
              <FormInput name="email" placeholder="Email" type="email" required={true} />

              {status === 'ERROR' && (
                <ErrorMessage>
                  <b>
                    Ooops! There was an error. Please check your email and internet connection and
                    try again
                  </b>
                </ErrorMessage>
              )}

              <input type="submit" value="Submit" />
              <button onClick={handleClose}>Not today, thanks</button>
            </form>
          </>
        )}
      </Message>
    </>
  ) : null;
};

const Subscribe = () =>
  (!isSSR && (
    <ErrorBoundary fallback={<p>Couldn&apos;t load profile</p>}>
      <Suspense fallback={null}>
        <SubscribeMessage />
      </Suspense>
    </ErrorBoundary>
  )) ||
  null;

export default Subscribe;
