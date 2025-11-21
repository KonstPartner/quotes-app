import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ChatMessage as ChatMessageType } from '@features/chat/model';

const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  const isUser = message.from === 'user';
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={twMerge(
        clsx('flex w-full', isUser ? 'justify-end' : 'justify-start')
      )}
    >
      <div
        className={twMerge(
          clsx(
            'max-w-[70%] space-y-2 rounded-xl px-3 py-2 text-sm shadow-sm',
            'bg-card text-foreground border-border rounded-bl-none border'
          )
        )}
      >
        <p className="wrap-break-word whitespace-pre-wrap">{message.text}</p>
        <div className="flex justify-between gap-5">
          <p className="text-muted-foreground text-[0.65rem] opacity-70">
            {time}
          </p>
          <span className="text-muted-foreground block text-[0.65rem] opacity-70">
            {isUser ? 'You' : 'Server'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
