import Router from "express";
const router = Router();

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
