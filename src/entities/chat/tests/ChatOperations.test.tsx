import { FormEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatOperations } from '@entities/chat';

describe('ChatOperations', () => {
  const { getByRole } = screen;
  const baseProps = {
    handleSubmit: jest.fn((e: FormEvent<HTMLFormElement>) =>
      e.preventDefault()
    ),
    value: '',
    setValue: jest.fn(),
    isWaitingResponse: false,
    status: 'open' as const,
  };

  it('disables input and button when status is not open', () => {
    render(<ChatOperations {...baseProps} status="closed" />);

    expect(getByRole('textbox', { name: /message/i })).toBeDisabled();

    expect(getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('updates value on input change', async () => {
    const user = userEvent.setup();
    const setValue = jest.fn();

    render(<ChatOperations {...baseProps} setValue={setValue} />);

    const input = getByRole('textbox', { name: /message/i });

    await user.type(input, 'Hello');
    expect(setValue).toHaveBeenCalled();
  });

  it('calls handleSubmit when form is submitted with text', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e: FormEvent<HTMLFormElement>) =>
      e.preventDefault()
    );

    render(
      <ChatOperations
        {...baseProps}
        handleSubmit={handleSubmit}
        value="Hi there"
      />
    );

    const button = getByRole('button', { name: /send message/i });
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
