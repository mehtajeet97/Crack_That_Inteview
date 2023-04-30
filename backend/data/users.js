import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  idCheck,
  passwordCheck,
  ageCheck,
  phoneNumberCheck,
  arrayCheck,
  stringCheck,
  isRoleValid,
} from "../helpers.js";
import bcrypt from "bcryptjs";

const saltRounds = 10;
const date = new Date();

const createUser = async (userDetails) => {
  let {
    firstName,
    lastName,
    age,
    email,
    password,
    phoneNumber,
    resume,
    yoe,
    careerRole,
    skills,
    organization,
    role,
    school,
  } = userDetails;
  // if (!email) throw "Email must be provided";
  // if (!password) throw "Password must be provided";
  // if (!phoneNumber) throw "Phone Number must be provided";
  // firstName = stringCheck(firstName);
  // lastName = stringCheck(lastName);
  // organization = stringCheck(organization);
  // role = stringCheck(role);
  // if (!isRoleValid(role)) throw "invalid role";
  // ageCheck(+age);
  // stringCheck(email);
  // email = email.toLowerCase().trim();
  passwordCheck(password);
  password = password.trim();
  password = await bcrypt.hash(password, saltRounds);

  let user = {
    firstName,
    lastName,
    age,
    email,
    password,
    phoneNumber,
    resume: "",
    skills,
    tags: skills,
    yoe,
    school,
    careerRole,
    profilePhoto: "",
    role,
    blogs: [],
    articlesRead: [],
    pastInterviews: [],
    upcomingInterviews: [],
    availableSlots: [],
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    isPremiumUser: false,
    userScore: 0,
    isBanned: false,
    organization,
  };
  const userCollection = await users();
  const insertedUserInfo = await userCollection.insertOne(user);

  if (!insertedUserInfo.acknowledged || !insertedUserInfo.insertedId)
    throw "Cannot add user";

  // const newId = insertedUserInfo.insertedId.toString();
  user._id = insertedUserInfo.insertedId.toString();
  return user;
};

const getUserById = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const userCollection = await users();
  let listOfUsers = await userCollection.findOne({ _id: new ObjectId(id) });
  if (listOfUsers === null) throw "There is no user with the Id mentioned";
  listOfUsers._id = listOfUsers._id.toString();
  return listOfUsers;
};

const getUserByEmail = async (email) => {
  if (!email) throw "invalid email";
  email = email.trim();
  const userCollection = await users();
  let user = await userCollection.findOne({ email: email });
  if (user === null) throw "there are no user with this email";
  user._id = user._id.toString();
  return user;
};
const getAllUsers = async () => {
  const userCollection = await users();
  let listOfUsers = await userCollection
    .find({}, { projection: { password: 0 } })
    .toArray();
  listOfUsers = listOfUsers.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return listOfUsers;
};

const updateUser = async (id, key, value) => {
  idCheck(id);
  id = id.trim();
  const updatedUser = await getUserById(id);
  delete updatedUser._id;
  stringCheck(key);
  key = key.trim();
  if (key === "firstName") {
    stringCheck(value);
    value = value.trim();
    if (updatedUser.firstName === value) throw "First Name is the same";
    updatedUser.firstName = value;
  }
  if (key === "lastName") {
    stringCheck(value);
    value = value.trim();
    if (updatedUser.lastName === value) throw "Last Name is the same";
    updatedUser.lastName = value;
  }
  if (key === "email") {
    stringCheck(value);
    value = value.trim();
    if (updatedUser.email === value) throw "Email is the same";
    updatedUser.email = value;
  }
  if (key === "phoneNumber") {
    phoneNumberCheck(value);
    value = value.trim();
    if (updatedUser.phoneNumber === value) throw "Phone Number is the same";
    updatedUser.phoneNumber = value;
  }
  if (key === "password") {
    passwordCheck(value);
    value = value.trim();
    if (updatedUser.password === value) throw "Password is the same";
    updatedUser.password = value;
  }
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  updatedUser.updatedAt = `${month}/${day}/${year}`;
  const userCollection = await users();
  const updatedUserInfo = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedUser },
    { returnDocument: "after" }
  );
  if (updatedUserInfo.lastErrorObject.n === 0) {
    throw "The value could not be updated successfully";
  }
  updatedUserInfo.value._id = updatedUserInfo.value._id.toString();
  return updatedUserInfo.value;
};

const removeUser = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "The Id is not valid";
  const userCollection = await users();
  const deletedUser = await userCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletedUser.lastErrorObject.n === 0) {
    throw `The user with Id of ${id} could not be deleted`;
  }
  return `User with ${id} has been successfully deleted!`;
};

// Functions for Interview Scheduling
const getAllInterviewers = async () => {
  const userCollection = await users();
  let listOfInterviewers = await userCollection
    .find(
      { role: "Interviewer" },
      {
        projection: {
          firstName: 1,
          lastName: 1,
          skills: 1,
          organization: 1,
          yoe: 1,
        },
      }
    )
    .toArray();
  return listOfInterviewers; //returns array of objects
};

const updateAvailableSlots = async (userId, slots) => {
  const userCollection = await users();

  // Update the availableSlots array for the specified user
  await userCollection.updateOne(
    { _id: ObjectId(userId) },
    { $addToSet: { availableSlots: slots } }
  );

  // Sort the availableSlots array by date in ascending order
  await userCollection.updateOne(
    { _id: ObjectId(userId) },
    { $sort: { "availableSlots.date": 1 } }
  );

  return { Success: true }; //Returns Success Message
};

const getAvailableSlots = async (id) => {
  const userCollection = await users();
  // Find the user with the specified ID
  const user = await userCollection.findOne({ _id: ObjectId(id) });

  // Extract the availableSlots array from the user document
  const availableSlots = user.availableSlots;

  return availableSlots; //returns array of objects
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUser,
  getUserByEmail,
  getAllInterviewers,
  updateAvailableSlots,
  getAvailableSlots,
};
