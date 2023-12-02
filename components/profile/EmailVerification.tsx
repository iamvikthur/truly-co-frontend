import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ApiError } from '../../lib/fetcher';
import { ButtonClose } from './ProfilePanel.styles';

const EmailVerification = () => {
  const router = useRouter();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!router.query.verify) return;

    fetch(`/api/verification`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: router.query.verify,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((_data) => {
        setStatus('Your email has been verified!');
      })
      .catch((error) => {
        setStatus(
          error.status === 422
            ? 'Your verification link is invalid. Please contact support'
            : 'An unexpected error occurred. Please try again later'
        );
      });
  }, [router.query.verify]);

  return (
    <>
      <ButtonClose style={{ display: 'block' }}>
        <Link href="/[[...story]]" as="/" passHref>
          <a></a>
        </Link>
      </ButtonClose>
      <h3 style={{ marginTop: '60px' }}>{status}</h3>
    </>
  );
};

export default EmailVerification;
