import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export const SchedulingScreen3 = () => {
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

  //Schedule Function
  const schedule = async (payload) => {
    try {
      const scheduleURL = "http://localhost:3000/schedule";
      let { data, status } = await axios.put(scheduleURL, payload);
      if (status === 200) {
        //Display the selected date to the user for edit
      } else {
        console.log(data.errors);
      }
    } catch (e) {
      console.log(e.response.data);
      return false;
    }
  };

  //Buttons
  const handleAddNew = () => {
    setSelectedDate(new Date());
    setSelectedCheckboxes([]);
    setIsDateSelected(false);
  };
  const handleSubmit = async (event) => {
    console.log(selectedDate);
    console.log(selectedCheckboxes);

    event.preventDefault();
    let payload = { selectedDate: selectedCheckboxes };
    schedule(payload);

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

  //Sort the selected time slots in order
  const sortSelectedCheckboxes = () => {
    return selectedCheckboxes.sort((a, b) => {
      return a.start - b.start;
    });
  };

  return (
    <div className="flex justify-between mt-2">
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
              {sortSelectedCheckboxes().map((checkbox) => (
                <label key={checkbox.value}>
                  <input
                    type="checkbox"
                    value={checkbox.value}
                    onChange={handleCheckboxChange}
                  />
                  {checkbox.value}
                </label>
              ))}
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
        className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        onClick={handleAddNew}
        type="submit"
        className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
      >
        Add New
      </button>
    </div>
  );
};
