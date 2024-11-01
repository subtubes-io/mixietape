// src/components/PipelineNode.tsx
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

type NodeProps = {
  id: string;
  label: string;
  type: 'node' | 'process' | 'conditional';
};

const PipelineNode: React.FC<NodeProps> = ({ label, type }) => {
  return (
    <div className="flex flex-col items-center w-48">
      <Disclosure>
        {({ open }) => (
          <>
            {/* Toggle Button */}
            <Disclosure.Button
              className={`w-full text-center p-2 border ${
                type === 'node'
                  ? 'border-blue-400 bg-blue-900'
                  : type === 'process'
                    ? 'border-green-400 bg-green-900'
                    : 'border-yellow-400 bg-yellow-900'
              } rounded-md mb-2 text-gray-100 font-bold`}
            >
              {label}
            </Disclosure.Button>

            {/* Animated Panel */}
            <AnimatePresence initial={false}>
              {open && (
                <Disclosure.Panel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden w-full"
                >
                  <div className="p-4 bg-gray-700 text-gray-100 rounded-md mt-2">
                    <p>Additional details about {label}</p>
                  </div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PipelineNode;
