import Router from "express";
import {
  isValidObjectId,
  sendError,
  sendResponse,
  validate,
} from "../helpers.js";
import { concludeExam, getExamInfoById, initiateExam } from "../data/exam.js";

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
  .post(async (req, res) => {
    let payload = req.body;

    let validationResult = validate.initialExam(payload);

    try {
      if (validationResult.validationPassed) {
        let examInfo = await initiateExam(payload);
        res.status(200).send(sendResponse(examInfo));
      } else {
        res
          .status(400)
          .send(sendError(JSON.stringify(validationResult.errors)));
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(sendError(JSON.stringify(e)));
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    let examId = req.params.id;
    let withAnswer = req.query.withAnswer;
    try {
      if (isValidObjectId(examId)) {
        let examInfo = await getExamInfoById(examId, !!withAnswer);
        res.status(200).send(sendResponse(examInfo));
      } else {
        res.status(400).send(sendError(JSON.stringify("Invalid exam id")));
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(sendError(JSON.stringify(e)));
    }
  })
  .put(async (req, res) => {
    let examId = req.params.id;
    let payload = req.body;
    try {
      if (isValidObjectId(examId)) {
        let examInfo = await concludeExam(payload);
        res.status(200).send(sendResponse(examInfo));
      } else {
        res.status(400).send(sendError(JSON.stringify("Invalid exam id")));
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(sendError(JSON.stringify(e)));
    }
  });

export default router;
