// src/components/PipelineForm.tsx
import React, { useState } from 'react';
import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

interface FormValues {
  name: string;
  description: string;
  dataSources: { label: string; value: string }[];
  eventsToListenTo: string;
  triggeredEvents: string[];
  failureEventName: { isDefault: boolean; customName?: string };
}

const dataSourceOptions = [
  { label: 'Data Source 1', value: 'source1' },
  { label: 'Data Source 2', value: 'source2' },
  { label: 'Data Source 3', value: 'source3' },
];

const initialValues: FormValues = {
  name: '',
  description: '',
  dataSources: [],
  eventsToListenTo: 'DefaultEventName',
  triggeredEvents: [''],
  failureEventName: { isDefault: true },
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  dataSources: Yup.array().min(1, 'Select at least one data source'),
  triggeredEvents: Yup.array().of(Yup.string().required('Event is required')),
  failureEventName: Yup.object({
    isDefault: Yup.boolean(),
    customName: Yup.string().when('isDefault', {
      is: false,
      then: Yup.string().required('Custom name is required'),
    }),
  }),
});

const PipelineForm: React.FC = () => {
  const [selectedDataSources, setSelectedDataSources] = useState<
    { label: string; value: string }[]
  >([]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4 p-4 bg-gray-800 rounded-md shadow-md text-gray-100">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-600 rounded bg-gray-900"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              className="w-full p-2 border border-gray-600 rounded bg-gray-900"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="dataSources" className="block font-semibold mb-1">
              Data Sources
            </label>
            <Select
              options={dataSourceOptions}
              isMulti
              name="dataSources"
              value={selectedDataSources}
              onChange={(selected) => {
                setSelectedDataSources(
                  selected as { label: string; value: string }[],
                );
                setFieldValue('dataSources', selected);
              }}
              className="w-full border border-gray-600 rounded bg-gray-900"
            />
            <ErrorMessage
              name="dataSources"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="eventsToListenTo"
              className="block font-semibold mb-1"
            >
              Events to Listen To
            </label>
            <Field
              type="text"
              name="eventsToListenTo"
              id="eventsToListenTo"
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-400"
              disabled
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Triggered Events</label>
            <FieldArray name="triggeredEvents">
              {({ push, remove }) => (
                <div>
                  {values.triggeredEvents.map((trigger, index) => (
                    <div
                      key={`field=${trigger}`}
                      className="flex space-x-2 mb-2"
                    >
                      <Field
                        name={`triggeredEvents[${index}]`}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-900"
                        placeholder={`Event ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Failure Event Name
            </label>
            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                name="failureEventName.isDefault"
                id="isDefault"
                className="mr-2"
                onChange={() => {
                  setFieldValue(
                    'failureEventName.isDefault',
                    !values.failureEventName.isDefault,
                  );
                  if (values.failureEventName.isDefault) {
                    setFieldValue('failureEventName.customName', '');
                  }
                }}
              />
              <label htmlFor="isDefault" className="text-gray-400">
                Use default name
              </label>
            </div>
            {!values.failureEventName.isDefault && (
              <div className="mt-2">
                <Field
                  type="text"
                  name="failureEventName.customName"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-900"
                  placeholder="Enter custom failure event name"
                />
                <ErrorMessage
                  name="failureEventName.customName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PipelineForm;
