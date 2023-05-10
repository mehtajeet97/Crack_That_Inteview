import { exams, questions } from "../config/mongoCollections.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

const db = await dbConnection();
// await db.dropDatabase();

async function main() {
  const temp = [
    {
      question:
        "What is the output of the following code?\n\n>>> x = 5\n>>> y = 10\n>>> x += y\n>>> print(x)",
      options: ["10", "15", "20", "25"],
      answer: "15",
    },
    {
      question: "Which of the following is a built-in function in Python?",
      options: ["range", "random", "choice", "all of the above"],
      answer: "all of the above",
    },
    {
      question: "What is the correct syntax for a for loop in Python?",
      options: [
        "for (i = 0; i < 10; i++)",
        "for i in range(10)",
        "for i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        "for i in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
      ],
      answer: "for i in range(10)",
    },
  ];
  let questionsCollection = await questions();
  for (let q of temp) {
    q = {
      ...q,
      upvotedBy: [],
      downvotedBy: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(q);
    questionsCollection.insertOne(q);
  }
  console.log("Done seeding questions into questions collection");
}

await main();
// await closeConnection();
