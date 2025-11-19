export type User = {
  id: number;
  username: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
};

export type AuthMode = 'login' | 'register';
