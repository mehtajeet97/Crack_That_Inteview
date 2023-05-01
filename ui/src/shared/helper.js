export const validation = {
  register: (formData) => {
    let { firstName, lastName, email, password, confirmPassword, age } =
      formData;
    let result = { validationPassed: true, errors: {} };

    if (!firstName || !isValidString(firstName)) {
      result.errors.firstName = "Invalid first name provided!";
    }

    if (!lastName || lastName.trim().length <= 3) {
      result.errors.lastName = "Invalid last name provided!";
    }

    if (!email || !email.trim().includes("@") || email.trim().length < 6) {
      result.errors.email = "Invalid email provided!";
    }

    if (!password || password.trim().length < 6) {
      result.errors.password = "Invalid password provided!";
    }

    if (!confirmPassword) {
      result.errors.confirmPassword = "Invalid confirm password provided!";
    }

    if (confirmPassword && password !== confirmPassword) {
      result.errors.confirmPassword = "Passwords do not match";
    }

    if (+age < 13) {
      result.errors.age =
        "Person above the age of 13 can register for this application.";
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

    if (!firstName || !isValidString(firstName) || firstName.length < 3) {
      result.errors.firstName = "Invalid first name provided!";
    }
    else{
      result.data.firstName = firstName.trim();
    }

    if (!lastName || !isValidString(lastName)) {
      result.errors.lastName = "Invalid last name provided!";
    }
    else{
      result.data.lastName = lastName.trim();
    }

    if(!phoneNumber || !(/^\d+$/.test(phoneNumber)) || phoneNumber.length < 10){
      result.errors.phoneNumber = "Invalid Phone Number provided!"
    }
    else{
      result.data.phoneNumber = phoneNumber;
    }

    if(!linkedin || !(/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(linkedin))){
      result.errors.linkedin = "Invalid LinkedIn URL!";
    }
    else{
      result.data.linkedin = linkedin.trim();
    }

    if(!github || !(/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i.test(github))){
      result.errors.github = "Invalid GitHub URL!";
    }
    else{
      result.data.github = github.trim();
    }

    if(!twitter || !(/(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/igm.test(twitter))){
      result.errors.twitter = "Invalid Twitter URL!";
    }
    else{
      result.data.twitter = twitter.trim();
    }

    return result;
  }
};

const isValidString = (string) =>
  typeof string === "string" && string.trim().length;
