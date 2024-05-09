import { ConsoleRepository } from "./console/ConsoleRepository";
import { Database } from "./database";
import { GameConsoleRepository } from "./game-console/GameConsoleRepository";
import { GenderRepository } from "./gender/GenderRepository";
import { TypeRepository } from "./type/TypeRepository";

export const database = new Database();
export const consoleRepository = new ConsoleRepository(
  database.query.bind(database),
  database.select.bind(database)
);
export const genderRepository = new GenderRepository(
  database.query.bind(database),
  database.select.bind(database)
);
export const typeRepository = new TypeRepository(
  database.query.bind(database),
  database.select.bind(database)
);
export const gameConsoleRepository = new GameConsoleRepository(
  database.query.bind(database),
  database.select.bind(database)
);
