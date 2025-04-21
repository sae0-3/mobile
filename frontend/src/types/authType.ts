export type AuthData = {
  isAuthenticated: boolean;
  token: string | null;
  rehydrated: boolean;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthState = AuthData & AuthActions;
