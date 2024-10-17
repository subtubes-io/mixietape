import React from "react";
import { NextPage } from "next";
import { Divider } from "@/components/catalyst/divider";
import { D3BarChart } from "@/components/charts";
import { ComponentModule } from "@/components/ComponentModule";
import ForeignKeyTable from "@/components/tables/ForeignKeysTable";
import IndexesTable from "@/components/tables/IndexesTable";
import TriggersTable from "@/components/tables/TriggerTable";
import SidePanel from "@/components/SidePanel";

const Home: NextPage = async () => {
  return (
    <>
      <SidePanel />
      <ComponentModule title={"Table Partition"}>
        <D3BarChart />
      </ComponentModule>
      <Divider />
      <ComponentModule title={"Table Indexes"}>
        <IndexesTable />
      </ComponentModule>

      <ComponentModule title={"Table Foreign Key Constraints (Fuzzy)"}>
        <ForeignKeyTable />
      </ComponentModule>

      <ComponentModule title={"Table Associated Triggers (Fuzzy)"}>
        <TriggersTable />
      </ComponentModule>
    </>
  );
};

export default Home;
