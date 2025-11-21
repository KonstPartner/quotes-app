export type ChatMessageAuthor = 'user' | 'server';

export type ChatMessage = {
  id: string;
  text: string;
  from: ChatMessageAuthor;
  createdAt: string;
};

export type ChatStatus = 'connecting' | 'open' | 'closed' | 'error';
