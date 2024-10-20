import React, { useState } from 'react';
import D3BarChart from '@/components/charts/D3BarChart'; // Assuming D3BarChart is in the same folder
import SettingsPanel from '@/components/tables/SettingsPanel';
import BarChartSettingsForm from '@/components/tables/BarChartSettingsForm';

function ChartParent() {
  const [xField, setXField] = useState<string>('tablename');
  const [yField, setYField] = useState<string>('rowcount');
  const [tooltipFields, setTooltipFields] = useState<string[]>([
    'tablename',
    'tablesize',
  ]);

  interface Form {
    sqlQuery: string;
    xField: string;
    yField: string;
    tooltipFields: string[];
  }
  const onSubmit = (form: Form) => {
    console.log(form);
  };

  return (
    <div>
      <SettingsPanel>
        <BarChartSettingsForm onSubmit={onSubmit} />
      </SettingsPanel>
      <D3BarChart
        xField={xField}
        yField={yField}
        tooltipFields={tooltipFields}
      />
    </div>
  );
}

export default ChartParent;
