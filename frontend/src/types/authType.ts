export type AuthData = {
  isAuthenticated: boolean;
  token: string | null;
  rehydrated: boolean;
  role: string | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthState = AuthData & AuthActions;
