import { BaseRepository } from "./baseRepository";

export interface ForeignKey {
  referencedtable: string;
  constraintname: string;
  referencingtable: string;
  referencingcolumn: string;
}

export class ForeignKeyRefRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getForeignKeys(): Promise<ForeignKey[]> {
    const response = await this.axios.get<ForeignKey[]>(
      `/partitions/foreign-key-refs`
    );
    return response.data;
  }

  async getForeignKeyByConstraint(constraintName: string): Promise<ForeignKey> {
    const response = await this.axios.get<ForeignKey>(
      `/foreign-keys/${constraintName}`
    );
    return response.data;
  }

  async createForeignKey(body: any): Promise<any> {
    const response = await this.axios.post(`/foreign-keys`, body);
    return response.data;
  }

  async deleteForeignKey(constraintName: string): Promise<void> {
    await this.axios.delete(`/foreign-keys/${constraintName}`);
  }
}
