"use client";
import React from "react";
import { Select } from "@/components/catalyst/select";
import { UserEventRepository } from "@/repositories/userEventRepository";
import { Button } from "@/components/catalyst/button";
import { Formik, Form, Field } from "formik";
import { useToastStore } from "@/stores/toast-store";

interface ScheduleFormProps {}

interface ScheduleFormValues {
  customerId: string;
  eventName: string;
  eventDate: string;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({}) => {
  const userEventRepository = new UserEventRepository();
  const toastStore = useToastStore();

  const initialValues: ScheduleFormValues = {
    customerId: "512e7d47-9055-427c-a379-2faecd37302f",
    eventName: "abandoned_cart",
    eventDate: "In2Minutes",
  };

  const handleSubmit = async (values: ScheduleFormValues) => {
    console.log(values);

    try {
      await userEventRepository.createEvent(values);
      toastStore.setMessage("Scheduled");
    } catch (e) {
      toastStore.setMessage("Failed to schedule");
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form className="border-b border-white/10 pb-12">
          <div className="mt-10 flex justify-center items-center gap-x-6 gap-y-8">
            <div className="flex flex-col">
              <div className="my-4">
                <label
                  htmlFor="customerId"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Account ID
                </label>
                <div className="mt-2">
                  <Field
                    as={Select}
                    name="customerId"
                    onChange={handleChange}
                    value={values.customerId}
                  >
                    <option value="512e7d47-9055-427c-a379-2faecd37302f">
                      512e7d47-9055-427c-a379-2faecd37302f
                    </option>
                    <option value="982b0a2c-5441-4cea-93fc-9c212dde12dd">
                      982b0a2c-5441-4cea-93fc-9c212dde12dd
                    </option>
                    <option value="4cb6fab0-f288-450e-a2a7-b8436fea5506">
                      4cb6fab0-f288-450e-a2a7-b8436fea5506
                    </option>
                  </Field>
                </div>
              </div>

              <div className="my-4">
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Event Name
                </label>
                <div className="mt-2">
                  <Field
                    as={Select}
                    name="eventName"
                    onChange={handleChange}
                    value={values.eventName}
                  >
                    <option value="abandoned_cart">Abandoned Cart</option>
                    <option value="account_created">Account Created</option>
                  </Field>
                </div>
              </div>

              <div className="my-4">
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Schedule Options
                </label>
                <div className="mt-2">
                  <Field
                    as={Select}
                    name="eventDate"
                    onChange={handleChange}
                    value={values.eventDate}
                  >
                    <option value="In2Minutes">In 2 Minutes</option>
                    <option value="In5Minutes">In 5 Minutes</option>
                    <option value="In1Hour">In 1 hour</option>
                    <option value="In2Hour">In 2 hours</option>
                    <option value="In3Hour">In 3 hours</option>
                    <option value="In4Hour">In 4 hours</option>
                    <option value="In5Hour">In 5 hours</option>
                  </Field>
                </div>
              </div>

              <div className="my-4">
                <div className="mt-2">
                  <Button type="submit">Schedule</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
