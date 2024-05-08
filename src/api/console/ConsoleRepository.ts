import { Database } from "../database";
import { IConsole } from "./interfaces";

export class ConsoleRepository {
  constructor(private readonly query: Database["query"]) {}

  async create(data: Omit<IConsole, "id">) {
    return await this.query("INSERT INTO consoles VALUES (?1, ?2)", [
      null,
      data.name,
    ]);
  }

  async update(data: IConsole) {
    return await this.query("UPDATE consoles SET name = ?1 WHERE ID = ?2", [
      data.name,
      data.id,
    ]);
  }

  async getOne(data: Omit<IConsole, "name">) {
    return await this.query("SELECT * FROM consoles WHERE id = ?", [data.id]);
  }

  async getAll() {
    return await this.query("SELECT * FROM consoles");
  }

  async delete(data: Omit<IConsole, "name">) {
    return await this.query("DELETE FROM consoles WHERE id = ?", [data.id]);
  }
}
