import { Link } from "react-router-dom";

/*
TO-DO :
1. Populate the List of interviwers to choose from (database)
    Logic : create a function getallInterviewers where users are selected based on their role (interviewer)
    Make that function populate the array with values for everything except path
    change the path to Scheduling Screen 2 where user can select a date from available slots
    
2. Provide the path to each interviewer as opposed to the current dummy path : "interview"
*/

export const SchedulingScreen1 = () => {
  const cards = [
    {
      title: "Interviewer 1",
      path: "http://localhost:3000/interview",
      skills: "Java, Python",
      company: "Google",
      yoe: "5",
    },
    {
      title: "Interviewer 2",
      path: "http://localhost:3000/interview",
      skills: "DevOps",
      company: "Microsoft",
      yoe: "3",
    },
    {
      title: "Interviewer 3",
      path: "http://localhost:3000/interview",
      skills: "Machine Learning",
      company: "Meta",
      yoe: "7",
    },
  ];

  return (
    <div>
      <div>
        <h1>Avaialable Interviewers</h1>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-cyan-300 basis-2/7 rounded overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <Link to={card.path}>
                <div className="font-bold text-xl mb-2">{card.title}</div>
              </Link>
              <p className="text-gray-700 text-base">
                Skills : {card.skills && card.skills}
              </p>
              <p className="text-gray-700 text-base">
                {!card.skills && `Not Disclosed.`}
              </p>

              <p className="text-gray-700 text-base">
                Company : {card.company && card.company}
              </p>
              <p className="text-gray-700 text-base">
                {!card.company && `Not Disclosed.`}
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
  );
};
