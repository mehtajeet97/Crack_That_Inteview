/*
1) Create slots.js in routes to updateAvailableSlots[]
2) Data structure change from array of objects to array of arrays on multiple selection
*/

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import moment from "moment";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export const InterviewerSlots = () => {
  const { state, updateState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    moment().add(1, "day").toDate()
  );
  const [disabledDates, setDisabledDates] = useState([]);
  const [range, setRange] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [pageStep, setPageStep] = useState(0);

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

  const addInterviewerAvailableSlots = async (payload) => {
    try {
      let url = `http://localhost:4000/slots/`;
      let headers = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      let { data, status } = await axios.post(url, payload, headers);
      if (status === 200) {
        state.triggerToast("Interview slots added successfully", "success");
        navigate("/feed");
      } else {
        state.triggerToast("Interview slots could not be added", "error");
      }
    } catch (e) {
      if (e.response.data.error === "Access Token expired") {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
      } else {
        state.triggerToast(e.response.data.error, "error");
        setSelectedSlots([]);
        setDisabledDates([]);
        setPageStep(0);
      }
    }
  };

  const onHandleSubmit = async () => {
    let payload = {
      _id: state.userDetails._id,
      availableSlots: selectedSlots,
    };
    addInterviewerAvailableSlots(payload);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const selectDatePage = (
    <>
      {currentDate.length > 0 ? (
        <p className="text-center text-2xl mb-2 text-black">
          <span className="bold">Start:</span> {currentDate[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {currentDate[1].toDateString()}
        </p>
      ) : (
        <p className="text-center text-2xl mb-2 text-white">
          <span className="bold mr-2">
            {" "}
            {selectedSlots.length ? "Next Available Date" : "Today"}:{" "}
          </span>
          {currentDate.toDateString()}
        </p>
      )}
      <div className="flex w-full justify-around items-center md:flex-row flex-col">
        <Calendar
          onChange={setCurrentDate}
          selectRange={range}
          value={currentDate}
          minDate={moment().add(1, "day").toDate()}
          tileDisabled={handleDisabledDates}
        />
        <div className="flex flex-row gap-4 mt-4">
          {/* <button className="btn" onClick={() => setRange(!range)}>
            Select as {range ? "single date" : "range"}
          </button> */}
          {selectedSlots.length > 0 && (
            <button className="btn" onClick={() => setPageStep(2)}>
              Review
            </button>
          )}
          <button className="btn" onClick={next}>
            Choose Timings
          </button>
        </div>
      </div>
    </>
  );
  const selectSlotsPage = (
    <div>
      <div className="flex justify-around items-center p-4">
        <span className="lg:text-2xl text-lg font-medium text-white text-center">
          Choose time slot: {currentDate.toDateString()}
        </span>
        <button
          className="btn btn-sm bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
          onClick={() =>
            isAllSelected
              ? setCheckedState(new Array(timeSlots.length).fill(false))
              : setCheckedState(new Array(timeSlots.length).fill(true))
          }
        >
          {isAllSelected ? "Unselect All" : "Select All"}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ul className="grid w-[80%] gap-6 md:grid-cols-3">
          {timeSlots.map((slot, idx) => (
            <li key={idx}>
              <input
                type="checkbox"
                id={`checkbox${idx}`}
                value={slot}
                className="hidden peer"
                checked={checkedState[idx]}
                name={inputName}
                onChange={() => handleOnChange(idx)}
              />
              <label
                htmlFor={inputName}
                onClick={() => handleOnChange(idx)}
                className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer   peer-checked:border-yellow-100 peer-checked:bg-blue-600 hover:text-gray-600 peer-checked:text-white hover:bg-gray-50 "
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">{slot}</div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="w-[80%] flex justify-around">
          <button
            disabled={!isOneSelected}
            className="btn min-w-[25%] mt-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
            onClick={handleAddNewSlot}
          >
            Save & Add New Slot
          </button>
          <button
            disabled={!isOneSelected}
            className="btn min-w-[25%] mt-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
            onClick={handlePage2Review}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
  const reviewSlotsPage = (
    <div className="flex flex-col text-center text-white justify-between">
      <span className="text-3xl w-full text-center mb-4">
        Review: {selectedSlots.length} Days Selected
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row p-3 gap-3">
        {selectedSlots.length > 0 &&
          selectedSlots.map((slot, idx) => {
            return (
              <div
                key={idx}
                class="p-2 rounded-lg shadow bg-blue-700 flex flex-col justify-between items-center border-white border-2"
              >
                <h1 className="mb-4 text-white text-2xl">{slot.date}</h1>
                <div class="mt-3 flex gap-2 flex-wrap font-normal">
                  {slot.timings.map((timeSlot, idx) => {
                    return (
                      <button
                        key={idx}
                        className="btn btn-xs bg-blue-600 hover:border-white hover:bg-blue-600 hover:text-white border-none text-white mx-2"
                      >
                        {timeSlot}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handleRemoveSlot(slot)}
                  class="btn btn-xs mt-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <button
        onClick={onHandleSubmit}
        className="btn btn-md mt-4 min-w-[50%] mx-auto bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
      >
        Submit
      </button>
    </div>
  );
  const pages = [selectDatePage, selectSlotsPage, reviewSlotsPage];
  return (
    <div className="max-w-screen-md mx-auto flex-col justify-center overflow-auto items-center bg-blue-700 relative rounded-lg p-4">
      {pages[pageStep]}
    </div>
  );
};
