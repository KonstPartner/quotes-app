import { MessageCircle, RefreshCw, XCircle } from 'lucide-react';

import { Button } from '@shadcn';
import { ChatStatus } from '@features/chat/model';

type ChatHeaderProps = {
  status: ChatStatus;
  clearMessages: () => void;
  isDisabled: boolean;
};

const ChatHeader = ({ status, isDisabled, clearMessages }: ChatHeaderProps) => {
  const statusLabelStyles: Record<ChatStatus, string> = {
    open: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    connecting:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    closed: 'bg-destructive/15 text-destructive',
    error: '',
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting…';
      case 'open':
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="bg-primary text-primary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Echo Chat</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <RefreshCw
          className={`h-3.5 w-3.5 ${status === 'connecting' ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />

        <span
          className={
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] ' +
              statusLabelStyles[status] || statusLabelStyles.closed
          }
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {getStatusLabel()}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={clearMessages}
          disabled={isDisabled}
          className="h-7 w-7 cursor-pointer"
          title="Clear messages"
        >
          <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Clear messages</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
