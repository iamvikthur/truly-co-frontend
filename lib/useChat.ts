import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MessageType } from './models';

const useChat = (active: boolean, userId: number) => {
  const router = useRouter();
  const chat = useRef({
    onOpen: () => undefined,
    onMessage: (_message) => undefined,
    onClose: () => undefined,
    send: (message) => ws.current?.send(JSON.stringify(message)),
  });
  const ws = useRef<WebSocket>();
  const reconnect = useRef(true);

  useEffect(() => {
    function connect() {
      if (active && router.query.d && userId) {
        reconnect.current = true;
        ws.current = new WebSocket(`wss://${location.hostname}/ws/chat/${router.query.d}`);

        ws.current.onopen = () => {
          console.log('chat opened');
          ws.current.send(
            JSON.stringify({ userId, token: 'token', type: MessageType.Auth, msg: '' })
          );
          chat.current.onOpen();
        };

        ws.current.onmessage = (event: MessageEvent) => {
          console.log('chat message received', JSON.parse(event.data));
          chat.current.onMessage(JSON.parse(event.data));
        };

        ws.current.onclose = (event) => {
          console.log('chat closed', event);
          if (reconnect.current) {
            console.log('reconnecting...');
            connect();
          } else {
            chat.current.onClose();
          }
        };
      } else {
        reconnect.current = false;
        ws.current?.close();
      }
    }
    connect();

    return () => ws.current?.close();
  }, [active, userId, router.query.d]);

  return chat.current;
};

export default useChat;
