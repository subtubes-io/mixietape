import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

interface SettingsFormProps {
  onSubmit: (tableName: string, isRegex: boolean) => void;
}

export default function SettingsForm({ onSubmit }: SettingsFormProps) {
  const [tableName, setTableName] = useState<string>(''); // Table name input state
  const [isRegex, setIsRegex] = useState<boolean>(false); // Toggle state for regex

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the onSubmit function passed as a prop
    onSubmit(tableName, isRegex);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 transition-all duration-700 ease-in-out"
    >
      {/* Row for Table Name Input */}
      <div className="flex items-center space-x-4">
        <label
          htmlFor="tableName"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4"
        >
          Table Name
        </label>
        <input
          type="text"
          id="tableName"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="block w-3/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white dark:bg-zinc-700 dark:text-white transition-all duration-700 ease-in-out"
          placeholder="Enter table name"
        />
      </div>

      {/* Row for "Use Regex" Toggle */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
          Use Regex
        </label>
        <div className="flex items-center space-x-2 w-3/4">
          <Switch
            checked={isRegex}
            onChange={setIsRegex}
            className={`${
              isRegex ? 'bg-cyan-400' : 'bg-gray-200 dark:bg-gray-600'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:ring-offset-zinc-800`}
          >
            <span
              className={`${
                isRegex ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-700 ease-in-out`}
            />
          </Switch>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Use Regex
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-2 text-sm bg-cyan-500 dark:bg-cyan-300 text-black px-4 py-2 rounded hover:bg-cyan-400 dark:hover:bg-cyan-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
