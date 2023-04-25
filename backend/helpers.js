import { ObjectId } from "mongodb";
import moment from "moment";

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

let stringCheck = (str, strName) => {
  if (!str) throw `${strName} must be provided`;
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
let sendResponse = (message, data) => {
  return {
    message,
    data,
  };
};
let sendError = (error) => {
  return {
    error,
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
