export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type LocalQuote = {
  id: number;
  quote: string;
  author: string;
  userId: number;
};

export type QuotesResponse = {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
};

export type LocalQuotesResponse = {
  data: LocalQuote[];
  total: number;
};

export type CreateQuoteDto = {
  author: string;
  quote: string;
  userId: number;
};

export type UpdateQuoteDto = {
  id: number;
  author: string;
  quote: string;
  userId: number;
};
