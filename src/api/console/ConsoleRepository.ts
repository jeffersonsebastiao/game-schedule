import { Database } from "../database";
import { IConsole } from "./interfaces";

export class ConsoleRepository {
  constructor(
    private readonly query: Database["query"],
    private readonly select: Database["select"]
  ) {}

  async create(data: Omit<IConsole, "id">): Promise<boolean> {
    return await this.query("INSERT INTO consoles VALUES (?1, ?2)", [
      null,
      data.name,
    ]);
  }

  async update(data: IConsole): Promise<boolean> {
    return await this.query("UPDATE consoles SET name = ?1 WHERE id = ?2", [
      data.name,
      data.id,
    ]);
  }

  async getOne(data: Omit<IConsole, "name">): Promise<IConsole[]> {
    return await this.select<Array<IConsole>>(
      "SELECT * FROM consoles WHERE id = ?",
      [data.id]
    );
  }

  async getAll(): Promise<IConsole[]> {
    return await this.select<Array<IConsole>>("SELECT * FROM consoles");
  }

  async delete(data: Omit<IConsole, "name">): Promise<boolean> {
    return await this.query("DELETE FROM consoles WHERE id = ?", [data.id]);
  }
}
