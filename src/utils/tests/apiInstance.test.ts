import { API_BASE_URL } from '@constants/api';

import { jsonApiInstance } from '../apiInstance';

class MockResponse {
  constructor(
    public ok: boolean,
    private jsonData: unknown,
    public status: number = 200
  ) {}

  json() {
    return Promise.resolve(this.jsonData);
  }
}

describe('jsonApiInstance', () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn();
  });

  it('performs a GET request and returns parsed data', async () => {
    const mockData = { message: 'Hello' };

    (globalThis.fetch as jest.Mock).mockResolvedValue(
      new MockResponse(true, mockData)
    );

    const result = await jsonApiInstance('/test');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/test`,
      expect.any(Object)
    );

    expect(result).toEqual(mockData);
  });

  it('sends JSON body when init.json is provided', async () => {
    const payload = { id: 123 };
    const mockData = { success: true };

    (globalThis.fetch as jest.Mock).mockResolvedValue(
      new MockResponse(true, mockData)
    );

    const result = await jsonApiInstance('/post', {
      method: 'POST',
      json: payload,
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/post`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );

    expect(result).toEqual(mockData);
  });

  it('merges custom headers with JSON header', async () => {
    const payload = { id: 7 };
    const mockData = { ok: true };

    (globalThis.fetch as jest.Mock).mockResolvedValue(
      new MockResponse(true, mockData)
    );

    await jsonApiInstance('/custom', {
      method: 'POST',
      json: payload,
      headers: { Authorization: 'Bearer token' },
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/custom`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      })
    );
  });

  it('throws ApiError on failed response', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue(
      new MockResponse(false, { message: 'Fail' }, 500)
    );

    await expect(jsonApiInstance('/error')).rejects.toThrow('ApiError:500');
  });
});
