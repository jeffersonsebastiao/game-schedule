import { Database } from "../database";
import { IConsole } from "./interfaces";

export class ConsoleRepository {
  constructor(private readonly database: Database) {}

  async create(data: Omit<IConsole, "id">) {
    return await this.database.query("INSERT INTO consoles VALUES (?1, ?2)", [
      null,
      data.name,
    ]);
  }

  async update(data: IConsole) {
    return await this.database.query(
      "UPDATE consoles SET name = ?1 WHERE ID = ?2",
      [data.name, data.id]
    );
  }

  async getOne(data: Omit<IConsole, "name">) {
    return await this.database.query("SELECT * FROM consoles WHERE id = ?", [
      data.id,
    ]);
  }

  async getAll() {
    return await this.database.query("SELECT * FROM consoles");
  }

  async delete(data: Omit<IConsole, "name">) {
    return await this.database.query("DELETE FROM consoles WHERE id = ?", [
      data.id,
    ]);
  }
}
