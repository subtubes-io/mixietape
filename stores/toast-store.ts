import { create } from 'zustand';

interface IToastStoreState {
  message: string | null;
  isVisible: boolean;
  setMessage: (message: string) => void;
  hide: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useToastStore = create<IToastStoreState>((set) => ({
  message: null,
  isVisible: false,
  setMessage: (message: string) => {
    // state: any
    set(() => ({ isVisible: true, message }));
  },
  hide: () => set({ isVisible: false, message: null }),
}));
