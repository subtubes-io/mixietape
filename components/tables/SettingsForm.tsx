import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import FieldSelector from '@/components/charts/FieldSelector'; // Adjust the path based on your file structure

interface SettingsFormProps {
  onSubmit: (
    tableName: string,
    isRegex: boolean,
    sqlQuery: string,
    xField: string,
    yField: string,
    tooltipFields: string[],
  ) => void;
}

export default function SettingsForm({ onSubmit }: SettingsFormProps) {
  const [tableName, setTableName] = useState<string>(''); // Table name input state
  const [isRegex, setIsRegex] = useState<boolean>(false); // Toggle state for regex
  const [sqlQuery, setSqlQuery] = useState<string>(''); // SQL query input state

  // State for FieldSelector options
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass all the values to onSubmit function
    onSubmit(tableName, isRegex, sqlQuery, xField, yField, tooltipFields);
  };

  const handleTooltipFieldChange = (field: string, checked: boolean) => {
    setTooltipFields((prevFields) =>
      checked ? [...prevFields, field] : prevFields.filter((f) => f !== field),
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transition-all duration-700 ease-in-out pt-4"
    >
      {/* Row for SQL Query Input */}
      <div className="flex items-center space-x-4">
        <label
          htmlFor="sqlQuery"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4"
        >
          SQL Query
        </label>
        <textarea
          id="sqlQuery"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="block w-3/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white dark:bg-zinc-700 dark:text-white transition-all duration-700 ease-in-out"
          placeholder="Write your SQL query here"
          rows={5}
        />
      </div>

      {/* Field Selector for X-Axis, Y-Axis, and Tooltip Fields */}
      <div className="mt-6">
        <FieldSelector
          fields={fields}
          selectedXField={xField}
          selectedYField={yField}
          selectedTooltipFields={tooltipFields}
          onXFieldChange={setXField}
          onYFieldChange={setYField}
          onTooltipFieldChange={handleTooltipFieldChange}
          label="Select Chart Fields"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="text-sm bg-cyan-500 dark:bg-cyan-300 text-black px-4 py-2 rounded hover:bg-cyan-400 dark:hover:bg-cyan-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
