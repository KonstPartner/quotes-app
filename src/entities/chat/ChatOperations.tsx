import { FormEvent } from 'react';
import { Send } from 'lucide-react';

import { Button, Input } from '@shadcn';

type ChatOperationsProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (str: string) => void;
  isWaitingResponse: boolean;
  isOpen: boolean;
};

const ChatOperations = ({
  handleSubmit,
  value,
  setValue,
  isWaitingResponse,
  isOpen,
}: ChatOperationsProps) => {
  const isDisabled = isOpen || !value.trim() || isWaitingResponse;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border flex items-center gap-2 border-t px-3 py-2.5"
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type your message"
        disabled={isOpen}
        aria-label="Message"
      />
      <Button
        type="submit"
        size="icon"
        disabled={isDisabled}
        className="shrink-0 cursor-pointer"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default ChatOperations;
