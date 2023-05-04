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
      if (article.error) {
        throw article.data;
      }
      res.status(200).json(helpers.sendResponse(article.data));
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  })
  .post(async (req, res) => {
    try {
      let data = req.body;
      const errors = [];

      try {
        data.content = helpers.stringCheck(data.content);
      } catch (e) {
        errors.push(e);
      }
      try {
        data.tags = helpers.arrayCheck(data.tags);
        // data.tags = helpers.arrayCheck(["Python", "Machine Learning"]);
      } catch (e) {
        errors.push(e);
      }
      try {
        data.title = helpers.stringCheck(data.title);
      } catch (e) {
        errors.push(e);
      }
      try {
        data.isPremium = helpers.booleanCheck(JSON.parse(data.isPremium));
      } catch (e) {
        errors.push(e);
      }

      if (errors.length > 0) throw errors;
      const addArticle = await articles.createArticle(data);
      if (addArticle.err) {
        throw addArticle.data;
      }
      res.status(200).json(helpers.sendResponse(addArticle.data));
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
      const article = await articles.getArticleById(req.params.id);
      if (article.error) {
        throw article.data;
      } else {
        res.status(200).json(helpers.sendResponse(article.data));
      }
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  })
  .delete(async (req, res) => {
    //only admin
    // req.params.id = helpers.idCheck(req.params.id);
    // try {
    //   const deletionInfo = await articles.removeArticle(req.params.id);
    //   if (deletionInfo.lastErrorObject.n === 0) {
    //     throw `Could not delete interview with id of ${id}`;
    //   }
    //   let mssg = `deleted user with id ${id}`;
    //   res.status(200).json(helpers.sendResponse(mssg));
    // } catch (e) {
    //   res.status(400).json(helpers.sendError(e));
    // }
  })
  .put(async (req, res) => {
    //only admin
    // req.params.id = helpers.idCheck(req.params.id);
    // try {
    //   const update = await bands.update(_id, upVote, downVote);
    //   res.status(200).send(update);
    // } catch (e) {}
  })
  .patch(async (req, res) => {
    //this put request is to only update the blog upvotes and downvotes

    try {
      const errors = [];
      const data = req.body;
      console.log({ data });
      if (!data || Object.keys(data).length === 0) {
        return "error while liking the blog";
      }
      try {
        req.params.id = helpers.idCheck(req.params.id);
      } catch (e) {
        errors.push(e);
      }

      if (errors.length > 0) {
        throw errors;
      }

      const updatedPost = await articles.updateVote(req.params.id, data);
      if (updatedPost.err) {
        throw updatedPost.data;
      }

      res.status(200).json(helpers.sendResponse(updatedPost));
    } catch (e) {
      console.log(e, "errors here");
      res.status(400).json(helpers.sendError(e));
    }
  });

export default router;
