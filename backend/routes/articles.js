import Router from "express"
const router  = Router()
import { articleData } from "../data/index.js";
import * as helpers from "../helpers.js";

router.route("/")
    .get(async (req,res)=>{
          try {
            let articleList = await articleData.getAllArticles();
            res.json(articleList);
          } catch (e) {
            res.status(400).json({ error: e });
          }
    })
    .post(async (req, res) => {
        let articleInfo = req.body;
        if (!articleInfo || Object.keys(articleInfo).length === 0) {
          return res.status(400).json({ error: "There are no fields in the request body" });
        }
        try {
            articleInfo.title = helpers.stringCheck(articleInfo.title);
            articleInfo.content = helpers.stringCheck(articleInfo.content);
            articleInfo.tags = helpers.ageCheck(articleInfo.tags);
        } catch (e) {
          return res.status(400).json({ error: e });
        }
        try {
          let newArticle = await articleData.createArticle(
            articleInfo.title,
            articleInfo.content,
            articleInfo.tags 
          );
          res.json(newArticle);
        } catch (e) {
          res.status(400).json({ error: e });
        }
    });

router.route("/:id")
.get(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let article = await articleData.getArticleById(req.params.id);
      res.json(article);
    } catch (e) {
      res.status(404).json({ error: "Article not found" });
    }
  })
.delete(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let deletedArticle = await articleData.removeArticle(req.params.id);
      res.json(deletedArticle);
    } catch (e) {
      res.status(404).json({ error: "Article not found" });
    }
  });

export default router;