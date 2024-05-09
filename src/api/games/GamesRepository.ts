import { Database } from "../database";
import { IGames } from "./interfaces";

export class GamesRepository {
  constructor(
    private readonly query: Database["query"],
    private readonly select: Database["select"]
  ) {}

  async create(data: Omit<IGames, "id">): Promise<boolean> {
    return await this.query(
      "INSERT INTO games VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
      [
        null,
        data.name,
        data.genderId,
        data.typeId,
        data.note,
        data.difficulty,
        data.finalized,
        data.timeFinalized,
        data.finalizeSoon,
        data.finalizeCondition,
      ]
    );
  }

  async update(data: IGames): Promise<boolean> {
    return await this.query(
      `
      UPDATE games SET 
      name = ?1, 
      gender_id = ?2, 
      type_id = ?3, 
      note = ?4, 
      difficulty = ?5, 
      finalized = ?6, 
      time_finalized = ?7, 
      finalize_soon = ?8, 
      finalize_condition = ?9  
      WHERE id = ?10
      `,
      [
        data.name,
        data.genderId,
        data.typeId,
        data.note,
        data.difficulty,
        data.finalized,
        data.timeFinalized,
        data.finalizeSoon,
        data.finalizeCondition,
        data.id,
      ]
    );
  }

  async getOne(data: Pick<IGames, "id">): Promise<IGames[]> {
    return await this.select<Array<IGames>>(
      "SELECT * FROM games WHERE id = ?",
      [data.id]
    );
  }

  async getAll(): Promise<IGames[]> {
    return await this.select<Array<IGames>>("SELECT * FROM games");
  }

  async delete(data: Pick<IGames, "id">): Promise<boolean> {
    return await this.query("DELETE FROM games WHERE id = ?", [data.id]);
  }
}
