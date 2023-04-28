import { Calendar, momentLocalizer } from "react-calendar";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Time from "./Interviewtime.js";

export const Interview = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  return (
    <div>
      <h1>Interview Scheduling</h1>

      <div>
        <label htmlFor="date">Date</label>
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={() => setShowTime(true)}
        />
      </div>

      {date.length > 0 ? (
        <p>
          <span>Start:</span>
          {date[0].toDateString()}
          &nbsp; &nbsp;
          <span>End:</span>
          {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Default selected date:</span>
          {date.toDateString()}
        </p>
      )}
      <Time showTime={showTime} date={date} />
    </div>
  );
};
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { useState } from "react";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);
// export const Interview = () => {
//   const [selectedInterviewTime, setSelectedInterviewTime] = useState(null);
//   const handleInterviewTimeSelection = (time) => {
//     setSelectedInterviewTime(time);
//   };
//   return (
//     <Calendar
//       localizer={localizer}
//       events={[
//         {
//           start: new Date("2023-05-03T10:00:00"),
//           end: new Date("2023-05-03T11:00:00"),
//           title: "Interview with Jeet Mehta",
//         },
//         {
//           start: new Date("2023-05-03T12:00:00"),
//           end: new Date("2023-05-03T13:00:00"),
//           title: "Interview with Interviewer",
//         },
//       ]}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   );
// };
