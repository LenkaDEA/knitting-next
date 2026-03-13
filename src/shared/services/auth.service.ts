const TOKEN_KEY = 'auth_token';

const isClient = typeof window !== 'undefined';

export const authService = {
  setToken(token: string): void {
    if (isClient) localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    if (isClient) return localStorage.getItem(TOKEN_KEY);
    else return null;
  },

  removeToken(): void {
    if (isClient) localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    if (isClient) return !!this.getToken();
    else return false;
  },
};
