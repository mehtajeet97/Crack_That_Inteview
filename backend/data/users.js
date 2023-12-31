//error with projection in get top for trending
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
  isValidPassword,
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
  isValidPassword(password);
  password = password.trim();
  password = await bcrypt.hash(password, saltRounds);
  let user = {
    firstName,
    lastName,
    age,
    email,
    password,
    phoneNumber,
    resume,
    skills,
    linkedin: "",
    twitter: "",
    github: "",
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
    requestPremium: { message: "", status: "new", allow: true },
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
    return { error: "Invalid email provided" };
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

const updateUser = async (id, user) => {
  idCheck(id);
  id = id.trim();
  const userOrig = await getUserById(id);
  let updatedUser = { ...userOrig, ...user };
  delete updatedUser._id;
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
  return updatedUserInfo;
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
const patchUser = async (id, data) => {
  //just added this function to
  try {
    const error = [];

    if (data.method == "premium-request") {
      try {
        id = idCheck(id);
      } catch (e) {
        error.push(e);
      }
      try {
        data.message = stringCheck(data.message);
      } catch (e) {
        error.push(e);
      }
      try {
        data.status = stringCheck(data.status);
      } catch (e) {
        error.push(e);
      }
    } else {
      try {
        id = idCheck(id);
      } catch (e) {
        error.push(e);
      }
      try {
        data.blogId = idCheck(data.blogId);
      } catch (e) {
        error.push(e);
      }
      try {
        data.blogId = stringCheck(data.blogTitle);
      } catch (e) {
        error.push(e);
      }
    }

    const userCollection = await users();
    let user = await userCollection.find({ _id: new ObjectId(id) }).toArray();
    user = user[0];
    if (!user) throw "user not found";
    if (data.method == "premium-request") {
      delete data.method;
      user.requestPremium = data;
      user = { ...user };
    } else {
      if (!user.blogs.includes(data.blogId)) user.blogs.push(data.blogTitle);
    }

    const updatedInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user },
      {
        returnDocument: "after",
        projection: {
          password: 0,
          phoneNumber: 0,
          pastInterviews: 0,
          upcomingInterviews: 0,
        },
      }
    );

    // console.log(updatedInfo)
    if (updatedInfo.lastErrorObject.n === 0) {
      throw "could not update the user details";
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();
    // console.log(updatedInfo);
    return { data: updatedInfo.value, error: false };
  } catch (e) {
    return { data: e, error: true };
  }
};
const getTopPerformers = async () => {
  try {
    const userCollection = await users();
    let listOfUsers = await userCollection
      .find({})
      .project({
        _id: 1,
        firstName: 1,
        lastName: 1,
        skills: 1,
        tags: 1,
        profilePhoto: 1,
        isPremiumUser: 1,
        userScore: 1,
        organization: 1,
      })
      .sort({ userScore: -1 })
      .limit(3)
      .toArray();
    if (!listOfUsers.length) throw "error fetching the data";

    listOfUsers = listOfUsers.map((element) => {
      element._id = element._id.toString();
      return element;
    });

    return { data: listOfUsers, error: false };
  } catch (e) {
    return { data: e, error: true };
  }
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

export const updateUserBanStatus = async (userDetails) => {
  let { _id, isBanned, role, userId } = userDetails;
  try {
    const userCollection = await users();
    const { lastErrorObject, value } = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { isBanned } },
      { returnDocument: "after" }
    );
    let { password, ...rest } = value;
    return rest;
  } catch (e) {
    // console.log(e);
    return false;
  }
};

