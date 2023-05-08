import Router from "express";
import users from "../data/users.js";
import { articleData as articles } from "../data/index.js";
import * as helpers from "../helpers.js";

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const error = [];
    const topUsers = await users.getTopPerformers();
    const article = await articles.getTopArticles();
    if (topUsers.error) error.push(data);

    if (article.error) error.push(data);
    if (error.length > 0) throw topUsers.data;
    res.status(200).json(
      helpers.sendResponse({
        article: article.data,
        topUsers: topUsers.data,
      })
    );
  } catch (e) {
    res.status(400).json(helpers.sendError(e));
  }
});

export default router;
