import { BaseRepository } from './baseRepository';

export interface Project {
  id: number;
  name: string;
  description: string;
  settings: any; // JSONB field
}

export class ProjectsRepository extends BaseRepository {
  // constructor() {
  //   super();
  // }

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

  async updateModule(
    projectId: string,
    moduleId: string,
    settings: any,
  ): Promise<any> {
    const result = await this.axios.put(
      `/projects/module/settings/${projectId}/${moduleId}`,
      settings,
    );
    return result.data;
  }

  async getProjectModules(id: string): Promise<any> {
    const result = await this.axios.get(`/projects/modules/${id}`);
    return result.data;
  }

  async getProjectModule(moduleId: string): Promise<any> {
    const result = await this.axios.get(`/projects/modules/${moduleId}`);
    return result.data;
  }

  async moduleExec(projectId: string, moduleId: string): Promise<any> {
    const result = await this.axios.get(
      `/projects/modules/exec/${projectId}/${moduleId}`,
    );
    return result.data;
  }
}
