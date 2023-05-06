// Correlation NEsted Sub queries to join queries.
import { validation, skills, formInitialState } from "../shared/helper.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../joinus.jpg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { cleanList } from "../shared/schoolList.js";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext.js";

const animatedComponents = makeAnimated();
export const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { state, updateState } = useContext(AuthContext);
  console.log(state);
  const [role, setRole] = useState("student");
  const [formStep, setFormStep] = useState(0);
  const [formState, setFormState] = useState(formInitialState);

  const registerUser = async (payload) => {
    try {
      const registerURL = "http://localhost:4000/users";
      let { data } = await axios.post(registerURL, payload, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
      let error = e?.response?.data;
      state.triggerToast(error.errors, "error");
      return false;
    }
  };

  const handleAgeChange = (event) => {
    let value = +event.target.value;
    if (value < 1) {
      event.target.value = 1;
    } else if (value > 100) {
      event.target.value = 100;
    }
    setFormState({ ...formState, age: event.target.value });
    if (Object.keys(errors).includes(event.target.name)) {
      let { [event.target.name]: errorLabel, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleSelectChange = (value) => {
    if (Object.keys(errors).length && Object.keys(errors).includes("school")) {
      let { school, ...rest } = errors;
      setErrors(rest);
    }
    setFormState((prev) => {
      return { ...prev, school: value };
    });
  };

  // const handle

  const handleFieldChange = (event) => {
    const updatedField = {
      ...formState,
      [event.target.name]: event.target.value,
    };

    let noSpaceInputs = ["password", "confirmPassword"];
    if (noSpaceInputs.includes(event.target.name)) {
      updatedField[event.target.name] = event.target.value.trim();
    }

    if (event.target.name === "resume") {
      updatedField.resume = event.target.files[0];
    }

    let errorKeys = Object.keys(errors);
    if (errorKeys.length && errorKeys.includes(event.target.name)) {
      let { [event.target.name]: errorLabel, ...rest } = errors;
      setErrors(rest);
    }
    setFormState(updatedField);
  };

  const handleContinue = (event) => {
    event.preventDefault();

    // We're using event.target since formState has all initial fields and the
    // client side validation would fail since user has not reached the 2nd page to fill in details.
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    setFormState((prev) => {
      return { ...prev, ...formJson, role };
    });

    let validationResult = validation.registerFirstForm(formJson);
    if (!validationResult.validationPassed) {
      setErrors(validationResult.errors);
    } else {
      setFormStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationResult = validation.register(formState);
    if (!validationResult.validationPassed) {
      setErrors(validationResult.errors);
    } else {
      let payload = validationResult.data;
      if (role === "student") {
        payload.school = payload.school.value;
      }
      payload.skills = payload.skills.map((skill) => skill.label);
      registerUser(payload);
    }
  };

  const onFormBack = (event) => setFormStep((prev) => prev - 1);

  const firstForm = (
    <div className="p-4 space-y-4 md:space-y-4 sm:p-6">
      <h1 className="text-2xl font-bold text-center leading-tight tracking-tight text-white">
        Register with us as
      </h1>
      <div className="flex justify-around w-full">
        <button
          onClick={() => {
            setRole("student");
            setFormState((prev) => {
              return { ...prev, role: "student" };
            });
          }}
          className={`px-3 bg-white py-1 cursor-pointer rounded-md text-blue ${
            role === "student" ? "underline text-blue-500" : ""
          }`}
        >
          Student
        </button>
        <button
          onClick={() => {
            setRole("interviewer");
            setFormState((prev) => {
              return { ...prev, role: "interviewer" };
            });
          }}
          className={`px-3 bg-white py-1 cursor-pointer rounded-md text-blue ${
            role === "interviewer" ? "underline text-blue-500" : ""
          }`}
        >
          Interviewer
        </button>
      </div>
      <form className="space-y-4 md:space-y-6" onSubmit={handleContinue}>
        <div className="flex w-full">
          <div className="flex flex-row justify-between w-full">
            <div className="">
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
                value={formState?.firstName}
                onChange={handleFieldChange}
                className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                placeholder="Enter first name"
              />
              {!!errors.firstName && (
                <p className="text-sm text-red-800">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formState?.lastName}
                onChange={handleFieldChange}
                className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                placeholder="Enter last name"
              />
              {!!errors.lastName && (
                <p className="text-sm text-red-800">{errors.lastName}</p>
              )}
            </div>
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
            value={formState?.email}
            onChange={handleFieldChange}
            placeholder="dvaghela@stevens.org"
            className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
            value={formState?.password}
            onChange={handleFieldChange}
            className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
            value={formState?.confirmPassword}
            onChange={handleFieldChange}
            className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
            value={formState?.age}
            className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            onChange={handleAgeChange}
          />
          {!!errors.age && <p className="text-sm text-red-800">{errors.age}</p>}
        </div>
        {/* <Link to={"/feed"}> */}
        <button
          type="submit"
          className="w-full text-white border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
        >
          Continue
        </button>
      </form>
    </div>
  );

  const secondForm = (
    <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
      <button
        className="bg-yellow-100 rounded-md py-1 px-2"
        onClick={onFormBack}
      >
        ← Back
      </button>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit}
        // onChange={handleChange}
      >
        {role === "interviewer" && (
          <div className="flex sm:justify-between flex-col">
            <label
              htmlFor="organisation"
              className="block mb-1 text-sm font-medium text-white"
            >
              Organisation
            </label>
            <input
              type="text"
              value={formState?.organisation}
              onChange={handleFieldChange}
              name="organisation"
              id="organisation"
              className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
              placeholder="Enter your organisation name"
            />
            {!!errors.organisation && (
              <p className="text-sm text-red-800">{errors.organisation}</p>
            )}
          </div>
        )}
        {role === "student" && (
          <div>
            <label
              htmlFor="school"
              className="block mb-1 text-sm font-medium text-white"
            >
              School
            </label>
            <Select
              className="text-sm"
              value={formState.school}
              closeMenuOnSelect={true}
              name="school"
              options={cleanList}
              isClearable={true}
              onChange={handleSelectChange}
            />
          </div>
        )}
        {!!errors.school && (
          <p className="text-sm text-red-800">{errors.school}</p>
        )}
        {role === "student" && (
          <div>
            <label
              htmlFor="resume"
              className="block mb-1 text-sm font-medium text-white"
            >
              Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept="application/pdf"
              className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
              onChange={handleFieldChange}
              required
            />
            {!!errors.resume && (
              <p className="text-sm text-red-800">{errors.resume}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="yoe"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Years of Experience
          </label>
          <select
            name="yoe"
            value={formState?.yoe}
            onChange={handleFieldChange}
            id="yoe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue={true} value="select">
              Select years of experience
            </option>
            <option value="fresher">No experience</option>
            <option value="junior">1 year of experience</option>
            <option value="mid-level">2-3 years of experience</option>
            <option value="senior">3-5 years of experience</option>
            <option value="lead">5+ years of experience</option>
            <option value="staff">10+ years of experience</option>
          </select>
          {!!errors.yoe && <p className="text-sm text-red-800">{errors.yoe}</p>}
        </div>
        <div>
          <label
            htmlFor="careerRole"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {role === "student" ? "Career Role to Pursue" : "Current Role"}
          </label>
          <select
            id="careerRole"
            value={formState?.careerRole}
            name="careerRole"
            onChange={handleFieldChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="select">Select role</option>
            <option value="frontend">Frontend Engineer</option>
            <option value="backend">Backend Engineer</option>
            <option value="fullstack">Fullstack Engineer</option>
            <option value="data_science">Data Science</option>
            <option value="machine_learning">Machine Learning</option>
            <option value="cloud">Cloud Engineer</option>
          </select>
          {!!errors.careerRole && (
            <p className="text-sm text-red-800">{errors.careerRole}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="skills"
            className="block mb-2 text-sm font-medium text-white"
          >
            Skills
          </label>
          <Select
            className="text-sm"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            name="skills"
            options={skills}
            isClearable={true}
            value={formState.skills}
            onChange={(value) =>
              setFormState((prev) => {
                return { ...prev, skills: value };
              })
            }
          />
          {!!errors.skills && (
            <p className="text-sm text-red-800">{errors.skills}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Enter your phone number"
            className="bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            pattern="[\d]{10}"
            title="Phone number should be 10 digits."
            value={formState?.phoneNumber}
            onChange={handleFieldChange}
          />
          {!!errors.age && (
            <p className="text-sm text-red-800">{errors.phoneNumber}</p>
          )}
        </div>
        {/* <Link to={"/feed"}> */}
        <button
          type="submit"
          className="w-full text-white border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
        >
          Submit
        </button>
        {/* </Link> */}
      </form>
    </div>
  );

  const forms = [firstForm, secondForm];
  return (
    <div className="flex flex-row items-center justify-around">
      <img
        src={picture}
        className="w-3/5 lg:block hidden"
        alt="Register with us"
      ></img>
      <div className="w-full rounded-lg shadow max-w-md xl:p-0 bg-blue-500">
        {forms[formStep]}
      </div>
    </div>
  );
};
