import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatSection } from '@features/chat/ui';

jest.mock('@features/chat/model', () => ({
  useChat: jest.fn(),
}));

import { FormEvent } from 'react';

import { useChat } from '@features/chat/model';

const mockUseChat = useChat as jest.Mock;

const createMockChatState = (
  overrides: Partial<ReturnType<typeof mockUseChat>> = {}
) => ({
  messages: [],
  status: 'closed',
  getStatusLabel: jest.fn(() => 'Disconnected'),
  clearMessages: jest.fn(),
  isWaitingResponse: false,
  connect: jest.fn(),
  handleSubmit: jest.fn((e: FormEvent<HTMLFormElement>) => e.preventDefault()),
  listRef: { current: null },
  value: '',
  setValue: jest.fn(),
  ...overrides,
});

describe('ChatSection', () => {
  const { getByRole, queryByRole } = screen;

  it('shows overlay with Start chat when chat is not open', () => {
    mockUseChat.mockReturnValue(createMockChatState({ status: 'closed' }));

    render(<ChatSection />);

    expect(getByRole('button', { name: /start chat/i })).toBeInTheDocument();
  });

  it('calls connect when Start chat is clicked', async () => {
    const user = userEvent.setup();
    const connect = jest.fn();

    mockUseChat.mockReturnValue(
      createMockChatState({
        status: 'closed',
        connect,
      })
    );

    render(<ChatSection />);

    const button = getByRole('button', { name: /start chat/i });
    await user.click(button);

    expect(connect).toHaveBeenCalledTimes(1);
  });

  it('disables button and shows Connecting… when status is connecting', () => {
    mockUseChat.mockReturnValue(
      createMockChatState({
        status: 'connecting',
      })
    );

    render(<ChatSection />);

    const button = getByRole('button', { name: /connecting…/i });
    expect(button).toBeDisabled();
  });

  it('does not show overlay when chat is open', () => {
    mockUseChat.mockReturnValue(
      createMockChatState({
        status: 'open',
      })
    );

    render(<ChatSection />);

    expect(
      queryByRole('button', { name: /start chat/i })
    ).not.toBeInTheDocument();

    expect(getByRole('textbox', { name: /message/i })).toBeEnabled();
  });

  it('matches snapshot when chat is open with messages', () => {
    mockUseChat.mockReturnValue(
      createMockChatState({
        status: 'open',
        messages: [],
        getStatusLabel: jest.fn(() => 'Connected'),
      })
    );

    const { container } = render(<ChatSection />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
