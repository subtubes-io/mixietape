import { BaseRepository } from "./baseRepository";

export interface Partition {
  tablename: string;
  parenttable: string | null;
  tablesize: string;
  rowcount: number;
  tabletype: string;
}

export class PartitionRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getPartitions(): Promise<Partition[]> {
    const response = await this.axios.get<Partition[]>(`/partitions`);
    return response.data;
  }

  // async getPartitionByName(tablename: string): Promise<Partition> {
  //   const response = await this.axios.get<Partition>(
  //     `/partitions/${tablename}`
  //   );
  //   return response.data;
  // }

  // async createPartition(body: any): Promise<any> {
  //   const response = await this.axios.post(`/partitions`, body);
  //   return response.data;
  // }

  // async deletePartition(tablename: string): Promise<void> {
  //   await this.axios.delete(`/partitions/${tablename}`);
  // }
}
