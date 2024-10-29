import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@/components/catalyst/divider';
import Modules from '@/components/Module';
import { ComponentModule } from '@/components/ComponentModule';
import { ProjectsRepository } from '@/repositories/ProjectsRepository';
// import ForeignKeyTable from '@/components/tables/ForeignKeysTable';
// import IndexesTable from '@/components/tables/IndexesTable';
// import TriggersTable from '@/components/tables/TriggerTable';
import SidePanel from '@/components/SidePanel';

export default function ProjectPage() {
  const projectRepo = new ProjectsRepository();
  const [mods, setMods] = useState<any[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;

      const records = await projectRepo.getProjectModules(id);
      setMods(records);
    };

    fetch();
  }, []);

  return (
    <div>
      <SidePanel />

      {mods.map((mod) => {
        return (
          <ComponentModule title={mod.name} key={mod.id}>
            <Modules config={mod} />
          </ComponentModule>
        );
      })}

      <Divider />
      {/* <ComponentModule title="Table Indexes">
        <IndexesTable />
      </ComponentModule>

      <ComponentModule title="Table Foreign Key Constraints (Fuzzy)">
        <ForeignKeyTable />
      </ComponentModule>

      <ComponentModule title="Table Associated Triggers (Fuzzy)">
        <TriggersTable />
      </ComponentModule> */}
    </div>
  );
}
