import { useState } from 'react';
import SseComponent from '@/components/trading/Sse';
import ReportForm from '@/components/trading/ReportForm';
import SwitchList from '@/components/trading/SwitchList';
import { useSec10qStore } from '@/stores/sec10qStore';
import WordCloud from '@/components/charts/WordCloud';
import PipelineDiagram from '@/components/flow/PipelineDiagram';
import ModalDialog from '@/components/Dialog';

export default function HomeDashboard() {
  const { data } = useSec10qStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950 dark:text-white">
            Flow
          </h1>

          <div className="flex">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Builder</p>
            </div>
            <div className="">
              <SseComponent />
            </div>
          </div>
        </div>
      </header>

      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Project"
      >
        <div>
          <h1>Form in here</h1>
        </div>
      </ModalDialog>

      <section className="mt-8">
        <PipelineDiagram />
      </section>
    </div>
  );
}
