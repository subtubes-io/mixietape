import axios, { AxiosInstance } from "axios";

export class BaseRepository {
  protected readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3001", ///process.env.NEXT_PUBLIC_API_BASE_URL, // or any base URL for your API
      timeout: 10000, // set some sane default later
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
