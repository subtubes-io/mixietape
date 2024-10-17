import { BaseRepository } from "./baseRepository";

export interface Index {
  tablename: string;
  indexname: string;
  columnname: string;
  isunique: boolean;
  isprimary: boolean;
}

export class IndexRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getIndexes(): Promise<Index[]> {
    const response = await this.axios.get<Index[]>(`partitions/indexes`);
    return response.data;
  }

  async getIndexByName(indexName: string): Promise<Index> {
    const response = await this.axios.get<Index>(`/indexes/${indexName}`);
    return response.data;
  }

  async createIndex(body: any): Promise<any> {
    const response = await this.axios.post(`/indexes`, body);
    return response.data;
  }

  async deleteIndex(indexName: string): Promise<void> {
    await this.axios.delete(`/indexes/${indexName}`);
  }
}
