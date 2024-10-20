import { useEffect, useState } from 'react';
import { IndexRepository } from '@/repositories/IndexRepository';
import type { Index } from '@/repositories/IndexRepository';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import SettingsPanel from '@/components/tables/SettingsPanel';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

export default function IndexesTable() {
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const indexRepository = new IndexRepository();

  useEffect(() => {
    const fetchIndexes = async () => {
      try {
        const data = await indexRepository.getIndexes();
        setIndexes(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch indexes.');
      } finally {
        setLoading(false);
      }
    };

    fetchIndexes();
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
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
                Table Name
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
                Index Name
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
                Column Name
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
                Is Unique
              </th>
              <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
                Is Primary
              </th>
            </tr>
          </thead>
          <tbody>
            {indexes.map((row) => (
              <tr
                key={`row-${row.indexname}`}
                className="dark:hover:bg-gray-700"
              >
                <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
                  {row.tablename}
                </td>
                <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
                  {row.indexname}
                </td>
                <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
                  {row.columnname}
                </td>
                <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
                  {row.isunique ? (
                    <CheckCircleIcon className="h-6 w-6 dark:text-lime-300" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 dark:text-red-400" />
                  )}
                </td>
                <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
                  {row.isprimary ? (
                    <CheckCircleIcon className="h-6 w-6 dark:text-lime-300" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 dark:text-red-400" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
