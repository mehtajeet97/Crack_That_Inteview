const isUndefinedOrNull = (value) => !value || value === null;
const isValidString = (string) =>
  typeof string === "string" && string.trim().length;
const isAlphaOnly = (value) => !!value.match(/^[a-zA-Z]+$/);

const isValidName = (name) =>
  !isUndefinedOrNull(name) && isValidString(name) && isAlphaOnly(name);

const isValidSocialLink = (link) =>
  !isUndefinedOrNull(link) && isValidString(link);

const isValidEmail = (email) =>
  !isUndefinedOrNull(email) &&
  isValidString(email) &&
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]{3,}\.[a-zA-Z0-9-.]{2,4}$/.test(email);
const isValidRole = (role) =>
  !isUndefinedOrNull(role) &&
  ["admin", "student", "interviewer"].includes(role.trim().toLowerCase());

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
const isValidSkills = (skills) => !isUndefinedOrNull(skills) && skills.length;
const isValidYoe = (yoe) =>
  !isUndefinedOrNull(yoe) && isValidString(yoe) && isOptionSelected(yoe);
const isValidCareerRole = (careerRole) =>
  !isUndefinedOrNull(careerRole) &&
  isValidString(careerRole) &&
  isOptionSelected(careerRole);

const isValidPhoneNumber = (phoneNumber) => {
  if (isUndefinedOrNull(phoneNumber)) {
    return false;
  }
  if (
    typeof phoneNumber === "string" &&
    (phoneNumber.trim().length !== 10 || !phoneNumber.match(/[\d]{10}/))
  ) {
    console.log("in string");
    return false;
  }
  if (
    typeof phoneNumber === "number" &&
    (phoneNumber.toString().trim().length !== 10 ||
      !phoneNumber.match(/[\d]{10}/))
  ) {
    console.log("in number");
    return false;
  }
  return true;
};

const isValidOrganisation = (organisation) =>
  !isUndefinedOrNull(organisation) && isValidString(organisation);

export const validation = {
  registerFirstForm: (payload) => {
    let { firstName, lastName, email, password, confirmPassword, age } =
      payload;
    let result = { validationPassed: true, errors: {}, data: {} };

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

    if (!isValidPassword(confirmPassword)) {
      result.errors.confirmPassword = "Invalid confirm password provided!";
    } else {
      result.data.confirmPassword = confirmPassword;
    }

    if (confirmPassword && password !== confirmPassword) {
      result.errors.confirmPassword = "Passwords do not match";
    }

    if (!isValidAge(+age)) {
      result.errors.age =
        "Person above the age of 13 can register for this application.";
    } else {
      result.data.age = age;
    }

    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }

    return result;
  },
  register: (payload) => {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      age,
      school,
      organisation,
      yoe,
      careerRole,
      skills,
      phoneNumber,
      resume,
      role,
    } = payload;
    let result = { validationPassed: true, errors: {}, data: {} };

    if (!isValidRole(role)) {
      result.errors.role = "Invalid role provided";
    } else {
      result.data.role = role;
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

    if (!isValidPassword(confirmPassword)) {
      result.errors.confirmPassword = "Invalid confirm password provided!";
    } else {
      result.data.confirmPassword = confirmPassword;
    }

    if (confirmPassword && password !== confirmPassword) {
      result.errors.confirmPassword = "Passwords do not match";
    }

    if (!isValidAge(+age)) {
      result.errors.age =
        "Person above the age of 13 can register for this application.";
    } else {
      result.data.age = age;
    }

    if (role === "student") {
      if (!isValidSchool(school)) {
        result.errors.school = "Select your school";
      } else {
        result.data.school = school;
      }
      if (!isResumeUploaded(resume)) {
        result.errors.resume = "Please provide your resume!";
      } else {
        result.data.resume = resume;
      }
    } else if (role === "interviewer") {
      if (!isValidOrganisation(organisation)) {
        result.errors.organisation = "Select your school";
      } else {
        result.data.organisation = organisation;
      }
    }

    if (!isValidYoe(yoe)) {
      result.errors.yoe = "Select your experience";
    } else {
      result.data.yoe = yoe.trim();
    }

    if (!isValidCareerRole(careerRole)) {
      result.errors.careerRole = "Select your career role";
    } else {
      result.data.careerRole = careerRole.trim();
    }

    if (!isValidSkills(skills)) {
      result.errors.skills = "Select your skills";
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
  userProfile: (payload) => {
    let { firstName, lastName, phoneNumber, linkedin, github, twitter } =
    payload;
    let result = { validationPassed: true, errors: {}, data: {}};

    if (!isValidName(firstName)) {
      result.errors.firstName = "Invalid first name provided!";
    }
    else{
      result.data.firstName = firstName?.trim().toTitleCase();
    }

    if (!isValidName(lastName)) {
      result.errors.lastName = "Invalid last name provided!";
    }
    else{
      result.data.lastName = lastName?.trim().toTitleCase();
    }

    if(!isValidPhoneNumber(phoneNumber)){
      result.errors.phoneNumber = "Invalid Phone Number provided!"
    }
    else{
      result.data.phoneNumber = phoneNumber;
    }

    if(linkedin && !(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(linkedin))){
      result.errors.linkedin = "Invalid LinkedIn URL!";
    }
    else{
      result.data.linkedin = linkedin?.trim().toLowerCase();
    }

    if(github && !(/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i.test(github))){
      result.errors.github = "Invalid GitHub URL!";
    }
    else{
      result.data.github = github?.trim().toLowerCase();
    }

    if(twitter && !(/(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/igm.test(twitter))){
      result.errors.twitter = "Invalid Twitter URL!";
    }
    else{
      result.data.twitter = twitter?.trim().toLowerCase();
    }
    
    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }
    
    return result;
  },
  login: (payload) => {
    let { email, password } = payload;
    let result = { validationPassed: true, errors: {}, data: {} };

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

    if (Object.keys(result.errors).length) {
      result.validationPassed = false;
    }

    return result;
  },
};

export const skills = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "Javascript" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "c++", label: "C++" },
  { value: "swift", label: "Swift" },
  { value: "nodejs", label: "NodeJS" },
  { value: "express", label: "Express" },
  { value: "react", label: "React" },
  { value: "mongo", label: "MongoDB" },
  { value: "bash", label: "Bash" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "hadoop", label: "Hadoop" },
  { value: "pyspark", label: "PySpark" },
  { value: "r", label: "R" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "docker", label: "Docker", type: "skills" },
];

export const formInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  password: "",
  confirmPassword: "",
  school: "",
  organisation: "",
  resume: "",
  yoe: "",
  careerRole: "",
  skills: "",
  phoneNumber: "",
  role: "student",
};
