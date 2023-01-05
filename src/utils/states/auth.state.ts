import create from 'zustand';
import {getCredential} from '~utils/storage/keychain';

interface AuthState {
  token: string | null;
  setCredential: (token: string | null) => void;
}

export const useAuthState = create<AuthState>()(set => ({
  token: null,
  setCredential: token => set({token}),
}));
