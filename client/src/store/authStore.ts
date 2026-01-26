import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  role: 'ATTENDEE' | 'ORGANIZER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  init: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: async (user, token) => {
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(user));
    set({ user, token });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    set({ user: null, token: null });
  },
  init: async () => {
    const token = await SecureStore.getItemAsync('userToken');
    const userData = await SecureStore.getItemAsync('userData');
    if (token && userData) {
      set({ token, user: JSON.parse(userData) });
    }
  },
}));
