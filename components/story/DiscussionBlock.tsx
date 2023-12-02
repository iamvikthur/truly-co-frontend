import { useContext, useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { mutate } from 'swr';
import {
  ButtonComlain,
  ButtonSend,
  Chat,
  Discussion,
  Header,
  Message,
} from './DiscussionBlock.styles';
import { ButtonClose, ErrorMessage } from '../profile/ProfilePanel.styles';
import useUser from '../../lib/useUser';
import { ProfileContext } from '../../lib/context';
import { ApiError } from '../../lib/fetcher';
import useChat from '../../lib/useChat';
import Avatar from '../Avatar';
import { IncomingMessage, MessageType, OutgoingMessage } from '../../lib/models';

const DiscussionBlock = ({ discussion, active, onClose }) => {
  const router = useRouter();
  const { user } = useUser();
  const setIsProfileOpened = useContext(ProfileContext)[1];
  const [messages, setMessages] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const isMsgEmpty = !enteredText.trim().length;
  const [isSending, setIsSending] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const [complainId, setComplainId] = useState(-1);
  const [chatIsEmpty, setChatIsEmpty] = useState(false);

  const chat = useChat(active, user.id);

  chat.onOpen = () => {
    if (!isMsgEmpty && isSending) {
      sendMessage();
    }
  };

  chat.onMessage = (message) => {
    scrollDown();
    setMessages((msgs) => [...msgs, message]);
  };

  chat.onClose = () => {
    setMessages([]);
  };

  const scrollDown = () => {
    if (!container.current) return;
    const c = container.current;

    if (c.scrollTop + c.clientHeight >= c.scrollHeight) {
      setTimeout(() => c.scrollTo({ top: c.scrollHeight }));
    }
  };

  const sendMessage = () => {
    const message: IncomingMessage = {
      id: 0,
      date: new Date().toISOString(),
      text: enteredText.trim(),
      userId: user.id,
      userName: user.fullName,
      avatar: user.avatar,
    };
    const outMessage: OutgoingMessage = {
      userId: user.id,
      token: 'token',
      type: MessageType.Message,
      msg: enteredText.trim(),
    };
    setMessages((msgs) => [...msgs, message]);
    chat.send(outMessage);
    setEnteredText('');
    setIsSending(false);
  };

  const getMessages = (discussionId) => {
    if (!discussionId) return;

    fetch(`/api/messages?discussionId=${discussionId}&offset=0&limit=100`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((messages) => {
        const mappedMessages = messages.map((m) => ({
          id: m.messageId,
          date: m.sentAt,
          text: m.messageText,
          userId: m.userId,
          userName: m.userName,
          avatar: m.userAvatar,
        }));
        setMessages(mappedMessages);
      })
      .catch((error) => {
        console.warn('An unexpected error occurred. Please try again later', error);
      });
  };

  const getDiscussionId = () => {
    fetch(`/api/stories/${router.query.story}/discuss`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(discussion),
    })
      .then((response) => {
        if (!response.ok) throw new ApiError(response);
        return response.json();
      })
      .then((d) => {
        mutate(`/api/stories/${router.query.story}`);
        const url = { pathname: `/[[...story]]`, query: { d: d.discussionId } };
        router.push(url, `/${router.query.story}?d=${d.discussionId}`);
      })
      .catch((error) => {
        console.warn('An unexpected error occurred. Please try again later', error);
      });
  };

  const handleSendClick = () => {
    if (isMsgEmpty || isSending) return;

    setIsSending(true);

    if (router.query.d) {
      sendMessage();
    } else {
      getDiscussionId();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isSending) setEnteredText(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleOpenCloseComplain = (messageId: number) => {
    if (user?.role === 'Unverified email') return;
    setComplainId(messageId);
  };

  const handleSendComplain = () => {
    setIsSending(true);
    const msg: OutgoingMessage = {
      userId: user.id,
      token: 'token',
      type: MessageType.Report,
      msg: 'Complain',
      messageId: complainId,
    };
    chat.send(msg);
    setIsSending(false);
    // remove message after complaint
    setMessages((msgs) => msgs.filter((m) => m.id !== complainId));
    setComplainId(-1);
  };

  const formatDate = (date: string) => {
    return moment(date).calendar(null, {
      sameDay: '[]HH:mm',
      nextWeek: 'dddd',
      lastDay: '[Yesterday, ] HH:mm',
      lastWeek: 'MMM D, HH:mm',
      sameElse: 'MMM D, HH:mm',
    });
  };

  useEffect(() => {
    if (active && user?.email) getMessages(router.query?.d);
  }, [router.query?.d, active, user?.email]);

  useEffect(() => {
    setChatIsEmpty(active && !router.query?.d);
  }, [router.query?.d, active]);

  return (
    <Discussion active={active} onClick={() => complainId !== -1 && handleOpenCloseComplain(-1)}>
      <Header>
        <p>{discussion?.title || 'Discussion'}</p>
      </Header>
      <ButtonClose tabIndex={active ? 0 : -1} onClick={onClose} />
      <Chat overflow={complainId !== -1} forwardRef={container}>
        {chatIsEmpty ? (
          <p>We love conversations. Got thoughts, additions or questions? Be the first to share!</p>
        ) : (
          messages.map((m: IncomingMessage, key) => {
            const isMine = m.userId === user.id;
            return (
              <Message isComplained={complainId === m.id} key={key} mine={isMine}>
                {!isMine && (
                  <Avatar
                    id={m.userId || m.userName.length + m.avatar.length}
                    name={m.userName}
                    image={m.avatar}
                  />
                )}
                <p onClick={() => handleOpenCloseComplain(!isMine ? m.id : -1)}>{m.text}</p>
                <span>{formatDate(m.date)}</span>
                {!isMine && user?.role !== 'Unverified email' && user?.role !== 'Blocked' && (
                  <ButtonComlain visible={complainId === m.id} onClick={handleSendComplain} />
                )}
              </Message>
            );
          })
        )}
      </Chat>

      {user?.role === 'Blocked' ? (
        <ErrorMessage>
          <b>You are not allowed to send messages</b>
        </ErrorMessage>
      ) : !user?.email ? (
        <ErrorMessage>
          <b>
            Please <button onClick={() => setIsProfileOpened(true)}>sign in</button> to send a
            message
          </b>
        </ErrorMessage>
      ) : user?.role === 'Unverified email' ? (
        <ErrorMessage>
          <b>Please verify your email to send a message</b>
        </ErrorMessage>
      ) : (
        <textarea
          placeholder="Let’s discuss"
          tabIndex={active ? 0 : -1}
          value={enteredText}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        ></textarea>
      )}

      <ButtonSend
        disabled={isMsgEmpty || isSending}
        visible={!isMsgEmpty && !isSending}
        onClick={handleSendClick}
      />
    </Discussion>
  );
};

export default DiscussionBlock;
