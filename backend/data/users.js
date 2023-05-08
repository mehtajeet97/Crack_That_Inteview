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
  isValidEmail,
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
  if (!isValidEmail(email)) {
    return { error: "Invalid email format provided" };
  }
  email = email.trim();
  const userCollection = await users();
  let user = await userCollection.findOne({ email: email });
  if (user === null) return null;
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
      { role: "interviewer", availableSlots: { $ne: [] } },
      {
        projection: {
          firstName: 1,
          lastName: 1,
          skills: 1,
          organization: 1,
          yoe: 1,
          availableSlots: 1,
        },
      }
    )
    .toArray();
  return listOfInterviewers; //returns array of objects (interviewers)
};

const getAvailableSlots = async (id) => {
  //Validation
  id = idCheck(id);

  const userCollection = await users();
  // Find the user with the specified ID
  const user = await userCollection.findOne({ _id: new ObjectId(id) });

  // Extract the availableSlots array from the user document
  const availableSlots = user.availableSlots;

  return availableSlots; //returns array of objects
};

const updateAvailableSlots = async (userId, newSlot) => {
  //Validation through prior function
  const user = await getUserById(userId);
  const userCollection = await users();

  // If the user does not exist, throw an error
  if (!user) {
    throw `User with id ${userId} not found`;
  }

  /*
    Logic : 
    1) Find an object in the availableSlots[] in the database that has the same date as an object in the incoming newSlot array
    2) Requires looping through the availableSlots[] and through the newSlots[]
    3) If there is a common date, then check if the timeslot provided is also the same
    4) Loop through the timings of that object in availableSlots[] and through the timings of the object in newSlot[]
    5) If the timing is same as well, return obj meaning existingObject will be the object present in the availableSlots[] 
    in database that fulfills above conditions
  */
  const existingObject = user.availableSlots.find((obj) => {
    for (let i = 0; i < newSlot.length; i++) {
      if (obj.date === newSlot[i].date) {
        const hasCommon = obj.timings.some((element) =>
          newSlot[i].timings.includes(element)
        );
        if (hasCommon) {
          return obj;
        }
      }
    }
  });
  // existingObject will have the object that is already loaded in the availableSlots[] in database
  if (existingObject) {
    throw `You have an entry for the same date & timeslot. Kindly try again`;
  } else {
    // The object does not exist, so push it to the available slots array
    user.availableSlots.push(...newSlot);
  }

  // Update the user in the database
  const result = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { availableSlots: user.availableSlots } }
  );

  if (result.modifiedCount === 1) {
    return { success: true }; //Succesful updation
  } else {
    return { success: false }; // Unsucessful updation
  }
};

const updateUpcomingInterview = async (userId, newSlot) => {
  try {
    //Validation through prior function
    const user = await getUserById(userId);
    const userCollection = await users();

    // If the user does not exist, throw an error
    if (!user) {
      throw `User with id ${userId} not found`;
    }
    // Check if the object with the same date already exists
    const existingObject = user.upcomingInterviews.find(
      (obj) => obj.date === newSlot.date
    );

    // If the object already exists, do something
    if (existingObject) {
      // Do something

      throw `User ${userId} has an entry for the same date`;
    } else {
      // The object does not exist, so push it to the available slots array
      user.upcomingInterviews.push(newSlot);
    }
    // Update the user in the database
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { upcomingInterviews: user.upcomingInterviews } }
    );
    if (result.modifiedCount === 1) {
      return { success: true }; //Succesful updation
    } else {
      return { success: false }; // Unsucessful updation
    }
  } catch (e) {
    return e; //Errors otherwise
  }
};

const getUpcomingInterviews = async (id) => {
  //Validation
  id = idCheck(id);

  const userCollection = await users();
  // Find the user with the specified ID
  const user = await userCollection.findOne({ _id: new ObjectId(id) });

  // Extract the upcomingInterviews array from the user document
  const upcomingInterviews = user.upcomingInterviews;

  return upcomingInterviews; //returns array of objects
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
  updateUpcomingInterview,
  getUpcomingInterviews,
};
