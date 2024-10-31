// stores/sec10qStore.ts
import create from 'zustand';

interface Sec10qData {
  message: {
    id: number;
    filingId: number;
    sectionName: string;
    originalText: string;
    wordCloud: { size: number; text: string }[];
    createdAt: string;
  };
  metadata: {
    type: string;
    userId: string;
  };
}

interface Sec10qStore {
  data: Sec10qData[];
  addData: (newData: Sec10qData) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useSec10qStore = create<Sec10qStore>((set) => ({
  data: [],
  addData: (newData) => {
    console.log(newData);
    return set((state) => ({
      data: [...state.data, newData],
    }));
  },
}));
