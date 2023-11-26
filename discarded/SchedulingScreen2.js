/*
Issues:

Duplication of Slot selection for Interviewer as well as User(Student)
Selection Dropdown for each user shows every due to Flat() rather render for each date of availableslots
CSS Render on each page
*/

// const existingObject = user.availableSlots.find((obj) => {
//   for (let i = 0; i < newSlot.length; i++) {
//     if (obj.date === newSlot[i].date) {
//       const hasCommon = obj.timings.some((element) =>
//         newSlot[i].timings.includes(element)
//       );
//       if (hasCommon) {
//         return obj;
//       }
//     }
//   }
// });
// // existingObject will have the object that is already loaded in the availableSlots[] in database
// if (existingObject) {
//   throw `You have an entry for the same date & timeslot. Kindly try again`;
// } else {
//   // The object does not exist, so push it to the available slots array
//   user.availableSlots.push(...newSlot);
// }

import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useParams, useNavigate } from "react-router-dom";

export const SchedulingScreen2 = () => {
  //For UserDetails -- like UserID & Tokens to obtain it from AuthContext/ State Management
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;
  const navigate = useNavigate();

  // For retrieveing Interviewer ID
  const { interviewerId } = useParams();

  //Date retrieval
  const [retrievedDates, setretrievedDates] = useState([]);
  const [renderedOptions, setrenderedOptions] = useState([]);

  //Members for Calendar
  const [selectedDate, setSelectedDate] = useState(null); //To store the selected date
  const [isDateSelected, setIsDateSelected] = useState(false); //To make the calendar selectable

  const handleOnChange = async (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); //To make the calendar selectable
    if (date >= tomorrow) {
      setSelectedDate(date);
      setIsDateSelected(true);
    }
    renderOptions();
  };

  const renderOptions = async () => {
    const scheduleURL = "http://localhost:4000/schedule";
    let { data, status } = await axios.post(
      scheduleURL,
      {
        interviewerId,
      },
      { headers: { Authorization: localStorage.getItem("accessToken") } }
    );

    if (status === 200) {
      const selectedData = selectedDate
        ? data.find((item) => item.date === selectedDate.toDateString())
        : null;
      const selectedTimings = selectedData ? selectedData.timings : [];
      setrenderedOptions(selectedTimings);
    }
  };

  //Dropdowwn
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = async (event) => {
    setSelectedOption(event.target.value);
  };

  //Retrieving Dates
  const handleSubmit = async (event) => {
    event.preventDefault();
    const scheduleURL = "http://localhost:4000/schedule";
    let { data, status } = await axios.post(
      scheduleURL,
      {
        interviewerId,
      },
      { headers: { Authorization: localStorage.getItem("accessToken") } }
    );

    if (status === 200) {
      let datearray = [];
      datearray = data.map((item) => new Date(item.date));
      setretrievedDates(datearray);
    } else {
      console.log("Error!!!");
    }
  };

  // Disable all dates except for the ones in the selectableDates array
  function tileDisabled({ date }) {
    return !retrievedDates.some(
      (selectableDate) => selectableDate.getTime() === date.getTime()
    );
  }

  //Buttons
  const handleSubmitButton = async (event) => {
    //Submits the data to backend for updation

    event.preventDefault();
    let payload = {
      date: selectedDate.toDateString(),
      timings: selectedOption,
    }; //Passes object as { date : toDateString() format, timings : value}
    let userId = userDetails._id;
    let interviewparams = { userId, interviewerId, payload };
    createInterview(interviewparams);
    scheduleInterviewer(payload);
    scheduleUser(payload);
  };
  const scheduleUser = async (payload) => {
    try {
      const studentURL = "http://localhost:4000/schedule/" + userDetails._id;
      let { data, status } = await axios.post(studentURL, payload, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (status === 200) {
        //Display the selected date to the user for edit / Inform the user of success through alert/ toast
        state.triggerToast("Interview Scheduled Successfully!", "success");
        navigate("/feed");
      } else {
        //Inform the user of errors through alert/ toast
        console.log(data.errors);
      }
    } catch (e) {
      if (e.response.data.error === "Access Token expired") {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
      } else {
        state.triggerToast(e.response.data.error, "error");
      }
    }
  };
  const scheduleInterviewer = async (payload) => {
    try {
      const interviewerURL = "http://localhost:4000/schedule/" + interviewerId;
      let { data, status } = await axios.post(interviewerURL, payload, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });

      if (status === 200) {
        //Display the selected date to the user for edit / Inform the user of success through alert/ toast
        state.triggerToast("Interview Scheduled Successfully!", "success");
        navigate("/feed");
      } else {
        //Inform the user of errors through alert/ toast
        console.log(data.errors);
      }
    } catch (e) {
      if (e.response.data.error === "Access Token expired") {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
      } else {
        state.triggerToast(e.response.data.error, "error");
      }
    }
  };
  const createInterview = async (payload) => {
    try {
      const url = "http://localhost:4000/interview/";
      let { data, status } = await axios.post(url, payload, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (status === 200) {
        //Display the selected date to the user for edit / Inform the user of success through alert/ toast
        state.triggerToast("Interview Scheduled Successfully!", "success");
        navigate("/feed");
      } else {
        //Inform the user of errors through alert/ toast
        console.log(data.errors);
      }
    } catch (e) {
      if (e.response.status === 400) {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
        navigate("/login");
      } else {
        state.triggerToast(e.response.data.error, "error");
      }
    }
  };
  return (
    <div>
      <div>
        <h1>Available Time Slots : </h1>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
        >
          Click Here
        </button>
      </div>
      {retrievedDates.length > 0 && (
        <div>
          <Calendar
            value={selectedDate}
            onChange={handleOnChange}
            tileDisabled={tileDisabled}
          />
          {isDateSelected && (
            <div>
              <h1>Select an option:</h1>
              <select value={selectedOption} onChange={handleChange}>
                {renderedOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>{" "}
              <h2>Selected Date : {selectedDate.toLocaleDateString()}</h2>
              <h2>Selected Time Slot : {" " + selectedOption}</h2>
              <button
                onClick={handleSubmitButton}
                disabled={selectedOption > 0}
                type="submit"
                className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
