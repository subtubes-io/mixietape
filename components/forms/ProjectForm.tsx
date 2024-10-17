import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the form values interface
interface NewProjectFormValues {
  name: string;
  description: string;
  settings: string;
}

// Validation schema for form fields
const validationSchema = Yup.object({
  name: Yup.string().required('Project name is required'),
  description: Yup.string().required('Project description is required'),
  settings: Yup.string().strip(), //Yup.string().required("Settings are required"),
});

interface NewProjectFormProps {
  onSubmit: (values: NewProjectFormValues) => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onSubmit }) => {
  const initialValues: NewProjectFormValues = {
    name: '',
    description: '',
    settings: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-zinc-900 dark:text-white">Name</label>
            <Field
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-zinc-700 dark:text-white"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-zinc-900 dark:text-white">
              Description
            </label>
            <Field
              type="text"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-zinc-700 dark:text-white"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-zinc-900 dark:text-white">
              Settings (JSON)
            </label>
            <Field
              type="text"
              name="settings"
              as="textarea"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-zinc-700 dark:text-white"
            />
            <ErrorMessage
              name="settings"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {isSubmitting ? 'Creating...' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewProjectForm;
