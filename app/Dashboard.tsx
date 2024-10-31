import SseComponent from '@/components/trading/Sse';
import ReportForm from '@/components/trading/ReportForm';
import SwitchList from '@/components/trading/SwitchList';
import { useSec10qStore } from '@/stores/sec10qStore';
import WordCloud from '@/components/charts/WordCloud';
import PipelineDiagram from '@/components/flow/Flow';
interface WordCloudItem {
  size: number;
  text: string;
}

interface Message {
  id: number;
  filingId: number;
  sectionName: string;
  originalText: string;
  summarytext: string;
  wordCloud: WordCloudItem[];
  createdAt: string;
}

interface Metadata {
  type: string;
  userId: string;
}

export interface Sec10qData {
  message: Message;
  metadata: Metadata;
}

export default function HomeDashboard() {
  const { data } = useSec10qStore();

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950 dark:text-white">
            Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">10-Q Report</p>
        </div>
      </header>

      <section className="mt-8">
        <SseComponent />
      </section>

      <section className="mt-8">
        <ReportForm />
      </section>

      <section className="mt-8">
        <SwitchList />
      </section>

      {/* Render data from the store if needed */}
      {data[0] && (
        <section className="mt-8">
          <WordCloud wordData={data[0].message.wordCloud.slice(0, 100)} />
        </section>
      )}

      {data[0] && (
        <section className="mt-8">
          <h2 className="text-white">{data[0].message.sectionName}</h2>
          <p className="text-white">{data[0].message.summaryText}</p>
        </section>
      )}

      <section className="mt-8">
        <PipelineDiagram />
      </section>
    </div>
  );
}
