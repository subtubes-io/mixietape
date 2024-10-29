'use client';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';

const companies = [
  {
    id: 1,
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    exchange: 'NASDAQ',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 2,
    name: 'Meta Platforms, Inc.',
    ticker: 'META',
    exchange: 'NASDAQ',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 3,
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 4,
    name: 'Advanced Micro Devices, Inc.',
    ticker: 'AMD',
    exchange: 'NASDAQ',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 5,
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    exchange: 'NASDAQ',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 6,
    name: 'Redfin Corporation',
    ticker: 'RDFN',
    exchange: 'NASDAQ',
    sector: 'Real Estate',
    sectorId: 'xyz',
  },
  {
    id: 7,
    name: 'Zillow Group, Inc.',
    ticker: 'ZG',
    exchange: 'NASDAQ',
    sector: 'Real Estate',
    sectorId: 'xyz',
  },
  {
    id: 8,
    name: 'Palantir Technologies Inc.',
    ticker: 'PLTR',
    exchange: 'NYSE',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 9,
    name: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    exchange: 'NASDAQ',
    sector: 'Consumer Discretionary',
    sectorId: 'xyz',
  },
  {
    id: 10,
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    sector: 'Consumer Discretionary',
    sectorId: 'xyz',
  },
  {
    id: 11,
    name: 'Taiwan Semiconductor Manufacturing Company Limited',
    ticker: 'TSM',
    exchange: 'NYSE',
    sector: 'Technology',
    sectorId: 'xyz',
  },
  {
    id: 12,
    name: 'Ford Motor Company',
    ticker: 'F',
    exchange: 'NYSE',
    sector: 'Consumer Discretionary',
    sectorId: 'xyz',
  },
  {
    id: 13,
    name: 'Coinbase Global, Inc.',
    ticker: 'COIN',
    exchange: 'NASDAQ',
    sector: 'Financials',
    sectorId: 'xyz',
  },
];

export default function ReportForm() {
  const [query, setQuery] = useState('');

  return (
    <Formik
      initialValues={{ selectedPerson: null }}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ setFieldValue, values }) => {
        const filteredPeople =
          query === ''
            ? companies
            : companies.filter((person) =>
                person.name.toLowerCase().includes(query.toLowerCase()),
              );

        return (
          <Form>
            <label className="block text-sm/6 font-medium text-gray-900">
              Assigned to
            </label>
            <div className="relative mt-2">
              <Field name="selectedPerson">
                {() => (
                  <Combobox
                    as="div"
                    value={values.selectedPerson}
                    onChange={(person) => {
                      setFieldValue('selectedPerson', person);
                      setQuery('');
                    }}
                  >
                    <ComboboxInput
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(person) => person?.name || ''}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </ComboboxButton>

                    {filteredPeople.length > 0 && (
                      <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((person) => (
                          <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              {/* <img
                                src={person.imageUrl}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              /> */}
                              <span className="ml-3 truncate group-data-[selected]:font-semibold">
                                {person.name}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </Combobox>
                )}
              </Field>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
