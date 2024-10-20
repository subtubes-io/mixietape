import React from 'react';
import { Divider } from '@/components/catalyst/divider';
import ChartParent from '@/components/charts/ChartParent';
import { ComponentModule } from '@/components/ComponentModule';
import ForeignKeyTable from '@/components/tables/ForeignKeysTable';
import IndexesTable from '@/components/tables/IndexesTable';
import TriggersTable from '@/components/tables/TriggerTable';
import SidePanel from '@/components/SidePanel';

export default function ProjectPage() {
  return (
    <>
      <SidePanel />
      <ComponentModule title="Table Partition">
        <ChartParent />
      </ComponentModule>
      <Divider />
      <ComponentModule title="Table Indexes">
        <IndexesTable />
      </ComponentModule>

      <ComponentModule title="Table Foreign Key Constraints (Fuzzy)">
        <ForeignKeyTable />
      </ComponentModule>

      <ComponentModule title="Table Associated Triggers (Fuzzy)">
        <TriggersTable />
      </ComponentModule>
    </>
  );
}
