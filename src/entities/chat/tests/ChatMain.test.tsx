import { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { ChatMain } from '@entities/chat';
import type { ChatMessage as ChatMessageType } from '@features/chat/model';

describe('ChatMain', () => {
  const { getByText } = screen;

  it('shows empty state when no messages', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ChatMain messages={[]} listRef={ref} />);

    expect(getByText(/conversation is empty/i)).toBeInTheDocument();
  });

  it('renders messages list when messages exist', () => {
    const ref = createRef<HTMLDivElement>();
    const messages: ChatMessageType[] = [
      {
        id: '1',
        text: 'Hello',
        from: 'user',
        createdAt: new Date().toISOString(),
      },
    ];

    render(<ChatMain messages={messages} listRef={ref} />);

    expect(getByText(/hello/i)).toBeInTheDocument();
  });
});
