import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import D3BarChart from '@/components/charts/D3BarChart';
import SettingsPanel from '@/components/tables/SettingsPanel';
import BarChartSettingsForm from '@/components/tables/BarChartSettingsForm';
import { ProjectsRepository } from '@/repositories/ProjectsRepository';

interface Settings {
  sqlQuery: string;
  xField: string;
  yField: string;
  tooltipFields: string[];
}
interface BarChartConfig {
  config: {
    id: string;
    name: string;
    type: string;
    settings: Settings;
    projectId: string;
  };
}

function ChartParent({ config }: BarChartConfig) {
  const [fieldOptions, setFieldOptions] = useState([]);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<string>();

  // const partitionRepo = new PartitionRepository();
  const projectRepository = new ProjectsRepository();

  useEffect(() => {
    const fetch = async () => {
      try {
        await projectRepository.getProjectModule(config.id);
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!id) return;
  //     try {
  //       const records = await projectRepository.moduleExec(id, config.id);
  //       setRecords(records);
  //       setFieldOptions(records[0] ? Object.keys(records[0]) : []);
  //     } catch (err) {
  //       setError('Failed to fetch records.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  interface Form {
    sqlQuery: string;
    xField: string;
    yField: string;
    tooltipFields: string[];
  }

  const onSubmit = async (form: Form) => {
    if (!id) return;
    const results = await projectRepository.updateModule(id, config.id, form);
    setFieldOptions(results[0] ? Object.keys(results[0]) : []);
  };

  return (
    <div>
      <SettingsPanel>
        <BarChartSettingsForm
          onSubmit={onSubmit}
          fields={fieldOptions}
          settings={settings}
        />
      </SettingsPanel>
      {loading && <p>Loading...</p>}

      {error && <p>Error</p>}

      {/* {!loading && !error && (
        <D3BarChart
          xField={settings.xField}
          yField={settings.yField}
          tooltipFields={settings.tooltipFields}
          records={records} // Pass records as prop
        />
      )} */}
    </div>
  );
}

export default ChartParent;
