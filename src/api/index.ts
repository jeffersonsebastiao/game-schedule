import { ConsoleRepository } from "./console/ConsoleRepository";
import { Database } from "./database";

export const database = new Database();
export const consoleRepository = new ConsoleRepository(
  database.query.bind(database),
  database.select.bind(database)
);
