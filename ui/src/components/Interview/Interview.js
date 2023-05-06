import { useContext } from "react";
import { InterviewerSlots } from "./InterviewerSlots.js";
import { StudentSlots } from "./StudentSlots.js";
import { AuthContext } from "../../context/AuthContext.js";

export const Interview = () => {
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state?.userDetails;
  const userRole = userDetails.role;

  return userRole === "student" ? <StudentSlots /> : <InterviewerSlots />;
};
