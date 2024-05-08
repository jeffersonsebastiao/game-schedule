import { Database } from "../database";
import { IGender } from "./interfaces";

export class GenderRepository {
  constructor(
    private readonly query: Database["query"],
    private readonly select: Database["select"]
  ) {}

  async create(data: Omit<IGender, "id">) {
    return await this.query("INSERT INTO gender VALUES (?1, ?2)", [
      null,
      data.name,
    ]);
  }

  async update(data: IGender) {
    return await this.query("UPDATE gender SET name = ?1 WHERE id = ?2", [
      data.name,
      data.id,
    ]);
  }

  async getOne(data: Omit<IGender, "name">) {
    return await this.select<Array<IGender>>(
      "SELECT * FROM gender WHERE id = ?",
      [data.id]
    );
  }

  async getAll() {
    return await this.select<Array<IGender>>("SELECT * FROM gender");
  }

  async delete(data: Omit<IGender, "name">): Promise<boolean> {
    return await this.query("DELETE FROM gender WHERE id = ?", [data.id]);
  }
}
