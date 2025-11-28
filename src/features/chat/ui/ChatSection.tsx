import { Button } from '@shadcn';
import { ChatHeader, ChatOperations } from '@entities/chat';
import { ChatMain } from '@entities/chat';
import { useChat } from '@features/chat/model';

const ChatSection = () => {
  const {
    messages,
    status,
    clearMessages,
    isWaitingResponse,
    connect,
    handleSubmit,
    listRef,
    value,
    setValue,
  } = useChat();

  return (
    <section className="bg-card relative mx-auto flex h-[480px] w-full max-w-2xl flex-col rounded-2xl border shadow-sm">
      {status !== 'open' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40">
          <Button
            size="lg"
            className="cursor-pointer px-6 py-3 text-lg"
            onClick={connect}
            disabled={status === 'connecting'}
          >
            {status === 'connecting' ? 'Connecting…' : 'Start chat'}
          </Button>
        </div>
      )}

      <ChatHeader
        status={status}
        clearMessages={clearMessages}
        isDisabled={messages.length === 0}
      />

      <ChatMain listRef={listRef} messages={messages} />

      <ChatOperations
        handleSubmit={handleSubmit}
        isWaitingResponse={isWaitingResponse}
        setValue={setValue}
        isChatOpened={status === 'open'}
        value={value}
      />
    </section>
  );
};

export default ChatSection;
