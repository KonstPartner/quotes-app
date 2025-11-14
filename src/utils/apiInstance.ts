import { API_BASE_URL } from '@constants/api';

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    };

    init.body = JSON.stringify(init.json);
  }

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    throw new ApiError(res);
  }

  return res.json() as Promise<T>;
};
