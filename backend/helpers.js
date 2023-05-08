import { ObjectId } from "mongodb";
import moment from "moment";
export const isValidObjectId = (id) =>
  !isUndefinedOrNull(id) && ObjectId.isValid(id);
const isUndefinedOrNull = (value) => !value || value === null;
const isValidString = (string) =>
  typeof string === "string" && string.trim().length;
const isAlphaOnly = (value) => !!value.match(/^[a-zA-Z]+$/);

const isValidName = (name) =>
  !isUndefinedOrNull(name) && isValidString(name) && isAlphaOnly(name);

const isValidSocialLink = (link) =>
  !isUndefinedOrNull(link) && isValidString(link);

export const isValidEmail = (email) =>
  !isUndefinedOrNull(email) &&
  isValidString(email) &&
  !!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{4,}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

String.prototype.toTitleCase = function () {
  // return this.split(" ")
  //   .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
  //   .join(" ");
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const isValidPassword = (password) =>
  !isUndefinedOrNull(password) &&
  isValidString(password) &&
  !!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

const isValidAge = (age) =>
  typeof age === "number" && !isNaN(age) && age >= 13 && age <= 100;

const isResumeUploaded = (resume) => !isUndefinedOrNull(resume);

const isOptionSelected = (value) => value !== "select";
const isValidSchool = (school) => !isUndefinedOrNull(school);
const isValidOrganisation = (organisation) =>
  !isUndefinedOrNull(organisation) && isValidString(organisation);
const isValidSkills = (skills) => !isUndefinedOrNull(skills) && skills.length;
const isValidYoe = (yoe) =>
  !isUndefinedOrNull(yoe) && isValidString(yoe) && isOptionSelected(yoe);
const isValidCareerRole = (careerRole) =>
  !isUndefinedOrNull(careerRole) &&
  isValidString(careerRole) &&
  isOptionSelected(careerRole);
const isBoolean = (value) => typeof value === "boolean";
const isValidRole = (role) =>
  !isUndefinedOrNull(role) &&
  ["admin", "student", "interviewer"].includes(role.trim().toLowerCase());

const isValidPhoneNumber = (phoneNumber) => {
  if (isUndefinedOrNull(phoneNumber)) return false;
  if (
    typeof phoneNumber === "string" &&
    (phoneNumber.trim().length !== 10 || !phoneNumber.match(/[\d]{10}/))
  ) {
    return false;
  }
  if (
    typeof phoneNumber === "number" &&
    (phoneNumber.trim().length !== 10 || !phoneNumber.match(/[\d]{10}/))
  ) {
    return false;
  }
  return true;
};

export const validate = {
  register: (payload) => {
    let {
      role,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      organisation,
      age,
      school,
      yoe,
      careerRole,
      skills,
      phoneNumber,
      resume,
    } = payload;
    let result = { validationPassed: true, errors: {}, data: {} };

    if (!isValidRole(role)) {
      result.errors.role = "Invalid role provided!";
    } else {
      result.data.role = role.trim().toLowerCase();
    }

    if (!isValidName(firstName)) {
      result.errors.firstName = "Invalid first name provided!";
    } else {
      result.data.firstName = firstName.trim().toTitleCase();
    }

    if (!isValidName(lastName)) {
      result.errors.lastName = "Invalid last name provided!";
    } else {
      result.data.lastName = lastName.trim().toTitleCase();
    }

    if (!isValidEmail(email)) {
      result.errors.email = "Invalid email provided!";
    } else {
      result.data.email = email.trim().toLowerCase();
    }

    if (!isValidPassword(password)) {
      result.errors.password = "Invalid password provided!";
    } else {
      result.data.password = password;
    }

    // if (!isValidPassword(confirmPassword)) {
    //   result.errors.confirmPassword = "Invalid confirm password provided!";
    // } else {
    //   result.data.confirmPassword = confirmPassword;
    // }

    // if (confirmPassword && password !== confirmPassword) {
    //   result.errors.confirmPassword = "Passwords do not match";
    // }

    if (!isValidAge(+age)) {
      result.errors.age =
        "Person above the age of 13 can register for this application.";
    } else {
      result.data.age = age;
    }

    if (role === "student") {
      if (!isValidSchool(school)) {
        result.errors.school = "Invalid school provided";
      } else {
        result.data.school = school;
      }
      if (!isValidString(resume)) {
        result.errors.resume = "Invalid resume provided!";
      } else {
        result.data.resume = resume;
      }
    } else if (role === "interviewer") {
      if (!isValidOrganisation(organisation)) {
        result.errors.school = "Invalid organisation provided";
      } else {
        result.data.organisation = organisation;
      }
    }

    if (!isValidYoe(yoe)) {
      result.errors.yoe = "Invalid year of experience";
    } else {
      result.data.yoe = yoe.trim();
    }

    if (!isValidCareerRole(careerRole)) {
      result.errors.careerRole = "Invalid career role";
    } else {
      result.data.careerRole = careerRole.trim();
    }

    if (!isValidSkills(skills)) {
      result.errors.skills = "Invalid skills provided";
    } else {
      result.data.skills = skills;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      result.errors.phoneNumber = "Number should be 10 digits";
    } else {
      result.data.phoneNumber = phoneNumber;
    }

    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }

    return result;
    // Skipping 44, 45, 46
  },
  login: (payload) => {
    let { email, password } = payload;
    let result = { validationPassed: true, errors: {} };

    if (!isValidEmail(email)) {
      result.errors.email = "Invalid email provided!";
    }

    if (!isValidPassword(password)) {
      result.errors.password = "Invalid password provided!";
    }

    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }

    return result;
  },
  banStatus: (payload) => {
    let { _id, isBanned, role, userId } = payload;

    let result = { validationPassed: true, errors: {} };

    if (!isValidObjectId(_id)) {
      result.errors._id = "Invalid admin provided";
    }

    if (!isValidObjectId(userId)) {
      result.errors.userId = "Invalid user Id provided";
    }

    if (!isBoolean(isBanned)) {
      result.errors.isBanned = "Invalid Ban status provided";
    }

    if (role.toLowerCase().trim() !== "admin") {
      result.errors.role = "Invalid role provided";
    }

    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }
    return result;
  },
  updatePremium: (payload) => {
    let { _id, role, isPremiumUser, userId, requestPremium } = payload;
    let result = { validationPassed: true, errors: {} };
    if (!isValidObjectId(userId)) {
      result.errors.userId = "Invalid userId provided";
    }
    if (!isValidObjectId(_id)) {
      result.errors._id = "Invalid admin provided";
    }
    if (!role.toLowerCase().trim() === 0) {
      result.errors.role = "invalid role provided";
    }
    if (!isBoolean(isPremiumUser)) {
      result.errors.isBanned = "Invalid Ban status provided";
    }
    if (!isValidString(requestPremium.message)) {
      result.errors.requestPremium.message = "invalid message";
    }
    if (!isValidString(requestPremium.status)) {
      let status = ["approved", "rejected", "new"];
      if (!status.includes(requestPremium.status)) {
        result.errors.requestPremium.status = "invalid status";
      }
    }
    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }
    return result;

    // let
  },
  //use this for the error handling and get the data checked in admin premium request
};

