import React, { useState } from 'react';
import D3BarChart from '@/components/charts/D3BarChart'; // Assuming D3BarChart is in the same folder
import FieldSelector from '@/components/charts/FieldSelector'; // Your FieldSelector component
import SettingsPanel from '../tables/SettingsPanel';
import SettingsForm from '../tables/SettingsForm';

function ChartParent() {
  const [xField, setXField] = useState<string>('tablename');
  const [yField, setYField] = useState<string>('rowcount');
  const [tooltipFields, setTooltipFields] = useState<string[]>([
    'tablename',
    'tablesize',
  ]);

  const fields = [
    'tablename',
    'parenttable',
    'tablesize',
    'rowcount',
    'tabletype',
  ]; // Example fields

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
