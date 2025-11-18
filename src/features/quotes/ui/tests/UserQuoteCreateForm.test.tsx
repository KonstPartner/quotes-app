import React, { FormEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useCreateQuoteForm from '@features/quotes/model/useCreateQuoteForm';

import CreateQuoteForm from '../CreateQuoteForm';

jest.mock('@features/quotes/model/useCreateQuoteForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseCreateQuoteForm = useCreateQuoteForm as jest.MockedFunction<
  typeof useCreateQuoteForm
>;

describe('UserQuoteCreateForm', () => {
  beforeEach(() => {
    mockedUseCreateQuoteForm.mockReturnValue({
      quote: '',
      author: '',
      setQuote: jest.fn(),
      setAuthor: jest.fn(),
      handleSubmit: async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      },
      isPending: false,
      error: null,
      isDisabled: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields and submit button', () => {
    render(<CreateQuoteForm />);

    expect(
      screen.getByRole('heading', { name: /add your quote/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/quote/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /save quote/i })
    ).toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', async () => {
    const user = userEvent.setup();

    const handleSubmitMock = jest.fn(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }
    );

    mockedUseCreateQuoteForm.mockReturnValueOnce({
      quote: 'Test quote',
      author: 'Test author',
      setQuote: jest.fn(),
      setAuthor: jest.fn(),
      handleSubmit: handleSubmitMock,
      isPending: false,
      error: null,
      isDisabled: false,
    });

    render(<CreateQuoteForm />);

    const button = screen.getByRole('button', { name: /save quote/i });

    await user.click(button);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('disables submit button when isDisabled is true', () => {
    mockedUseCreateQuoteForm.mockReturnValueOnce({
      quote: '',
      author: '',
      setQuote: jest.fn(),
      setAuthor: jest.fn(),
      handleSubmit: async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      },
      isPending: false,
      error: null,
      isDisabled: true,
    });

    render(<CreateQuoteForm />);

    const button = screen.getByRole('button', { name: /save quote/i });

    expect(button).toBeDisabled();
  });

  it('shows error message when error is present', () => {
    mockedUseCreateQuoteForm.mockReturnValueOnce({
      quote: '',
      author: '',
      setQuote: jest.fn(),
      setAuthor: jest.fn(),
      handleSubmit: async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      },
      isPending: false,
      error: new Error('Something went wrong'),
      isDisabled: false,
    });

    render(<CreateQuoteForm />);

    expect(screen.getByText(/failed to save quote/i)).toBeInTheDocument();
  });
});
