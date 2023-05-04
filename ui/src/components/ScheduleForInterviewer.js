/*
 TO-DO :

3. Create another button "Cancel/ GO back" that links back to the feed screen -- This should be disabled until once clicked on Submit button
4. Render Calendar and Checkboxes side-by-side 
5. On clicking submit, The interviewer should be able to see his selected date and slot
6. Disable date once selected, no multiple submissions for single date
7. Ability to edit slots -- Delete from the showcased list and date should be re-enabled

//Logic for Backend:
1. Check UserId exists, if not status 400
2. If User exists, then update availableslots
3. If existing avialable slots, append but sort the slots based on the dates

To-Test:
1. Submit Logic : Get interviewer ID, Trigger Function update user(id, availableslots, Value)
2. Order of display and insertion ['3 pm to 3.45 pm', '10 am to 10.45 am', '12 pm to 12.45 pm', '1 pm to 1.45 pm']
3. Buttons disabled until atleast one checkbox is checked
*/

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export const ScheduleForInterviewer = () => {
  //Members for Calendar
  const [selectedDate, setSelectedDate] = useState(new Date()); //To store the selected date
  const [isDateSelected, setIsDateSelected] = useState(false); //To make the calendar selectable

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); //To disable selection of past dates

  const handleOnChange = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); //To make the calendar selectable
    if (date >= tomorrow) {
      setSelectedDate(date);
      setIsDateSelected(true);
    }
  };

  //Members for Checkbox
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); //To store selected checkbox value

  function handleCheckboxChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value) //To toggle selection and deselection
      );
    }
  }

  //Schedule Function
  const schedule = async (payload) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const scheduleURL = "http://localhost:3000/schedule/" + userDetails._id;
      let { data, status } = await axios.post(scheduleURL, payload);
      if (status === 200) {
        //Display the selected date to the user for edit / Inform the user of success through alert/ toast
        console.log(data, status);
      } else {
        //Inform the user of errors through alert/ toast
        console.log(data.errors);
      }
    } catch (e) {
      console.log(e.response.data);
      return false;
    }
  };

  //Buttons
  const handleAddNew = (event) => {
    //Resets the calendar and checkboxes for a new selection
    event.preventDefault();
    setSelectedDate(new Date());
    setSelectedCheckboxes([]);
    setIsDateSelected(false);
  };

  const handleSubmit = async (event) => {
    //Submits the data to backend for updation

    event.preventDefault();
    let payload = { [selectedDate]: selectedCheckboxes }; //Passes object as { date : [timeslots]}
    schedule(payload);
  };
  // DO NOT CHANGE the value or label of the time slots below, they are helping in maintaining the order on selection and deselection
  return (
    <div className="grid">
      <h1>Select a date : </h1>
      <p>
        (To accomodate international interview requests, please select dates
        from day after tomorrow)
      </p>
      <Calendar
        className="grid-cols-6"
        onChange={handleOnChange}
        value={selectedDate}
        minDate={minDate}
      />
      <div>
        {isDateSelected && (
          <div className="grid-cols-6">
            <h2> Select a time slot :</h2>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="09.00 to 9.45"
                  onChange={handleCheckboxChange}
                />
                09.00 to 9.45 am
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="10.00 to 10.45"
                  onChange={handleCheckboxChange}
                />
                10.00 to 10.45 am
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="11.00 to 11.45"
                  onChange={handleCheckboxChange}
                />
                11.00 to 11.45 am
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="12.00 to 12.45"
                  onChange={handleCheckboxChange}
                />
                12.00 to 12.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="13.00 to 13.45 "
                  onChange={handleCheckboxChange}
                />
                13.00 to 13.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="14.00 to 14.45"
                  onChange={handleCheckboxChange}
                />
                14.00 to 14.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="15.00 to 15.45"
                  onChange={handleCheckboxChange}
                />
                15.00 to 15.45 pm
              </label>
              <br />
            </div>
          </div>
        )}

        {!isDateSelected && "Kindly click on the calender"}
      </div>
      <h2>Selected Date : {selectedDate.toLocaleDateString()}</h2>
      <h2>Selected Time Slot : {" " + selectedCheckboxes.sort().join(", ")}</h2>

      <button
        onClick={handleSubmit}
        disabled={selectedCheckboxes < 1}
        type="submit"
        className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        onClick={handleAddNew}
        disabled={selectedCheckboxes < 1}
        type="submit"
        className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Add New
      </button>
    </div>
  );
};
