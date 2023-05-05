import Router from "express";

const router = Router();

// Flow for scheduling a test
// 1. Get the user id, role and skill to test.
// 2. Create a record in test collection and get 10 questions from questions table
// it in the test collection.
//
// 3.
router
  .route("/")
  .get((req, res) => {
    res.send("in the exam");
  })
  .post((req, res) => {
    res.status(200).send({ message: "Test created" });
  });

router.route("/:id").get((req, res) => {
  res.send("in the exam with id");
});

export default router;
