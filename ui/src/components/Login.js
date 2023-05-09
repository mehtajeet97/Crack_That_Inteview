import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { validation } from "../shared/helper.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.js";

export const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { state, updateState } = useContext(AuthContext);
  const [responseError, setResponseError] = useState("");
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleFieldChange = (event) => {
    setResponseError(null);
    const updatedField = {
      ...formState,
      [event.target.name]: event.target.value,
    };

    if (event.target.name === "password") {
      updatedField[event.target.name] = event.target.value.trim();
    }

    let errorKeys = Object.keys(errors);
    if (errorKeys.length && errorKeys.includes(event.target.name)) {
      let { [event.target.name]: errorLabel, ...rest } = errors;
      setErrors(rest);
    }
    setFormState(updatedField);
  };

  const setUserDetails = (data) => {
    updateState({ ...state, isLoggedIn: true, userDetails: data.userDetails });
    localStorage.setItem("userDetails", JSON.stringify(data.userDetails));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  const login = async (payload) => {
    try {
      const loginURL = "http://localhost:4000/login";
      let { data, status } = await axios.post(loginURL, payload);
      if (status === 200) {
        setUserDetails(data);
        state.triggerToast(
          `Welcome back, ${data.userDetails.firstName}!`,
          "success"
        );
        navigate("/feed");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        setResponseError(e.response.data.errors);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationResult = validation.login(formState);
    if (!validationResult.validationPassed) {
      setErrors(validationResult.errors);
    } else {
      let payload = validationResult.data;
      login(payload);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-blue-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formState?.email}
                  onChange={handleFieldChange}
                  className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {!!errors.email && (
                <p className="text-sm text-red-800">{errors.email}</p>
              )}
            </div>
            <div
              className="w-full tooltip tooltip-top"
              data-tip="1 Uppercase Letter * 1 Lowercase Letter * 1 Number"
            >
              <label
                htmlFor="password"
                className="text-left block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                value={formState?.password}
                onChange={handleFieldChange}
              />
              {!!errors.password && (
                <p className="text-sm text-red-800">{errors.password}</p>
              )}
            </div>
            {responseError && (
              <p className="text-yellow-200 text-sm">{responseError}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-white font-medium">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-white hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full text-white border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              Sign in
            </button>

            <p className="text-sm font-normal text-white">
              Don’t have an account yet?{" "}
              <Link to={"/register"}>
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
