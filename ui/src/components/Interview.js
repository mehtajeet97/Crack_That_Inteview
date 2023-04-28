import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
export const Interview = () => {
  const [selectedInterviewTime, setSelectedInterviewTime] = useState(null);
  const handleInterviewTimeSelection = (time) => {
    setSelectedInterviewTime(time);
  };
  return (
    <Calendar
      localizer={localizer}
      events={[
        {
          start: new Date("2023-05-03T10:00:00"),
          end: new Date("2023-05-03T11:00:00"),
          title: "Interview with Jeet Mehta",
        },
        {
          start: new Date("2023-05-03T12:00:00"),
          end: new Date("2023-05-03T13:00:00"),
          title: "Interview with Interviewer",
        },
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};
