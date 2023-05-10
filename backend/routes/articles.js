/**
 * make sure that the articles can be created edited by admin and admin only
 *
 */

import Router from "express";
import { articleData as articles } from "../data/index.js";
import * as helpers from "../helpers.js";
import xss from "xss";

const router = Router();

//get all articles
router
  .route("/")
  .get(async (req, res) => {
    try {
      const article = await articles.getAllArticles();
      if (article.error) {
        throw article.message;
      }
      res.status(200).json(helpers.sendResponse(article.data));
    } catch (e) {
      res.status(500).json(helpers.sendError("Internal Server Error"));
    }
  })
  .post(async (req, res) => {
    try {
      let data = req.body;
      const errors = [];
      if (data.role !== "admin") {
        throw "invalid role";
      }

      delete data.role;

      try {
        data.content = xss(helpers.stringCheck(data.content));
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
        data.title = xss(helpers.stringCheck(data.title));
      } catch (e) {
        errors.push(e);
      }
      try {
        data.isPremium = helpers.booleanCheck(JSON.parse(data.isPremium));
      } catch (e) {
        errors.push(e);
      }
      // console.log(data);
      if (errors.length > 0) throw errors;
      const addArticle = await articles.createArticle(data);

      if (addArticle.err) {
        res.status(500).json(helpers.sendError("internal server error"));
      } else {
        res.status(200).json(helpers.sendResponse(addArticle.data));
      }
    } catch (e) {
      if (e === "invalid role") {
        res
          .status(401)
          .json(helpers.sendResponse("you are not allowed to edit blogs"));
      } else if (e === "missing credentials") {
        res.status(401).json(helpers.sendResponse("missing login credentials"));
      } else {
        res.status(400).json(helpers.sendError(e));
      }
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
      if (req.headers["update"] === "blog") {
        try {
          if (req.headers["role"] !== "admin") {
            throw role;
          }
          const data = req.body;
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

          try {
            const updatedPost = await articles.update(data);
            res.status(200).json(helpers.sendResponse(updatedPost));
          } catch (e) {
            errors.push(e);
          }
          if (errors.length > 0) {
            throw errors;
          }
        } catch (e) {
          if (role !== "admin") {
            res.status(401).json(helpers.sendError("invalid user"));
          } else {
            res.status(400).json(helpers.sendError("internal server error"));
          }
        }
      } else {
        const data = req.body;
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
      }
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  })
  .delete(async (req, res) => {
    try {
      const errors = [];
      try {
        req.params.id = helpers.idCheck(req.params.id);
      } catch (e) {
        errors.push(e);
      }

      if (errors.length > 0) throw errors;

      const { data } = await articles.removeArticle(req.params.id);
      let response = { id: data, deleted: true };
      res.status(200).json(helpers.sendResponse(response));
    } catch (e) {
      res.status(401).send(e);
    }
  });

export default router;
