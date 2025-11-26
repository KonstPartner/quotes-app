import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import type { ChatMessage, ChatStatus } from '@features/chat/model';
import { WEBSOCKET_URL } from '@constants';
import { createId } from '@utils';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('closed');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [value, setValue] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const cleanupSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupSocket();
    };
  }, []);

  const connect = useCallback(() => {
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    cleanupSocket();

    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;

    setStatus('connecting');
    setIsWaitingResponse(false);

    socket.onopen = () => {
      setStatus('open');
    };

    socket.onmessage = (event: MessageEvent) => {
      const text = String(event.data ?? '');

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          text,
          from: 'server',
          createdAt: new Date().toISOString(),
        },
      ]);
      setIsWaitingResponse(false);
    };

    socket.onerror = () => {
      setStatus('error');
      setIsWaitingResponse(false);
    };

    socket.onclose = () => {
      setStatus((prev) => (prev === 'error' ? 'error' : 'closed'));
      setIsWaitingResponse(false);
    };
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    if (isWaitingResponse) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        text: trimmed,
        from: 'user',
        createdAt: new Date().toISOString(),
      },
    ]);

    socket.send(trimmed);
    setIsWaitingResponse(true);
  };

  const clearMessages = () => setMessages([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) {
      return;
    }

    sendMessage(value);
    setValue('');
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return {
    messages,
    status,
    handleSubmit,
    clearMessages,
    isWaitingResponse,
    connect,
    listRef,
    value,
    setValue,
  };
};
