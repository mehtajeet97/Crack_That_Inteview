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
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export const SchedulingScreen2 = () => {
  const [date, setDate] = useState(new Date());

  const [retrievedDates, setretrievedDates] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const interID = "6452d818714cb24c1249c3a7";
    const scheduleURL = "http://localhost:3000/schedule";
    let { data, status } = await axios.post(scheduleURL, {
      interID: interID,
    });

    if (status === 200) {
      let keyarray = Object.values(data);
      console.log(data);
      console.log(keyarray);
      setretrievedDates(keyarray);

      console.log(retrievedDates);
    } else {
      console.log("Error!!!");
    }
  };

  const selectableDates = [
    new Date(2023, 4, 17),
    new Date(2023, 4, 10),
    new Date(2023, 5, 15),
  ];

  function tileDisabled({ date }) {
    // Disable all dates except for the ones in the selectableDates array

    return !selectableDates.some(
      (selectableDate) => selectableDate.getTime() === date.getTime()
    );
  }

  return (
    <div>
      <div>
        <h1>Avaialable Time Slots : </h1>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
        >
          Click Here
        </button>
      </div>
      <Calendar value={date} onChange={setDate} tileDisabled={tileDisabled} />
    </div>
  );
};
