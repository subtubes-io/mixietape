import { useState } from 'react';
import type { Node } from '@/types';

import SseComponent from '@/components/trading/Sse';
import { useSec10qStore } from '@/stores/sec10qStore';
import PipelineDiagram from '@/components/flow/PipelineDiagram';
import ModalDialog from '@/components/Dialog';
import { useNodeStore } from '@/stores/nodeStore';

export default function HomeDashboard() {
  const { data } = useSec10qStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const nodeList: Node[] = [
  //   { id: 'start', label: 'Start Node', type: 'node' },
  //   { id: 'p1', label: 'Process', type: 'process' },
  //   { id: 'n2', label: 'Node 2', type: 'node' },
  //   { id: 'p2', label: 'Process', type: 'process' },
  //   { id: 'n3', label: 'Node 3', type: 'node' },
  //   // {
  //   //   id: 'p3',
  //   //   label: 'Conditional Process',
  //   //   type: 'conditional',
  //   //   children: ['n4', 'n5'],
  //   // },
  //   // { id: 'n4', label: 'Node 4', type: 'node' },
  //   // { id: 'p4', label: 'Process', type: 'process' },
  //   // { id: 'n5', label: 'Node 5', type: 'node' },
  //   // { id: 'p5', label: 'Process', type: 'process' },
  //   // { id: 'end', label: 'End Node', type: 'node' },
  // ];

  const nodes = useNodeStore((state) => state.nodes);
  // const addNode = useNodeStore((state) => state.addNode);

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
        <PipelineDiagram nodeList={nodes} />
      </section>
    </div>
  );
}
