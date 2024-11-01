export interface WordCloudItem {
  size: number;
  text: string;
}

export interface Message {
  id: number;
  filingId: number;
  sectionName: string;
  originalText: string;
  summaryText: string;
  wordCloud: WordCloudItem[];
  createdAt: string;
}

interface Sec10qData {
  message: Message;
  metadata: {
    type: string;
    userId: string;
  };
}

export type Node = {
  id: string;
  label: string;
  type: 'node' | 'process' | 'conditional';
  children?: string[];
};
