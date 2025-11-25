export type User = {
  id: number;
  username: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  source: string;

  birthDay: string;
  birthMonth: string;
  birthYear: string;

  newsletter?: boolean;
};

export type RegisterFormValues = RegisterPayload & {
  repeatPassword: string;
  acceptTerms: boolean;
};

export type AuthMode = 'login' | 'register';
