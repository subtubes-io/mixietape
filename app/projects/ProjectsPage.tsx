import React from 'react';
import ProjectsTable from '@/components/tables/ProjectsTable';
import { ComponentModule } from '@/components/ComponentModule';

export default function ProjectsPage() {
  return (
    <ComponentModule title={'Projects'}>
      <ProjectsTable />
    </ComponentModule>
  );
}
