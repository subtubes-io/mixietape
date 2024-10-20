import React, { useState } from 'react';
import D3BarChart from '@/components/charts/D3BarChart'; // Assuming D3BarChart is in the same folder
import SettingsPanel from '@/components/tables/SettingsPanel';

function ChartParent() {
  const [xField, setXField] = useState<string>('tablename');
  const [yField, setYField] = useState<string>('rowcount');
  const [tooltipFields, setTooltipFields] = useState<string[]>([
    'tablename',
    'tablesize',
  ]);

  const handleTooltipFieldChange = (field: string, checked: boolean) => {
    setTooltipFields((prevFields) =>
      checked ? [...prevFields, field] : prevFields.filter((f) => f !== field),
    );
  };

  return (
    <div>
      <SettingsPanel onSubmit={handleTooltipFieldChange} />
      <D3BarChart
        xField={xField}
        yField={yField}
        tooltipFields={tooltipFields}
      />
    </div>
  );
}

export default ChartParent;