// Route : schedule.js | ("/").post |  returns availableSlots[] (For rendering the Calendar for user to select matching slot)
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

  // Check if the date of each obj in newSlots[] is the same as that of each in availableSlots[]
  for (const incomingSlot of newSlot) {
    const foundIndex = user.availableSlots.findIndex(
      (slot) => slot.date === incomingSlot.date
    );

    if (foundIndex !== -1) {
      // If the date is found, further check if all the timings is the same
      const foundSlot = user.availableSlots[foundIndex];
      if (
        foundSlot.timings.every((timing) => timing === incomingSlot.timings)
      ) {
        throw `You have an entry for the same date & timeslot. Kindly try again`;
      } else {
        // If the date is the same, but the timings array has some values that are different
        const uniqueTimings = [
          ...new Set(foundSlot.timings.concat(incomingSlot.timings)),
        ];
        foundSlot.timings = uniqueTimings;
      }
    } else {
      // If the date is not the same, then insert the object into the availableSlots[]
      user.availableSlots.push(incomingSlot);
    }
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

  // If the object already exists, throw an error
  if (existingObject) {
    throw `Interview already scheduled for this day. Please try again`;
  } else {
    // The object does not exist, so push it to the available slots array
    user.upcomingInterviews.push(newSlot);
  }
  // Update the user in the database
  const result = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { upcomingInterviews: user.upcomingInterviews } },
    { returnDocument: "after" }
  );
  if (result.modifiedCount === 1) {
    return { success: true }; //Succesful updation
  } else {
    return { success: false }; // Unsucessful updation
  }
};

const removeAvailableSlots = async (userId, newSlot) => {
  //Validation through prior function
  const user = await getUserById(userId);
  const userCollection = await users();

  // If the user does not exist, throw an error
  if (!user) {
    throw `User with id ${userId} not found`;
  }
  // Check if the date of incoming data matches any date in my database
  const foundIndex = user.availableSlots.findIndex(
    (slot) => slot.date === newSlot.date
  );

  // If the date is found, delete the specific timings provided in incoming data from the database of that specific date
  if (foundIndex !== -1) {
    user.availableSlots[foundIndex].timings = user.availableSlots[
      foundIndex
    ].timings.filter((timing) => timing !== newSlot.timings);
  }

  // Update the user in the database
  const result = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { availableSlots: user.availableSlots } },
    { returnDocument: "after" }
  );
  if (result.modifiedCount === 1) {
    return { success: true }; //Succesful updation
  } else {
    return { success: false }; // Unsucessful updation
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

const getPastInterviews = async (id) => {
  //Validation
  id = idCheck(id);

  const userCollection = await users();
  // Find the user with the specified ID
  const user = await userCollection.findOne({ _id: new ObjectId(id) });

  // Extract the upcomingInterviews array from the user document
  const pastInterviews = user.pastInterviews;

  return pastInterviews; //returns array of objects
};

const moveToPast = async (userid, interviewId) => {
  //Validation through prior function
  const user = await getUserById(userid);
  const userCollection = await users();
  // If the user does not exist, throw an error
  if (!user) {
    throw `User with id ${userid} not found`;
  }
  const foundInterview = user.upcomingInterviews.find(
    (interview) =>
      JSON.stringify(interview.interviewid) === JSON.stringify(interviewId)
  );
  // console.log(foundInterview);

  if (foundInterview) {
    user.upcomingInterviews.splice(
      user.upcomingInterviews.indexOf(foundInterview),
      1
    );
    user.pastInterviews.push(foundInterview);
  } else {
    throw `No interview with that Id present`;
  }
  // Update the user in the database
  const result = await userCollection.updateOne(
    { _id: new ObjectId(userid) },
    {
      $set: {
        upcomingInterviews: user.upcomingInterviews,
        pastInterviews: user.pastInterviews,
      },
    },
    { returnDocument: "after" }
  );
  if (result.modifiedCount === 1) {
    return { success: true }; //Succesful updation
  } else {
    return { success: false }; // Unsucessful updation
  }
};

const updateUserPremiumStatus = async (userDetails) => {
  // let { _id, isPremiumUser, requestPremium, role, userId } = userDetails;
  try {
    const userCollection = await users();
    const { lastErrorObject, value } = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userDetails.userId) },
      {
        $set: {
          isPremiumUser: userDetails.isPremiumUser,
          requestPremium: { ...userDetails.requestPremium },
        },
      },
      { returnDocument: "after" }
    );

    if (lastErrorObject.n === 0) {
      throw "user not found";
    }
    let { password, ...rest } = value;

    return rest;
  } catch (e) {
    return e;
    // return false;
  }
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  removeUser,
  getUserByEmail,
  patchUser,
  getTopPerformers,
  getAllInterviewers,
  updateAvailableSlots,
  getAvailableSlots,
  updateUpcomingInterview,
  getUpcomingInterviews,
  getPastInterviews,
  removeAvailableSlots,
  moveToPast,
  updateUserPremiumStatus,
};
