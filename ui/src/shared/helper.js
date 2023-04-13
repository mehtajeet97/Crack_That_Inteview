export const validation = {
  register: (formData) => {
    let { firstName, lastName, email, password, confirmPassword, age } =
      formData;
    let result = { validationPassed: true, errors: {} };

    if (!firstName || firstName.trim().length <= 3) {
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

    if (!confirmPassword || password !== confirmPassword) {
      result.errors.confirmPassword = "Invalid confirm password";
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
};
