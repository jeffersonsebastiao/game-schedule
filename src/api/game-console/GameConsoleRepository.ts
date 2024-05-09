import { Database } from "../database";
import { IGameConsole } from "./interfaces";

export class GameConsoleRepository {
  constructor(
    private readonly query: Database["query"],
    private readonly select: Database["select"]
  ) {}

  async create(data: Omit<IGameConsole, "id">): Promise<boolean> {
    return await this.query("INSERT INTO games_consoles VALUES (?1, ?2, ?3)", [
      null,
      data.gameId,
      data.consoleId,
    ]);
  }

  async update(data: IGameConsole): Promise<boolean> {
    return await this.query(
      "UPDATE games_consoles SET game_id = ?1, console_id = ?2  WHERE id = ?3",
      [data.gameId, data.consoleId, data.id]
    );
  }

  async getOne(
    data: Omit<IGameConsole, "gameId" | "consoleId">
  ): Promise<IGameConsole[]> {
    return await this.select<Array<IGameConsole>>(
      "SELECT * FROM games_consoles WHERE id = ?",
      [data.id]
    );
  }

  async getAll(): Promise<IGameConsole[]> {
    return await this.select<Array<IGameConsole>>(
      "SELECT * FROM games_consoles"
    );
  }

  async delete(
    data: Omit<IGameConsole, "gameId" | "consoleId">
  ): Promise<boolean> {
    return await this.query("DELETE FROM games_consoles WHERE id = ?", [
      data.id,
    ]);
  }
}
