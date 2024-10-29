import React, { useEffect, useState } from 'react';

import ReportForm from '@/components/trading/ReportForm';
import SwitchList from '@/components/trading/SwitchList';

export default function HomeDashboard() {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

      {/* <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Project"
      >
        <NewProjectForm onSubmit={handleNewProjectSubmit} />
      </ModalDialog> */}

      <section className="mt-8">
        <ReportForm />
      </section>

      <section className="mt-8">
        <SwitchList />
      </section>
    </div>
  );
}