let idCheck = (id) => {
  if (!id) throw "Id must be provided";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0) throw "Id cannot be empty";
  if (!ObjectId.isValid(id)) throw "Invalid Id";
  return id;
};
let emailCheck = (email) => {
  if (!email) throw "invalid email";
  if (typeof email != "string") throw "email is not a valid string";
  email = email.toLowerCase().trim();
  if (!email) throw "email must not be empty spaces";
  return email;
};

let stringCheck = (str) => {
  if (!str) throw `name must be provided`;
  if (typeof str !== "string") throw "Type not string";
  str = str.trim();
  if (!str) throw "String cannot be empty";
  return str;
};
let isRoleValid = (role) => {
  const roles = ["admin", "interviewee", "interviewer"];
  return roles.includes(role.trim().toLowerCase());
};

let passwordCheck = (pwd) => {
  if (typeof pwd !== "string") throw "Password should be a string";
  if (pwd.trim().length < 8) throw "Password should have at least 8 characters";
  return pwd;
};

let ageCheck = (age) => {
  if (typeof age !== "number") throw "Age must be a number";
  if (age < 13) throw "Only users of 13 and above can sign up";
  if (age > 100) throw "Please enter a valid age";
  return age;
};

let phoneNumberCheck = (num) => {
  if (typeof num !== "number") throw "Phone Number should be a number";
  if (num.toString().length === 0 || num.toString().length < 10)
    throw "Please enter a valid phone number";
  return num;
};

let arrayCheck = (arr) => {
  if (!Array.isArray(arr)) throw "Not an array";
  if (arr.length === 0) throw "Array cannot be empty";
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") throw "Element must be a string";
    if (arr[i].trim().length === 0) throw "Element cannot be empty";
  }
  return arr;
};

let websiteCheck = (website) => {
  if (typeof website !== "string") throw "Website must be a string";
  if (website.trim().length === 0) throw "String cannot be empty";
  if (!website.startsWith("http://www."))
    throw "Website should start with http";
  if (!website.endsWith(".com")) throw "Website should end with .com";
  let start = website.substring(0, 10);
  let end = website.substring(website.length - 4);
  if (website.length - (start.length + end.length) < 5)
    throw "Not enough characters present in website";
  return website;
};

let yearCheck = (year) => {
  if (typeof year !== "number") throw "Year must be a number";
  if (year > 2023 || year < 1900) throw "Not a valid year";
  return year;
};

let dateCheck = (date) => {
  if (typeof date !== "string") throw "Date must be a string";
  if (date.trim().length === 0) throw "Date cannot be empty";
  let result = moment(date, "MM/DD/YYYY", true).isValid();
  if (result !== true) throw "Date is not valid";
  return date;
};

let booleanCheck = (bool) => {
  if (typeof bool !== "boolean") throw "Value must be a boolean";
  return bool;
};

let scoreCheck = (score) => {
  if (typeof score !== "number") throw "User score must be a number";
  if (score < 0 || score > 100) throw "Please enter a valid user score";
  return score;
};
let sendResponse = (data) => {
  return {
    data: data,
    error: false,
  };
};
let sendError = (message) => {
  return {
    error: true,
    message,
  };
};

export {
  idCheck,
  stringCheck,
  passwordCheck,
  ageCheck,
  phoneNumberCheck,
  arrayCheck,
  websiteCheck,
  yearCheck,
  dateCheck,
  booleanCheck,
  scoreCheck,
  emailCheck,
  sendResponse,
  sendError,
  isRoleValid,
};
