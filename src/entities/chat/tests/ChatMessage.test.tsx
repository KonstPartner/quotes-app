import { render, screen } from '@testing-library/react';

import { ChatMessage } from '@entities/chat';
import type { ChatMessage as ChatMessageType } from '@features/chat/model';

describe('ChatMessage', () => {
  const { getByText } = screen;
  const baseMessage: ChatMessageType = {
    id: '1',
    text: 'Test message',
    from: 'user',
    createdAt: new Date('2024-01-01T12:20:00Z').toISOString(),
  };

  it('renders user message with label "You"', () => {
    render(<ChatMessage message={baseMessage} />);

    expect(getByText(/test message/i)).toBeInTheDocument();
    expect(getByText(/you/i)).toBeInTheDocument();
  });

  it('renders server message with label "Server"', () => {
    render(
      <ChatMessage message={{ ...baseMessage, from: 'server' as const }} />
    );

    expect(getByText(/server/i)).toBeInTheDocument();
  });
});
