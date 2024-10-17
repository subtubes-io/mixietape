import React, { useEffect, useState } from 'react';

import type { ForeignKey } from '@/repositories/ForeignKeyRefRepository';
import { ForeignKeyRefRepository } from '@/repositories/ForeignKeyRefRepository';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import SettingsPanel from '@/components/tables/SettingsPanel';

export default function ForeignKeyTable() {
  const [foreignKeys, setForeignKeys] = useState<ForeignKey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const foreignKeyRepository = new ForeignKeyRefRepository();

  useEffect(() => {
    const fetchForeignKeys = async () => {
      try {
        const data = await foreignKeyRepository.getForeignKeys();
        setForeignKeys(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch foreign keys.');
      } finally {
        setLoading(false);
      }
    };

    fetchForeignKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (tableName: string, isRegex: boolean) => {
    console.log('Table Name:', tableName);
    console.log('Is Regex:', isRegex);
  };
  return (
    <>
      {loading && !error && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}
      <SettingsPanel onSubmit={handleFormSubmit} />
      {!loading && !error && (
        <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
          <thead className="text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                Reference Table
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                Constraint Name
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                Referencing Table
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                Referencing Column
              </th>
              {/* <th className="relative w-0 border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
            <span className="sr-only">Status</span>
          </th>
          <th className="relative w-0 border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
            <span className="sr-only">Actions</span>
          </th> */}
            </tr>
          </thead>
          <tbody>
            {foreignKeys.map((row) => (
              <tr
                key={`row-${row.constraintname}`}
                className="dark:hover:bg-gray-700"
              >
                <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                  {row.referencedtable}
                </td>
                <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                  {row.constraintname}
                </td>
                <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                  {row.referencingtable}
                </td>
                <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                  {row.referencingcolumn}
                </td>
                {/* <td className="text-zinc-500 relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 bg-lime-400/20 text-lime-700 dark:bg-lime-400/10 dark:text-lime-300">
                Success
              </span>
            </td>
            <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
              <button
                aria-label="More options"
                type="button"
                className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5 shrink-0"
                >
                  <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
                </svg>
              </button>
            </td> */}
              </tr>
            ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      )}
    </>
  );
}
