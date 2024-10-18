import React, { useEffect, useState } from 'react';
import { ProjectsRepository } from '@/repositories/ProjectsRepository';
import type { Project } from '@/repositories/ProjectsRepository';
import ProjectsTable from '@/components/tables/ProjectsTable';
import ModalDialog from '@/components/Dialog';
import NewProjectForm from '@/components/forms/ProjectForm';
import DynamicComponentLoader from '@/components/extensions/DynamicLoader';

export default function HomeDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const projectsRepository = new ProjectsRepository();

  const handleNewProjectSubmit = async (values: {
    name: string;
    description: string;
    settings: string;
  }) => {
    try {
      const newProject = {
        name: values.name,
        description: values.description,
        settings: values.settings ? JSON.parse(values.settings) : {},
      };
      await projectsRepository.createProject(newProject);
      const updatedProjects = await projectsRepository.getAllProjects();
      setProjects(updatedProjects);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950 dark:text-white">
            Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Overview of your project's performance.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 dark:bg-cyan-400 dark:hover:bg-cyan-500"
        >
          New Project
        </button>
      </header>

      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Project"
      >
        <NewProjectForm onSubmit={handleNewProjectSubmit} />
      </ModalDialog>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-800 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
            Total Projects
          </h2>
          <p className="mt-1 text-3xl font-bold text-zinc-950 dark:text-white">
            {projects.length}
          </p>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-800 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
            Dynamic Loader
          </h2>
          <DynamicComponentLoader />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-4">
          Recent Projects
        </h2>
        <ProjectsTable />
      </section>
    </div>
  );
}
