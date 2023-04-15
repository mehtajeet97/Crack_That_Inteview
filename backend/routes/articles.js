import Router from "express";
import { articleData as articles } from "../data/index.js";
import * as helpers from "../helpers.js";
const router = Router();

//get all articles
router
  .route("/")
  .get(async (req, res) => {
    try {
      const article = await articles.getAllArticles();
      res.status(200).json(article);
    } catch (e) {
      res.status(400).send("error fetching the articles");
    }
  })
  .post(async (req, res) => {
    let data = req.body;
    try {
      data.content = helpers.stringCheck(data.content);
      data.tag = helpers.arrayCheck(data.tag);
      data.title = helpers.stringCheck(data.title);
      const newArticle = {
        title: data.title,
        content: data.content,
        tag: data.tag,
      };
      const addArticle = await articles.createArticle(newArticle);
      res.status(200).json(addArticle);
    } catch (e) {
      res.status(400).send("error adding the article");
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    req.params.id = helpers.idCheck(req.params.id);
    try {
      const article = await articles.getArticleById(req.params.id);
      res.status(200).send(article);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .delete(async (req, res) => {
    req.params.id = helpers.idCheck(req.params.id);

    try {
      const deletionInfo = await articles.removeArticle(req.params.id);

      if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete interview with id of ${id}`;
      }
      let mssg = `deleted user with id ${id}`;
      res.status(200).json(mssg);
    } catch (e) {
      res.status(400).json(e);
    }
  });

export default router;
