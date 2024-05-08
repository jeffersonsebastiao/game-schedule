import { ConsoleRepository } from "./console/ConsoleRepository";
import { Database } from "./database";
import { GenderRepository } from "./gender/GenderRepository";

export const database = new Database();
export const consoleRepository = new ConsoleRepository(
  database.query.bind(database),
  database.select.bind(database)
);
export const genderRepository = new GenderRepository(
  database.query.bind(database),
  database.select.bind(database)
);
