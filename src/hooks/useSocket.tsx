import { useCallback, useEffect, useRef } from 'react';

interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void;
  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
};

const useSocket = (url: string, options: IWSOptions) => {
  const socketRef = useRef<WebSocket | null>(null);

  /*
  const setSocketEvents = () => {
    const ws = socketRef.current;
    const {
      onMessage,
      onConnect,
      onError,
      onDisconnect
    } = options;

    if(ws) {
      ws.onmessage = typeof onMessage === 'function' ? onMessage : null;
      ws.onopen = typeof onConnect === 'function' ? onConnect : null;
      ws.onerror = typeof onError === 'function' ? onError : null;
      ws.onclose = typeof onDisconnect === 'function' ? onDisconnect : null;
    }
  };
  */

  const handleEvent = (handler: Function | undefined, event: Event | MessageEvent) => {
    if (typeof handler === 'function') {
      handler(event);
    }
  };

  const connect = useCallback(
    (token: string = '') => {
      socketRef.current = new WebSocket(`${url}?token=${token}`);

      socketRef.current.onmessage = (event: MessageEvent) => {
        const { onMessage } = options;
        handleEvent(onMessage, event);
      };

      socketRef.current.onopen = (event: Event) => {
        const { onConnect } = options;
        handleEvent(onConnect, event);
      };

      socketRef.current.onerror = (event: Event) => {
        const { onError } = options;
        handleEvent(onError, event);
      };

      socketRef.current.onclose = (event: Event) => {
        const { onDisconnect } = options;
        handleEvent(onDisconnect, event);
      };
    },
    [
      url,
      options
    ]
  );

  const disconnect = () => {
    const ws = socketRef.current;
    if (ws && typeof ws.close === 'function') {
      ws.close();
    };
  };

  /*
  useEffect(() => {
      setSocketEvents();
    },
    [
      socketRef,
      options
    ]
  );
  */

  useEffect(() => {
      return disconnect();
    },
    []
  );

  return {
    socketRef,
    connect
  };
};

export default useSocket;
