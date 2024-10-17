import React from "react";
import { ProjectsTable } from "@/components/tables/ProjectsTable";
import { ComponentModule } from "@/components/ComponentModule";

const ProjectsPage = () => {
  return (
    <>
      <ComponentModule title={"Projects"}>
        <ProjectsTable />
      </ComponentModule>
    </>
  );
};

export default ProjectsPage;
