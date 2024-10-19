import { BaseRepository } from './baseRepository';

export interface Project {
  id: number;
  name: string;
  description: string;
  settings: any; // JSONB field
}

export class ProjectsRepository extends BaseRepository {
  constructor() {
    super(); // Call the BaseRepository constructor to initialize Axios
  }

  // Fetch all projects
  async getAllProjects(): Promise<Project[]> {
    const response = await this.axios.get<Project[]>(`/projects`);
    return response.data;
  }

  // Fetch a specific project by ID (optional, if needed)
  async getProjectById(id: number): Promise<Project> {
    const response = await this.axios.get<Project>(`/projects/${id}`);
    return response.data;
  }

  // Create a new project (optional, if needed)
  async createProject(body: Partial<Project>): Promise<Project> {
    const response = await this.axios.post<Project>(`/projects`, body);
    return response.data;
  }

  // Delete a project by ID (optional, if needed)
  async deleteProject(id: string): Promise<void> {
    await this.axios.delete(`/projects/${id}`);
  }
}
