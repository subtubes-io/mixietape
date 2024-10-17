"use client";
import React from "react";
import { Select } from "@/components/catalyst/select";
import { UserEventRepository } from "@/repositories/userEventRepository";
import { Button } from "@/components/catalyst/button";
import { Formik, Form, Field } from "formik";
import { useToastStore } from "@/stores/toast-store";

interface SeedFormProps {}

interface SeedFormValues {
  customerId: string;
  eventName: string;
  seedCount: number;
}

export const SeedForm: React.FC<SeedFormProps> = ({}) => {
  const userEventRepository = new UserEventRepository();
  const toastStore = useToastStore();

  const initialValues: SeedFormValues = {
    customerId: "512e7d47-9055-427c-a379-2faecd37302f",
    eventName: "abandoned_cart",
    seedCount: 50,
  };

  const handleSubmit = async (values: SeedFormValues) => {
    console.log(values);
    try {
      await userEventRepository.seed(values);
      toastStore.setMessage("Seeded");
    } catch (e) {
      toastStore.setMessage("Failed to seed");
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
                  htmlFor="seedCount"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Seed Count
                </label>
                <div className="mt-2">
                  <Field
                    as={Select}
                    name="seedCount"
                    onChange={handleChange}
                    value={values.seedCount}
                  >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={150}>150</option>
                    <option value={200}>200</option>
                    <option value={250}>250</option>
                    <option value={300}>300</option>
                    <option value={350}>350</option>
                    <option value={400}>400</option>
                    <option value={450}>450</option>
                    <option value={500}>500</option>
                  </Field>
                </div>
              </div>

              <div className="my-4">
                <div className="mt-2">
                  <Button type="submit">Seed DB</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
