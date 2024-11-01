// stores/sec10qStore.ts
import { create } from 'zustand';
import { type Sec10qData } from '@/types';

interface Sec10qStore {
  data: Sec10qData[];
  addData: (newData: Sec10qData) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useSec10qStore = create<Sec10qStore>((set) => ({
  data: [],
  addData: (newData): Sec10qData => {
    return set((state) => ({
      data: [...state.data, newData],
    }));
  },
}));
