/*
Issues :
2) Duplication in Create Interview
3) Duplication is prevented by checking if the date is same, however there could be a scenario 
where even if the date is same, the time slot could be different -- This needs to be included as a functionality
4) Code cleanup -- Instead of console.log, display the error message to the user
*/

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import axios from "axios";
import "./Calendar.css";

export const StudentSlots = () => {
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    moment().add(1, "day").toDate()
  );
  const [disabledDates, setDisabledDates] = useState([]);
  const [range, setRange] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [pageStep, setPageStep] = useState(0);

  // For rendering the interviewers through cards
  const [interviewerCards, setInterviewerCards] = useState([]); //Array variable that will hold the list of interviewers

  const [availableSlots, setAvailableSlots] = useState([]);
  const [interviewerId, setInterviewId] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [interviewParams, setInterviewParams] = useState({});

  // Handle First Button click to render interviewers
  const populateInterviewers = async (event) => {
    //Button click will populate the array
    event.preventDefault();

    const scheduleURL = "http://localhost:4000/schedule";
    let { data, status } = await axios.get(scheduleURL, {
      headers: { Authorization: localStorage.getItem("accessToken") },
    });
    /*
  Values returned:
  _id: 1
  firstName: 1,
  lastName: 1,
  skills: 1,
  organization: 1,
  yoe: 1,
  availableSlots : 1
   */
    if (status === 200) {
      setInterviewerCards(data);
    } else {
      state.triggerToast(data.errors, "error");
    }
  };

  const handleSelectInterviewer = (interviewer) => {
    setInterviewId(interviewer._id);
    setInterviewerName(interviewer.firstName + " " + interviewer.lastName);
    renderOptions(interviewer.availableSlots);
    next();
  };
  //
  const renderOptions = (slots) => {
    setAvailableSlots(slots);
  };

  //Buttons
  const handleSubmitButton = async (date, time) => {
    //Submits the data to backend for updation
    let payload = {
      date: date,
      timings: time,
    }; //Passes object as { date : toDateString() format, timings : value}
    let userId = userDetails._id;

    setInterviewParams({ userId, interviewerId, payload });

    next();
  };

  const onHandleSubmit = async () => {
    createInterview(interviewParams);
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
        state.triggerToast(data.errors, "error");
        navigate("/feed");
      }
    } catch (e) {
      if (e.response.data.message === "Access Token expired") {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
        navigate("/login");
      } else {
        state.triggerToast(e.response.data.message, "error");
        navigate("/feed");
      }
    }
  };
  //////
  const timeSlots = [
    "9:00am to 9:45am",
    "10:00am to 10:45am",
    "11:00am to 11:45am",
    "2:00pm to 2:45pm",
    "3:00pm to 3:45pm",
    "4:00pm to 4:45pm",
  ];
  const [checkedState, setCheckedState] = useState(
    new Array(timeSlots.length).fill(false)
  );
  const inputName =
    currentDate.length > 0
      ? currentDate[0].toDateString()
      : currentDate.toDateString();
  const next = () => {
    if (pageStep < pages.length) {
      setPageStep(pageStep + 1);
    }
  };

  const handleDisabledDates = ({ date, view }) => {
    return disabledDates.includes(date.toDateString());
  };
  const isAllSelected = checkedState.every(Boolean);
  const isOneSelected = checkedState.some((value) => value);
  const handleAddNewSlot = () => {
    let newSlot = {
      date: currentDate.toDateString(),
      timings: timeSlots.filter((slot, idx) => checkedState[idx]),
    };
    setCheckedState(new Array(timeSlots.length).fill(false));
    setSelectedSlots([...selectedSlots, newSlot]);
    setDisabledDates([...disabledDates, currentDate.toDateString()]);
    findNextAvailableDate();
    setPageStep(0);
  };

  const findNextAvailableDate = () => {
    let today = moment().add(1, "day").toDate().toDateString();
    while (true) {
      if (
        !disabledDates.includes(today) &&
        today !== currentDate.toDateString()
      ) {
        break;
      }
      today = moment(today).add(1, "day").toDate().toDateString();
    }
    setCurrentDate(new Date(today));
  };

  const back = () => {
    if (pageStep > 0) {
      setPageStep(pageStep - 1);
    }
  };

  const handlePage2Review = () => {
    let newSlot = {
      date: currentDate.toDateString(),
      timings: timeSlots.filter((slot, idx) => checkedState[idx]),
    };

    // Add to main state object and reset time slots for next use.
    setCheckedState(new Array(timeSlots.length).fill(false));
    setSelectedSlots([...selectedSlots, newSlot]);
    setDisabledDates([...disabledDates, currentDate.toDateString()]);
    findNextAvailableDate();
    setPageStep(2);
  };

  const handleRemoveSlot = (slot) => {
    if (selectedSlots.length > 1) {
      setSelectedSlots(selectedSlots.filter((s) => s.date !== slot.date));
      setDisabledDates(disabledDates.filter((d) => slot.date !== d));
      findNextAvailableDate();
    } else if (selectedSlots.length === 1) {
      setSelectedSlots([]);
      setDisabledDates([]);
      setCurrentDate(moment().add(1, "day").toDate());
      setPageStep(0);
    }
    setCheckedState(new Array(timeSlots.length).fill(false));
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const selectInterviewerPage = (
    <>
      <div>
        <h1 className="text-center text-2xl text-white">
          Available Interviewers :{" "}
        </h1>
        <div className="flex flex-col items-center justify-center mt-3">
          <button className="btn" onClick={populateInterviewers}>
            Choose Interviewers
          </button>
        </div>

        {interviewerCards.length > 0 && (
          <div className="flex w-full justify-around items-center md:flex-row flex-col mt-3">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
              {interviewerCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-cyan-300 basis-2/7 rounded overflow-hidden shadow-lg"
                >
                  <div
                    onClick={() => handleSelectInterviewer(card)}
                    className="px-6 py-4 cursor-pointer"
                  >
                    <div className="font-bold text-xl mb-2">
                      {card.firstName} {card.lastName}
                    </div>

                    <p className="text-gray-700 text-base">
                      Skills : {card.skills && card.skills}
                    </p>

                    <p className="text-gray-700 text-base">
                      {!card.skills && `Not Disclosed.`}
                    </p>

                    <p className="text-gray-700 text-base">
                      Company : {card.organization && card.organization}
                    </p>
                    <p className="text-gray-700 text-base">
                      {!card.organization && `Not Disclosed.`}
                    </p>

                    <p className="text-gray-700 text-base">
                      Years of Experience: {card.yoe && card.yoe}
                    </p>
                    <p className="text-gray-700 text-base">
                      {!card.yoe && `Not Disclosed.`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
  const selectSlotPage = (
    <>
      <div>
        <h1 className="text-center text-2xl text-white">Select Timeslot : </h1>
      </div>
      {availableSlots.length > 0 && (
        <div>
          {" "}
          {availableSlots.map((item, index) => {
            return (
              <div
                key={index}
                className="flex w-full justify-around items-center md:flex-row flex-col mt-3"
              >
                <div tabIndex={index} className="collapse group">
                  <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
                    {item.date}
                  </div>
                  <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
                    {item.timings.map((timing, index) => (
                      <p
                        onClick={() => handleSubmitButton(item.date, timing)}
                        key={index}
                        cursor="pointer"
                      >
                        {timing}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const reviewSlotsPage = (
    <>
      <div className="flex flex-col text-center text-white justify-between">
        <span className="text-3xl w-full text-center mb-4">Review:</span>

        {interviewParams.payload && (
          <div className="justify-center">
            <p>Name : {interviewerName}</p>
            <p>Date : {interviewParams.payload.date}</p>
            <p>Time Slot : {interviewParams.payload.timings}</p>
          </div>
        )}

        <button
          onClick={onHandleSubmit}
          className="btn btn-md mt-4 min-w-[50%] mx-auto bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
        >
          Schedule this Interview!
        </button>
      </div>
    </>
  );
  const pages = [selectInterviewerPage, selectSlotPage, reviewSlotsPage];
  return (
    <div className="max-w-screen-md mx-auto flex-col justify-center overflow-auto items-center bg-blue-700 relative rounded-lg p-4">
      {pages[pageStep]}
    </div>
  );
};
