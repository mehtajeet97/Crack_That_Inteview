import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import users from "../data/users.js";
import interviews from "../data/interview.js";
import articles from "../data/articles.js";

const db = await dbConnection();
await db.dropDatabase();

async function main() {

  try {
    let user = {firstName: "Siddharth", lastName: "Prabhakaran", age: 24, email: "sidduprabhak@gmail.com", password: "Test@1234$", phoneNumber: 9083319047, }
    let userDetails1 = await users.createUser(
      "Siddharth",
      "Prabhakaran",
      24,
      "sidduprabhak@gmail.com",
      "Test@1234$",
      9083319047,
      "",
      2,
      "Data Engineer",
      "",
      ["JavaScript","AWS","SQL","Python"],
      "Crack That Interview",
      "Admin",
      ""
    );
    console.log(userDetails1);
  } catch (e) {
    console.log(e);
  }

  try {
    let interviewDetails1 = await interviews.createInterview(
      "Raj",
      "Siddharth",
      "04/11/2022",
      ["Very good guidance"],
      ["Good Technical Knowledge"]
    );
    console.log(interviewDetails1);
  } catch (e) {
    console.log(e);
  }

}

await main();
await closeConnection();
