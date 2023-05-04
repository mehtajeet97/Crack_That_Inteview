import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
/*
TO-DO :

2. Provide the ID of clicked interviewer when jumping to path : "schedulingscreen2"
3. Render it properly

To-Test:

1. Populate the List of interviwers to choose from (database)
    Logic : create a function getallInterviewers where users are selected based on their role (interviewer)
    Make that function populate the array with values for everything except path
    change the path to Scheduling Screen 2 where user can select a date from available slots
*/

export const ScheduleforStudent = () => {
  const [cards1, setcards1] = useState([]); //Array variable that will hold the list of interviewers

  const handleSubmit = async (event) => {
    //Button click will populate the array
    event.preventDefault();

    const scheduleURL = "http://localhost:3000/schedule";
    let { data, status } = await axios.get(scheduleURL);
    /*
  Values returned:
  _id: 1
  firstName: 1,
  lastName: 1,
  skills: 1,
  organization: 1,
  yoe: 1,
   */
    if (status === 200) {
      setcards1(data);
    } else {
      console.log("Error!!!");
    }
  };

  return (
    <div>
      <div>
        <h1>Avaialable Interviewers : </h1>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full text-black border-2 border-solid border-black hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
        >
          Click Here
        </button>
      </div>
      {cards1.length > 0 && (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
          {cards1.map((card, idx) => (
            <div
              key={idx}
              className="bg-cyan-300 basis-2/7 rounded overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <Link to="/schedulingscreen2">
                  <div className="font-bold text-xl mb-2">
                    {card.firstName} {card.lastName}
                  </div>
                </Link>
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
      )}
    </div>
  );
};
