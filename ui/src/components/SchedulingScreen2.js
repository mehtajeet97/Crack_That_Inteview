/*

TO-DO:
1. Populate the retrievedDates array so that it can be used to showcase only the available dates provided by interviewer
2. User should be able to select one of the provided dates and subsequently one of the time slots and click on Schedule button

On click of Schedule button:
1. a new interview should be created in the interview collections
2. update the upcomingInterviews[] for the interviewer
3. update the upcomingInterviews[] for the student whose is currently scheduling
4. Acknowledge the successful schedule and take the user back to the home screen
*/

/*
Issues:

Duplication of Slot selection for Interviewer as well as User(Student)
Selection Dropdown for each user shows every due to Flat() rather render for each date of availableslots
CSS Render on each page
Role in post payload to differentiate based on what is needed
No more console logs, Clean Up code
*/

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
  const [retrievedOptions, setretrievedOptions] = useState([]);
  const [renderedOptions, setrenderedOptions] = useState([]);

  //Members for Calendar
  const [selectedDate, setSelectedDate] = useState(new Date()); //To store the selected date
  const [isDateSelected, setIsDateSelected] = useState(false); //To make the calendar selectable

  const handleOnChange = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); //To make the calendar selectable
    if (date >= tomorrow) {
      setSelectedDate(date);
      setIsDateSelected(true);
    }
    let renderoptionarray = [];
    renderoptionarray = retrievedOptions.flat();
    console.log(renderoptionarray);
    setrenderedOptions(renderoptionarray);
  };

  //Dropdowwn
  const [selectedOption, setSelectedOption] = useState("");

  //Predefined Options

  const options = ["Option 1", "Option 2", "Option 3"];

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
      let optionarray = [];
      datearray = data.map((item) => new Date(Object.keys(item)[0]));
      optionarray = data.map((item) => Object.values(item)[0]);

      setretrievedDates(datearray);
      setretrievedOptions(optionarray);
      console.log(data);
      console.log(retrievedDates);
      console.log(retrievedOptions);
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
    let payload = { [selectedDate]: selectedOption }; //Passes object as { date : timeslot}
    console.log(payload);
    schedule(payload);
  };

  const schedule = async (payload) => {
    try {
      //   const studentURL = "http://localhost:4000/schedulestudent/" + userDetails._id;
      //   let { data, status } = await axios.post(studentURL, payload, {
      //     headers: { Authorization: localStorage.getItem("accessToken") },
      //   });
      //   if (status === 200) {
      //     //Display the selected date to the user for edit / Inform the user of success through alert/ toast
      //     console.log(data, status);
      //   } else {
      //     //Inform the user of errors through alert/ toast
      //     console.log(data.errors);
      //   }
      const interviewerURL =
        "http://localhost:4000/schedulestudent/" + interviewerId;
      let { data, status } = await axios.post(interviewerURL, payload, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (status === 200) {
        //Display the selected date to the user for edit / Inform the user of success through alert/ toast
        console.log(data, status);
        state.triggerToast("Interview Scheduled Successfully!", "success");
        navigate("/feed");
      } else {
        //Inform the user of errors through alert/ toast
        console.log(data.errors);
      }
    } catch (e) {
      console.log(e.response.data);
      return false;
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
                disabled={selectedOption < 1}
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
