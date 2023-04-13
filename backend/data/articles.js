import { articles } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  idCheck,
  arrayCheck,
  stringCheck,
} from "../helpers.js";

const date = new Date();

const createArticle = async (
  title,
  content,
  tags
) => {
  if (!title) throw "Title must be provided";
  if (!content) throw "Content must be provided";
  if (!tags) throw "Tags must be provided";
  stringCheck(title);
  title = title.trim();
  stringCheck(content);
  content = content.trim();
  arrayCheck(tags);
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let article = {};
  article = {
    title,
    content,
    upVotes: ["User1","User2"],
    downVotes: ["User3","User4"],
    upVotesCount: 2,
    downVotesCount: 2,
    url: "<URL of the Blog>",
    type: ["Article","Blog"],
    createdAt: `${month}/${day}/${year}`,
    updatedAt: `${month}/${day}/${year}`,
    tags,
    isPremium: false
  };
  const articleCollection = await articles();
  const insertArticle = await articleCollection.insertOne(article);
  if (!insertArticle.acknowledged || !insertArticle.insertedId)
    throw "Cannot add article";
  const newId = insertArticle.insertedId.toString();
  article._id = newId;
  return article;
};

const getArticleById = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const articleCollection = await articles();
  let listOfArticles = await articleCollection.findOne({ _id: new ObjectId(id) });
  if (listOfArticles === null) throw "There is no article with the Id mentioned";
  listOfArticles._id = listOfArticles._id.toString();
  return listOfArticles;
};

const getAllArticles = async () => {
  const articleCollection = await articles();
  let listOfArticles = await articleCollection.find({}).toArray();
  listOfArticles = listOfArticles.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return listOfArticles;
};

const removeArticle = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const articleCollection = await articles();
  const deletedArticle = await articleCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletedArticle.lastErrorObject.n === 0) {
    throw `The article with Id of ${id} could not be deleted`;
  }
  return `Article with ${id} has been successfully deleted!`;
};

export default { createArticle, getArticleById, getAllArticles, removeArticle };