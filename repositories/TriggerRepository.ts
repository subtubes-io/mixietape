import { BaseRepository } from "./baseRepository";

export interface Trigger {
  triggername: string;
  functionname: string;
  functiondefinition: string;
  triggertype: string;
  event: (string | null)[];
  level: string;
}

export class TriggerRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getTriggers(): Promise<Trigger[]> {
    const response = await this.axios.get<Trigger[]>(
      `/partitions/trigger-refs`
    );
    return response.data;
  }

  async getTriggerByName(triggerName: string): Promise<Trigger> {
    const response = await this.axios.get<Trigger>(`/triggers/${triggerName}`);
    return response.data;
  }

  async createTrigger(body: any): Promise<any> {
    const response = await this.axios.post(`/triggers`, body);
    return response.data;
  }

  async deleteTrigger(triggerName: string): Promise<void> {
    await this.axios.delete(`/triggers/${triggerName}`);
  }
}
