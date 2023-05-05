import { exams } from "../config/mongoCollections.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

async function main() {
  console.log("Done seeding questions into questions collection");
}

await main();
await closeConnection();
