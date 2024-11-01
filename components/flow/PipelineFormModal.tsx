// src/components/PipelineFormModal.tsx
import React from 'react';
import PipelineForm from './PipelineForm';

interface PipelineFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PipelineFormModal: React.FC<PipelineFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg text-white">
        <h2 className="text-lg font-bold mb-4">Create New Node</h2>
        <PipelineForm />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineFormModal;
