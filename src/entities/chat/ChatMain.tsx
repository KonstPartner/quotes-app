import { RefObject } from 'react';

import { ChatMessage } from '@entities/chat';
import { ChatMessage as ChatMessageType } from '@features/chat/model';

const ChatMain = ({
  messages,
  listRef,
}: {
  messages: ChatMessageType[];
  listRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={listRef}
      className="from-background/60 to-background/30 flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-3"
    >
      {messages.length === 0 ? (
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Conversation is empty.
        </p>
      ) : (
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
      )}
    </div>
  );
};

export default ChatMain;
