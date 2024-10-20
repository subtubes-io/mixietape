import { Checkbox } from '@headlessui/react';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (option: string, checked: boolean) => void;
}

function CheckboxGroup({
  label,
  options,
  selectedOptions,
  onChange,
}: CheckboxGroupProps) {
  return (
    <div className="flex items-start space-x-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={(checked) => onChange(option, checked)}
              className={({ checked }) =>
                classNames(
                  checked
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white dark:bg-zinc-700',
                  'relative flex cursor-pointer rounded-sm px-1 py-1 shadow-md focus:outline-none',
                )
              }
            >
              <span
                className={classNames(
                  checked ? 'font-medium' : 'font-normal',
                  'text-gray-900 dark:text-white',
                )}
              >
                {option}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
