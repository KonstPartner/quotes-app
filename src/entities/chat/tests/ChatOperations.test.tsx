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
    isChatOpened: false,
  };

  it('disables send button when chat is closed (isChatOpened = false)', () => {
    render(
      <ChatOperations
        {...baseProps}
        isChatOpened={false}
        value="Hello"
        isWaitingResponse={false}
      />
    );

    expect(getByRole('textbox', { name: /message/i })).toBeEnabled();
    expect(getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('disables send button when value is empty', () => {
    render(
      <ChatOperations
        {...baseProps}
        isChatOpened={true}
        value=""
        isWaitingResponse={false}
      />
    );

    expect(getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('disables send button when waiting for response', () => {
    render(
      <ChatOperations
        {...baseProps}
        isChatOpened={true}
        value="Hello"
        isWaitingResponse={true}
      />
    );

    expect(getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('updates value on input change', async () => {
    const user = userEvent.setup();
    const setValue = jest.fn();

    render(
      <ChatOperations {...baseProps} setValue={setValue} isChatOpened={true} />
    );

    await user.type(getByRole('textbox', { name: /message/i }), 'Hello');
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
        isChatOpened={true}
        isWaitingResponse={false}
      />
    );

    await user.click(getByRole('button', { name: /send message/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
