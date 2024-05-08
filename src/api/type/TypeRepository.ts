import { Database } from "../database";
import { IType } from "./interfaces";

export class TypeRepository {
  constructor(
    private readonly query: Database["query"],
    private readonly select: Database["select"]
  ) {}

  async create(data: Omit<IType, "id">): Promise<boolean> {
    return await this.query("INSERT INTO type VALUES (?1, ?2)", [
      null,
      data.name,
    ]);
  }

  async update(data: IType): Promise<boolean> {
    return await this.query("UPDATE type SET name = ?1 WHERE id = ?2", [
      data.name,
      data.id,
    ]);
  }

  async getOne(data: Omit<IType, "name">): Promise<IType[]> {
    return await this.select<Array<IType>>("SELECT * FROM type WHERE id = ?", [
      data.id,
    ]);
  }

  async getAll(): Promise<IType[]> {
    return await this.select<Array<IType>>("SELECT * FROM type");
  }

  async delete(data: Omit<IType, "name">): Promise<boolean> {
    return await this.query("DELETE FROM type WHERE id = ?", [data.id]);
  }
}
