'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

const sections = [
  { id: 'Part1-1', label: 'Financial Statements' },
  {
    id: 'Part1-2',
    label:
      'Management’s Discussion and Analysis of Financial Condition and Results of Operations',
  },
  {
    id: 'Part1-3',
    label: 'Quantitative and Qualitative Disclosures About Market Risk',
  },
  { id: 'Part1-4', label: 'Controls and Procedures' },
  { id: 'Part2-1', label: 'Legal Proceedings' },
  { id: 'Part2-1A', label: 'Risk Factors' },
  {
    id: 'Part2-2',
    label: 'Unregistered Sales of Equity Securities and Use of Proceeds',
  },
  { id: 'Part2-3', label: 'Defaults Upon Senior Securities' },
  { id: 'Part2-4', label: 'Mine Safety Disclosures' },
  { id: 'Part2-5', label: 'Other Information' },
  { id: 'Part2-6', label: 'Exhibits' },
];

export default function SwitchList() {
  const [enabledSections, setEnabledSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: false }), {}),
  );

  const toggleSection = (id: string) => {
    setEnabledSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-white">
      <h2 className="text-lg font-medium mb-4">Part 1</h2>
      {sections.slice(0, 4).map((section) => (
        <div key={section.id} className="flex items-center mb-4">
          <Switch
            checked={enabledSections[section.id]}
            onChange={() => toggleSection(section.id)}
            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 data-[checked]:bg-pink-600"
          >
            <span className="sr-only">{section.label}</span>
            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-gray-900 shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
              <span
                aria-hidden="true"
                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
              >
                <svg
                  fill="none"
                  viewBox="0 0 12 12"
                  className="h-3 w-3 text-gray-400"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 12 12"
                  className="h-3 w-3 text-pink-500"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          <span className="ml-3 text-sm">{section.label}</span>
        </div>
      ))}

      <h2 className="text-lg font-medium mb-4 mt-8">Part 2</h2>
      {sections.slice(4).map((section) => (
        <div key={section.id} className="flex items-center mb-4">
          <Switch
            checked={enabledSections[section.id]}
            onChange={() => toggleSection(section.id)}
            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 data-[checked]:bg-pink-600"
          >
            <span className="sr-only">{section.label}</span>
            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-gray-900 shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
              <span
                aria-hidden="true"
                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
              >
                <svg
                  fill="none"
                  viewBox="0 0 12 12"
                  className="h-3 w-3 text-gray-400"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 12 12"
                  className="h-3 w-3 text-pink-500"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          <span className="ml-3 text-sm">{section.label}</span>
        </div>
      ))}
    </div>
  );
}
