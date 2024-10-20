import React, { useState, useEffect } from 'react';
import D3BarChart from '@/components/charts/D3BarChart';
import SettingsPanel from '@/components/tables/SettingsPanel';
import BarChartSettingsForm from '@/components/tables/BarChartSettingsForm';
import { PartitionRepository } from '@/repositories/PartitionRepository';

function ChartParent() {
  const [xField, setXField] = useState<string>('tablename');
  const [yField, setYField] = useState<string>('rowcount');
  const [tooltipFields, setTooltipFields] = useState<string[]>([
    'tablename',
    'tablesize',
  ]);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const partitionRepo = new PartitionRepository();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await partitionRepo.getPartitions();
        setRecords(data);
      } catch (err) {
        setError('Failed to fetch records.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = [
    'tablename',
    'parenttable',
    'tablesize',
    'rowcount',
    'tabletype',
  ]; // Passing this as a prop to the form

  interface Form {
    sqlQuery: string;
    xField: string;
    yField: string;
    tooltipFields: string[];
  }

  const onSubmit = (form: Form) => {
    setXField(form.xField);
    setYField(form.yField);
    setTooltipFields(form.tooltipFields);
    // console.log(form); // You can replace this with actual functionality
  };

  return (
    <div>
      <SettingsPanel>
        <BarChartSettingsForm
          onSubmit={onSubmit}
          fields={fields}
          tooltipFields={tooltipFields}
        />
      </SettingsPanel>
      {loading && <p>Loading...</p>}

      {error && <p>Error</p>}

      {!loading && !error && (
        <D3BarChart
          xField={xField}
          yField={yField}
          tooltipFields={tooltipFields}
          records={records} // Pass records as prop
        />
      )}
    </div>
  );
}

export default ChartParent;
