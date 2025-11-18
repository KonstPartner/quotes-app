class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const apiInstance =
  (baseUrl: string) =>
  async <T>(
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

    const res = await fetch(`${baseUrl}${url}`, {
      ...init,
      headers,
    });

    if (!res.ok) {
      throw new ApiError(res);
    }

    const data = await res.json();

    const totalHeader = res.headers?.get('X-Total-Count');
    if (totalHeader) {
      return { data, total: Number(totalHeader) || undefined } as T;
    }

    return data;
  };
