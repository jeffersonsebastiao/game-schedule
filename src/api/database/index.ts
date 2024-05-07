import SQLite from "tauri-plugin-sqlite-api";
import { documentDir, sep } from "@tauri-apps/api/path";

export class Database {
  private db: any;

  async createNewFile(fileName: string) {
    this.db = await SQLite.open(
      `${(await documentDir()) + sep}game_schedule${sep + fileName}.db`
    );
    await this.db.execute(`
    CREATE TABLE "type" (
      "id"	INTEGER,
      "name"	TEXT NOT NULL,
      PRIMARY KEY("id" AUTOINCREMENT)
    );
    CREATE TABLE "gender" (
      "id"	INTEGER,
      "name"	TEXT NOT NULL,
      PRIMARY KEY("id" AUTOINCREMENT)
    );
    CREATE TABLE "consoles" (
      "id"	INTEGER,
      "name"	TEXT NOT NULL,
      PRIMARY KEY("id" AUTOINCREMENT)
    );
    CREATE TABLE "games" (
      "id"	INTEGER,
      "name"	TEXT NOT NULL,
      "gender_id"	INTEGER NOT NULL,
      "type_id"	INTEGER,
      "note"	INTEGER,
      "difficulty"	INTEGER,
      "finalized"	INTEGER NOT NULL DEFAULT 0,
      "time_finalized"	INTEGER,
      "finalize_soon"	INTEGER NOT NULL DEFAULT 0,
      "finalize_condition"	TEXT NOT NULL DEFAULT 'End Game',
      FOREIGN KEY("gender_id") REFERENCES "gender",
      FOREIGN KEY("type_id") REFERENCES "type",
      PRIMARY KEY("id" AUTOINCREMENT)
    );
    CREATE TABLE "games_consoles" (
      "id"	INTEGER,
      "game_id"	INTEGER NOT NULL,
      "console_id"	INTEGER NOT NULL,
      FOREIGN KEY("game_id") REFERENCES "games",
      FOREIGN KEY("console_id") REFERENCES "consoles",
      PRIMARY KEY("id" AUTOINCREMENT)
    )
    `);
  }

  async open(fileName: string) {
    this.db = await SQLite.open(
      `${(await documentDir()) + sep}game_schedule${sep + fileName}.db`
    );
  }

  async close() {
    await this.db.close();
  }

  async query(query: string, params?: any[]) {
    await this.db.execute(query, params);
  }
}
