import { Fragment } from 'react';
import { Listbox, Transition, Checkbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface FieldSelectorProps {
  fields: string[];
  selectedXField: string;
  selectedYField: string;
  selectedTooltipFields: string[]; // Tooltip fields can now be multiple
  onXFieldChange: (field: string) => void;
  onYFieldChange: (field: string) => void;
  onTooltipFieldChange: (field: string, checked: boolean) => void; // Pass the field and its checked state
  label: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function FieldSelector({
  fields,
  selectedXField,
  selectedYField,
  selectedTooltipFields,
  onXFieldChange,
  onYFieldChange,
  onTooltipFieldChange,
  label,
}: FieldSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{label}</h3>

      {/* X Axis Field Selector */}
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          X-Axis Field
        </label>
        <Listbox value={selectedXField} onChange={onXFieldChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate">{selectedXField}</span>
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
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-cyan-600',
                              'absolute inset-y-0 left-0 flex items-center pl-3',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Y Axis Field Selector */}
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Y-Axis Field
        </label>
        <Listbox value={selectedYField} onChange={onYFieldChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate">{selectedYField}</span>
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
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-cyan-600',
                              'absolute inset-y-0 left-0 flex items-center pl-3',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Tooltip Fields with Checkboxes */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tooltip Fields
        </h4>
        <div className="space-y-2">
          {fields.map((field) => (
            <Checkbox
              key={field}
              checked={selectedTooltipFields.includes(field)}
              onChange={(checked) => onTooltipFieldChange(field, checked)}
              className={({ checked }) =>
                classNames(
                  checked
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white dark:bg-zinc-700',
                  'relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                )
              }
            >
              {({ checked }) => (
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm">
                      <label
                        className={classNames(
                          checked ? 'font-medium' : 'font-normal',
                          'text-gray-900 dark:text-white',
                        )}
                      >
                        {field}
                      </label>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FieldSelector;
