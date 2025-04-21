import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TokenPayload } from '../types/apiTypes';
import { AuthState } from '../types/authType';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      role: null,
      rehydrated: false,
      login: (token) => {
        const decoded = jwtDecode<TokenPayload>(token);
        set({ isAuthenticated: true, token, role: decoded.role });
      },
      logout: () => set({ isAuthenticated: false, token: null, role: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useAuth.setState({ rehydrated: true });
      },
    }
  )
);
