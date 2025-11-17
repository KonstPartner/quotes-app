export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type QuotesResponse = {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
};

export type LocalQuotesResponse = {
  data: Quote[];
  total: number;
};

export type CreateQuoteDto = {
  author: string;
  quote: string;
};
