// src/components/PipelineDiagram.tsx
import React, { useState } from 'react';
import type { Node } from '@/types';

import PipelineNode from './PipelineNode';
import PipelineFormModal from './PipelineFormModal';

interface PipeLineProps {
  nodeList: Node[];
}

const PipelineDiagram: React.FC<PipeLineProps> = ({ nodeList }) => {
  const [nodes, setNodes] = useState<Node[]>(nodeList);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 text-gray-100 min-h-screen">
      <div className="bg-gray-800 p-6 rounded-md shadow-md flex flex-col items-center space-y-8">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center">
            <PipelineNode {...node} />

            {index < nodes.length - 1 && node.type !== 'conditional' && (
              <div className="flex items-center justify-center">
                <span className="text-gray-400">↓</span>
              </div>
            )}

            {node.type === 'conditional' && (
              <div className="flex justify-between space-x-8 mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 mb-1">if true</span>
                  <PipelineNode
                    {...nodes.find((n) => n.id === node.children?.[0])!}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 mb-1">if false</span>
                  <PipelineNode
                    {...nodes.find((n) => n.id === node.children?.[1])!}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={openModal}
        className="bg-indigo-500 text-gray-100 px-4 py-2 rounded-md shadow hover:bg-indigo-600"
      >
        Add Node
      </button>

      <PipelineFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default PipelineDiagram;
