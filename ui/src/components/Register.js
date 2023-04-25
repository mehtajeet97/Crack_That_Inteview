// Correlation NEsted Sub queries to join queries.
import { validation } from "../shared/helper";
import { useState } from "react";
import picture from "../joinus.jpg";

export const Register = () => {
  const [errors, setErrors] = useState({});

  const handleAgeChange = (e) => {
    let value = +e.target.value;
    if (value < 1) {
      e.target.value = 1;
    } else if (value > 100) {
      e.target.value = 100;
    }
  };

  const handleChange = (event) => {
    if (Object.keys(errors).length) {
      switch (event.target.name) {
        case "firstName":
          if (Object.keys(errors).includes("firstName")) {
            let { firstName, ...rest } = errors;
            setErrors(rest);
          }
          break;
        case "lastName":
          if (Object.keys(errors).includes("lastName")) {
            let { lastName, ...rest } = errors;
            setErrors(rest);
          }
          break;
        case "email":
          if (Object.keys(errors).includes("email")) {
            let { email, ...rest } = errors;
            setErrors(rest);
          }
          break;
        case "password":
          if (Object.keys(errors).includes("password")) {
            let { password, ...rest } = errors;
            setErrors(rest);
          }
          break;
        case "confirmPassword":
          if (Object.keys(errors).includes("confirmPassword")) {
            let { confirmPassword, ...rest } = errors;
            setErrors(rest);
          }
          break;
        case "age":
          if (Object.keys(errors).includes("age")) {
            let { age, ...rest } = errors;
            setErrors(rest);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    // Prevent the browser from reloading the app
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    let validationResult = validation.register(formJson);
    console.log(validationResult);

    if (!validationResult.validationPassed) {
      setErrors(validationResult.errors);
    }
  };

  return (
    <div className="flex flex-row items-center justify-around px-6 py-8 md:h-full lg:py-0">
      <img
        src={picture}
        className="w-3/5 lg:block hidden"
        alt="Register with us"
      ></img>
      <div className="w-full rounded-lg shadow max-w-md sm:max-w-md xl:p-0 bg-blue-500">
        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-white">
            Get yourself registered with us.
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <div className="flex justify-between gap-2">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                  placeholder="Dhruv"
                />
                {!!errors.firstName && (
                  <p className="text-sm text-red-800">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                  placeholder="Vaghela"
                />
                {!!errors.lastName && (
                  <p className="text-sm text-red-800">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="dvaghela@stevens.org"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              {!!errors.email && (
                <p className="text-sm text-red-800">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
              {!!errors.password && (
                <p className="text-sm text-red-800">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••••"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              {!!errors.confirmPassword && (
                <p className="text-sm text-red-800">{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-white"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Enter your age"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleAgeChange}
              />
              {!!errors.age && (
                <p className="text-sm text-red-800">{errors.age}</p>
              )}
            </div>
            {/* <Link to={"/feed"}> */}
            <button
              type="submit"
              className="w-full text-white border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              Continue
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};
