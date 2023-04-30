/*
 TO-DO :
1. Submit Logic : Get interviewer ID, Trigger Function update user(id, availableslots, Value)
2. Order of display and insertion ['3 pm to 3.45 pm', '10 am to 10.45 am', '12 pm to 12.45 pm', '1 pm to 1.45 pm']
3. Render Calendar and Checkboxes side-by-side 


//Logic for Backend:
1. Check UserId exists, if not status 400
2. If User exists, then update availableslots
3. If existing avialable slots, append but sort the slots based on the dates
4. On clicking submit, take interviewer 
*/

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const AvailableSlots = () => {
  //Members for Calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const handleOnChange = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date >= tomorrow) {
      setSelectedDate(date);
      setIsDateSelected(true);
    }
  };

  //Members for Checkbox
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  function handleCheckboxChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    }
  }

  //Buttons
  const handleAddNew = () => {
    setSelectedDate(new Date());
    setSelectedCheckboxes([]);
    setIsDateSelected(false);
  };
  const handleSubmit = async () => {
    console.log(selectedDate);
    console.log(selectedCheckboxes);
    //Here comes the Submit Logic
    // const response = await fetch("/api/bookings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     date: selectedDate.toLocaleDateString(),
    //     slots: selectedCheckboxes,
    //   }),
    // });
  };
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
                  value="9 am to 9.45 am"
                  onChange={handleCheckboxChange}
                />
                9 am to 9.45 am
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="10 am to 10.45 am"
                  onChange={handleCheckboxChange}
                />
                10 am to 10.45 am
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="11 am to 11.45 am"
                  onChange={handleCheckboxChange}
                />
                11 am to 11.45 am
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="12 pm to 12.45 pm"
                  onChange={handleCheckboxChange}
                />
                12 pm to 12.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="1 pm to 1.45 pm"
                  onChange={handleCheckboxChange}
                />
                1 pm to 1.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="2 pm to 2.45 pm"
                  onChange={handleCheckboxChange}
                />
                2 pm to 2.45 pm
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="3 pm to 3.45 pm"
                  onChange={handleCheckboxChange}
                />
                3 pm to 3.45 pm
              </label>
              <br />
            </div>
          </div>
        )}

        {!isDateSelected && "Kindly click on the calender"}
      </div>
      <h2>Selected Date : {selectedDate.toLocaleDateString() + " "}</h2>
      <h2>Selected Time Slot : {" " + selectedCheckboxes.join(", ")}</h2>

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full text-black border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        onClick={handleAddNew}
        type="submit"
        className="w-full text-black border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Add New
      </button>
    </div>
  );
};
