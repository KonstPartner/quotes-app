import { getUserByUsername, USERS_PATH } from '@features/auth/api';
import { LoginPayload, RegisterPayload, User } from '@features/auth/model';
import { localApi } from '@constants/api';

export const authApi = {
  async login(payload: LoginPayload): Promise<User> {
    const users = await localApi<User[]>(getUserByUsername(payload.username));

    const user = users[0];

    if (!user || user.password !== payload.password) {
      throw new Error('Invalid username or password');
    }

    return user;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const users = await localApi<User[]>(getUserByUsername(payload.username));

    if (users.length > 0) {
      throw new Error('User with this username already exists');
    }

    return await localApi<User>(USERS_PATH, {
      method: 'POST',
      json: payload,
    });
  },
};
