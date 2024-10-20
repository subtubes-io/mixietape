import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Checkbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
    <form onSubmit={handleSubmit} className="pt-4 space-y-4">
      {/* SQL Query Textarea */}
      <div className="flex items-start space-x-4">
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

      {/* X-Axis Field Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
          X-Axis Field
        </label>
        <div className="w-3/4">
          <Listbox value={xField} onChange={setXField}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                <span className="block truncate">{xField}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {fields.map((field) => (
                    <Listbox.Option
                      key={field}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'text-white bg-cyan-600'
                            : 'text-gray-900 dark:text-white',
                          'cursor-default select-none relative py-2 pl-10 pr-4',
                        )
                      }
                      value={field}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {field}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-cyan-600',
                                'absolute inset-y-0 left-0 flex items-center pl-3',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Y-Axis Field Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
          Y-Axis Field
        </label>
        <div className="w-3/4">
          <Listbox value={yField} onChange={setYField}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                <span className="block truncate">{yField}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {fields.map((field) => (
                    <Listbox.Option
                      key={field}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'text-white bg-cyan-600'
                            : 'text-gray-900 dark:text-white',
                          'cursor-default select-none relative py-2 pl-10 pr-4',
                        )
                      }
                      value={field}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {field}
                          </span>
                          {selected && (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-cyan-600',
                                'absolute inset-y-0 left-0 flex items-center pl-3',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Tooltip Fields with Checkboxes */}
      <div className="flex items-start space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
          Tooltip Fields
        </label>
        <div className="flex space-x-2">
          {fields.map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox
                checked={tooltipFields.includes(field)}
                onChange={(checked) => handleTooltipFieldChange(field, checked)}
                className={({ checked }) =>
                  classNames(
                    checked
                      ? 'bg-cyan-600 text-white'
                      : 'bg-white dark:bg-zinc-700',
                    'relative flex cursor-pointer rounded-sm px-1 py-1 shadow-md focus:outline-none',
                  )
                }
              >
                {({ checked }) => (
                  <span
                    className={classNames(
                      checked ? 'font-medium' : 'font-normal',
                      'text-gray-900 dark:text-white',
                    )}
                  >
                    {field}
                  </span>
                )}
              </Checkbox>
            </div>
          ))}
        </div>
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
