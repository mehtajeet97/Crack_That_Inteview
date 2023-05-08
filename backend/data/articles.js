import { articles } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { idCheck, arrayCheck, stringCheck, booleanCheck } from "../helpers.js";

const date = new Date();

const createArticle = async (data) => {
  const error = [];
  try {
    try {
      data.title = stringCheck(data.title);
    } catch (e) {
      error.push(e);
    }
    try {
      data.content = stringCheck(data.content);
    } catch (e) {
      error.push(e);
    }
    try {
      data.tags = arrayCheck(data.tags);
    } catch (e) {
      error.push(e);
    }
    try {
      data.isPremium = booleanCheck(data.isPremium);
    } catch (e) {
      error.push(e);
    }
    console.log(error);
    let article = {
      title: data.title,
      content: data.content,
      upVotes: [],
      downVotes: [],
      upVotesCount: 0,
      downVotesCount: 0,
      updatedAt: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      tags: data.tags,
      isPremium: data.isPremium,
    };
    if (error.length > 0) {
      throw error;
    }
    const articleCollection = await articles();
    const insertArticle = await articleCollection.insertOne(article);
    if (!insertArticle.acknowledged || !insertArticle.insertedId)
      throw "Cannot add article";
    const newId = insertArticle.insertedId.toString();
    article._id = newId;
    return { data: article, err: false };
  } catch (e) {
    return { data: e, err: true };
  }
};

const getArticleById = async (id, isPremium) => {
  const error = [];
  try {
    try {
      id = idCheck(id);
    } catch (e) {
      error.push(e);
    }
    if (error.length > 0) {
      throw error;
    }
    const articleCollection = await articles();
    let listOfArticles = await articleCollection.findOne({
      _id: new ObjectId(id),
    });
    if (listOfArticles === null)
      throw "There is no article with the Id mentioned";
    listOfArticles._id = listOfArticles._id.toString();
    return { data: listOfArticles, error: false };
  } catch (e) {
    return { data: e, error: true };
  }
};

const getAllArticles = async () => {
  try {
    const articleCollection = await articles();
    let listOfArticles = await articleCollection.find({}).toArray();
    listOfArticles = listOfArticles.map((element) => {
      element._id = element._id.toString();
      return element;
    });

    return { data: listOfArticles, error: false };
  } catch (e) {
    return { message: e, error: true };
  }
};
//only admin can update the blog
const update = async (article) => {
  article._id = stringCheck(article._id);

  if (!ObjectId.isValid(article._id))
    throw "the input string is not a valid id";
  const updated = {
    title: article.title,
    content: article.content,
  };
  const articleCollection = await articles();
  const updatedInfo = await articleCollection.findOneAndUpdate(
    { _id: new ObjectId(article._id) },
    { $set: updated },
    { returnDocument: "after" }
  );

  if (updatedInfo.lastErrorObject.n === 0) {
    throw "could not update the band details";
  }
  updatedInfo.value._id = updatedInfo.value._id.toString();
  return updatedInfo.value;
};
const removeArticle = async (id) => {
  //only admin can do this
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const articleCollection = await articles();
  const deletedArticle = await articleCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (deletedArticle.lastErrorObject.n === 0) {
    throw { error: true, data: "not found" };
  }
  return { data: id, error: false };
};
// changing the votes from the user
const updateVote = async (id, data) => {
  try {
    const errors = [];
    console.log("in update vote", { data });
    try {
      id = idCheck(id);
    } catch (e) {
      errors.push(e);
    }

    if (errors.length > 0) {
      throw errors;
    }
    const articleCollection = await articles();
    data.upVotesCount = data.upVotes.length;
    data.downVotesCount = data.downVotes.length;

    const updatedInfo = await articleCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );

    // console.log(updatedInfo)
    if (updatedInfo.lastErrorObject.n === 0) {
      throw "could not add the upvotes the band details";
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();
    return { data: updatedInfo.value, error: false };
  } catch (e) {
    return { data: e, error: true };
  }
};
const getTopArticles = async () => {
  try {
    const articleCollection = await articles();

    let listOfArticles = await articleCollection
      .find({})
      .sort({ upVotesCount: -1 })
      .limit(3)
      .toArray();

    if (listOfArticles.length === 0) throw "couldnt fetch the articles";
    listOfArticles = listOfArticles.map((element) => {
      element._id = element._id.toString();
      return element;
    });

    return { data: listOfArticles, error: false };
  } catch (e) {
    return { data: e, error: true };
  }
};
export default {
  update,
  createArticle,
  getArticleById,
  getAllArticles,
  removeArticle,
  updateVote,
  getTopArticles,
};
