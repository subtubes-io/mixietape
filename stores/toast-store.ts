import { create } from "zustand";

interface IToastStoreState {
  message: string | null;
  isVisible: boolean;
  setMessage: (message: string) => void;
  hide: () => void;
}

export const useToastStore = create<IToastStoreState>((set) => ({
  message: null,
  isVisible: false,
  setMessage: (message: string) => {
    set((state: any) => ({ isVisible: true, message: message }));
  },
  hide: () => set({ isVisible: false, message: null }),
}));
