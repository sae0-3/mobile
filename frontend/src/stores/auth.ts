import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { AuthState } from '../types/authType';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      rehydrated: false,
      login: (token) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),
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
