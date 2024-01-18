import {
  useRef,
  useEffect,
  useCallback,
  MutableRefObject
} from 'react';

interface ISocketHook {
  socketRef: MutableRefObject<WebSocket | null>;
  connect: (token: string | undefined) => void;
  disconnect: () => void;
};

interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void;
  onConnect?: () => void;
  onError?: () => void;
  onDisconnect?: (event: CloseEvent) => void;
};

const useSocket = (url: string, options: IWSOptions): ISocketHook => {
  const socketRef = useRef<WebSocket | null>(null);

  const handleEvent = (handler: Function | undefined, event: Event | CloseEvent | MessageEvent) => {
    if (typeof handler === 'function') {
      handler(event);
    }
  };

  const connect = useCallback(
    (token: string | undefined = '') => {
      socketRef.current = new WebSocket(token ? `${url}?token=${token}` : url);

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

      socketRef.current.onclose = (event: CloseEvent) => {
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

  useEffect(() => {
    return disconnect();
  }, []);

  return {
    socketRef,
    connect,
    disconnect
  };
};

export default useSocket;
