import api from '../api/client';

const TOKEN_KEY = 'authToken';
const ACCOUNT_KEY = 'authAccount';

export const auth = {
  isAuthenticated: () => Boolean(sessionStorage.getItem(TOKEN_KEY)),
  login: async (username, password) => {
    try {
      const { data } = await api.post('/auth/login/', { username, password });
      sessionStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(data.account));
      return true;
    } catch (e) {
      throw new Error('Đăng nhập thất bại');
    }
  },
  logout: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ACCOUNT_KEY);
  },
  getAccount: () => {
    const raw = sessionStorage.getItem(ACCOUNT_KEY);
    return raw ? JSON.parse(raw) : null;
  }
};


