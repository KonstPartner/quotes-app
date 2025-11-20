import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { AuthProvider, useAuth, type User } from '@features/auth/model';

const AUTH_STORAGE_KEY = 'quotes_app_user';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it('throws if useAuth is used outside AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      /useAuth must be used within AuthProvider/i
    );
  });

  it('provides initial state when there is no user in localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it('loads user from localStorage on mount', async () => {
    const storedUser: User = {
      username: 'user',
    } as User;

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedUser));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toEqual(storedUser);
  });

  it('login stores user in state and localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newUser: User = {
      username: 'new-user',
    } as User;

    act(() => {
      result.current.login(newUser);
    });

    expect(result.current.user).toEqual(newUser);

    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).toEqual(newUser);
  });

  it('logout clears user from state and localStorage', async () => {
    const storedUser: User = {
      username: 'user',
    } as User;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedUser));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it('removes invalid JSON from localStorage and sets user to null', async () => {
    localStorage.setItem(AUTH_STORAGE_KEY, '{invalid json');

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});
