import React, { useState } from 'react';
import FieldSelector from '@/components/charts/FieldSelector';

interface Form {
  sqlQuery: string;
  xField: string;
  yField: string;
  tooltipFields: string[];
}

interface SettingsFormProps {
  onSubmit: (form: Form) => void;
  fields: string[]; // Accept fields as a prop
  tooltipFields: string[]; // Accept initial tooltip fields as a prop
}

export default function SettingsForm({
  onSubmit,
  fields,
  tooltipFields: initialTooltipFields,
}: SettingsFormProps) {
  const [sqlQuery, setSqlQuery] = useState<string>('');
  const [xField, setXField] = useState<string>('tablename');
  const [yField, setYField] = useState<string>('rowcount');
  const [tooltipFields, setTooltipFields] =
    useState<string[]>(initialTooltipFields);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sqlQuery,
      xField,
      yField,
      tooltipFields,
    });
  };

  const handleTooltipFieldChange = (field: string, checked: boolean) => {
    setTooltipFields((prevFields) =>
      checked ? [...prevFields, field] : prevFields.filter((f) => f !== field),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="sqlQuery" className="text-sm font-medium">
          SQL Query
        </label>
        <textarea
          id="sqlQuery"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          placeholder="Write your SQL query here"
          rows={5}
        />
      </div>

      <div className="mt-6">
        <FieldSelector
          fields={fields} // Use fields passed as prop
          selectedXField={xField}
          selectedYField={yField}
          selectedTooltipFields={tooltipFields}
          onXFieldChange={setXField}
          onYFieldChange={setYField}
          onTooltipFieldChange={handleTooltipFieldChange}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="text-sm bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
