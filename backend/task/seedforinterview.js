import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import users from "../data/users.js";

const db = await dbConnection();
await db.dropDatabase();

async function main() {
  try {
    let userDetails1 = await users.createUser(
      "bhanu",
      "srni",
      24,
      "test@test.com",
      "Alphanumeric",
      9083319047,
      3,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "admin",
      " ",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails2 = await users.createUser(
      "Han",
      "Solo",
      24,
      "testHan@test.com",
      "TestingHan@123",
      9083319047,
      2,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "interviewer",
      " ",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails3 = await users.createUser(
      "Luke",
      "Skywalker",
      24,
      "testLuke@test.com",
      "TestingLuke@123",
      9083319047,
      70,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "interviewer",
      " ",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails4 = await users.createUser(
      "John",
      "Doe",
      24,
      "testJohn@test.com",
      "TestingJohn@123",
      9083319047,
      7,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "interviewer",
      "Amazon",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails5 = await users.createUser(
      "Gabimaru",
      "Shenjen",
      24,
      "testGabi@test.com",
      "TestingGabi@123",
      9083319047,
      17,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "student",
      "Stevens",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails6 = await users.createUser(
      "Bruce",
      "Wayne",
      24,
      "testBruce@test.com",
      "TestingBruce@123",
      9083319047,
      27,
      "FullStack",
      [("Java", "AWS", "SQL")],
      "google",
      "student",
      "Stevens",
      []
    );
  } catch (e) {
    console.log(e);
  }

  try {
    let userDetails7 = await users.createUser(
      "Clark",
      "Kent",
      24,
      "testClark@test.com",
      "TestingClark@123",
      9083319047,
      37,
      "FullStack",
      ["Java", "AWS", "SQL"],
      "google",
      "interviewer",
      "Stevens",
      []
    );
  } catch (e) {
    console.log(e);
  }

  console.log("Done seeding database");
}

await main();
await closeConnection();
