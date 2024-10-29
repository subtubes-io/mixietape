import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Listbox, Transition, Checkbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import * as Yup from 'yup';

interface FormValues {
  sqlQuery: string;
  xField: string;
  yField: string;
  tooltipFields: string[];
}

interface SettingsFormProps {
  onSubmit: (form: FormValues) => void;
  fields: string[];
  settings: {
    xField: string;
    yField: string;
    sqlQuery: string;
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Define Yup validation schema
const validationSchema = Yup.object({
  sqlQuery: Yup.string(), //.required('SQL Query is required')
  xField: Yup.string(),
  yField: Yup.string(),
  tooltipFields: Yup.array().of(Yup.string()), // .min(1, 'At least one tooltip field is required')
});

export default function SettingsForm({
  onSubmit,
  settings,
  fields,
}: SettingsFormProps) {
  const initialValues: FormValues = { ...settings, tooltipFields: [...fields] };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema} // Add Yup validation schema
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="pt-4 space-y-4">
          {/* SQL Query Textarea */}
          <div className="flex items-start space-x-4">
            <label
              htmlFor="sqlQuery"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4"
            >
              SQL Query
            </label>
            <div className="w-3/4">
              <Field
                as="textarea"
                id="sqlQuery"
                name="sqlQuery"
                className={`block w-full px-3 py-2 border ${
                  errors.sqlQuery && touched.sqlQuery
                    ? 'border-red-500'
                    : 'border-gray-300'
                } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white dark:bg-zinc-700 dark:text-white transition-all duration-700 ease-in-out`}
                placeholder="Write your SQL query here"
                rows={5}
                value={values.sqlQuery}
              />
              {errors.sqlQuery && touched.sqlQuery && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.sqlQuery}
                </div>
              )}
            </div>
          </div>

          {/* X-Axis Field Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
              X-Axis Field
            </label>
            <div className="w-3/4">
              <Listbox
                value={values.xField}
                onChange={(value) => setFieldValue('xField', value)}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                    <span className="block truncate">{values.xField}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
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
              {errors.xField && touched.xField && (
                <div className="text-red-500 text-sm mt-1">{errors.xField}</div>
              )}
            </div>
          </div>

          {/* Y-Axis Field Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">
              Y-Axis Field
            </label>
            <div className="w-3/4">
              <Listbox
                value={values.yField}
                onChange={(value) => setFieldValue('yField', value)}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 dark:text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                    <span className="block truncate">{values.yField}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
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
              {errors.yField && touched.yField && (
                <div className="text-red-500 text-sm mt-1">{errors.yField}</div>
              )}
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
                  <FieldArray
                    name="tooltipFields"
                    render={() => (
                      <Checkbox
                        checked={values.tooltipFields.includes(field)}
                        onChange={(checked) => {
                          if (checked) {
                            setFieldValue('tooltipFields', [
                              ...values.tooltipFields,
                              field,
                            ]);
                          } else {
                            setFieldValue(
                              'tooltipFields',
                              values.tooltipFields.filter((f) => f !== field),
                            );
                          }
                        }}
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
                    )}
                  />
                </div>
              ))}
            </div>
            {errors.tooltipFields && touched.tooltipFields && (
              <div className="text-red-500 text-sm mt-1">
                {errors.tooltipFields}
              </div>
            )}
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
        </Form>
      )}
    </Formik>
  );
}
