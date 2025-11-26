import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatHeader } from '@entities/chat';
import type { ChatMessage } from '@features/chat/model';

describe('ChatHeader', () => {
  const { getByText, getByRole } = screen;
  const baseProps = {
    status: 'open' as const,
    messages: [] as ChatMessage[],
    getStatusLabel: jest.fn(() => 'Connected'),
    clearMessages: jest.fn(),
  };

  it('renders title and status label', () => {
    render(<ChatHeader {...baseProps} />);

    expect(getByText(/echo chat/i)).toBeInTheDocument();
    expect(getByText(/connected/i)).toBeInTheDocument();
  });

  it('disables clear button when there are no messages', () => {
    render(<ChatHeader {...baseProps} />);

    expect(
      getByRole('button', {
        name: /clear messages/i,
      })
    ).toBeDisabled();
  });

  it('enables clear button and calls clearMessages when clicked', async () => {
    const user = userEvent.setup();
    const clearMessages = jest.fn();

    render(
      <ChatHeader
        {...baseProps}
        messages={[
          {
            id: '1',
            text: 'hi',
            from: 'user',
            createdAt: new Date().toISOString(),
          } as ChatMessage,
        ]}
        clearMessages={clearMessages}
      />
    );

    const clearButton = getByRole('button', {
      name: /clear messages/i,
    });

    expect(clearButton).toBeEnabled();

    await user.click(clearButton);
    expect(clearMessages).toHaveBeenCalledTimes(1);
  });
});
