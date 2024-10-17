import { useEffect, useState } from 'react';
import { ProjectsRepository } from '@/repositories/ProjectsRepository';
import type { Project } from '@/repositories/ProjectsRepository';
import { Link } from 'react-router-dom';

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Instantiate the ProjectsRepository
  const projectsRepository = new ProjectsRepository();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch the projects using the repository
        const data = await projectsRepository.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
      <thead className="text-zinc-500 dark:text-zinc-400">
        <tr>
          <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
            ID
          </th>
          <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
            Name
          </th>
          <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
            Description
          </th>
          <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">
            Settings
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id} className="dark:hover:bg-gray-700">
            <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
              <Link to={`/projects/${project.id}`}> {project.id}</Link>
            </td>
            <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
              {project.name}
            </td>
            <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
              {project.description}
            </td>
            <td className="relative px-4 border-b border-zinc-950/5 dark:border-white/5 py-4">
              <pre>{JSON.stringify(project.settings, null, 2)}</pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
