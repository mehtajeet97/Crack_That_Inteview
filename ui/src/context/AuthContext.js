import { createContext } from "react";
import { toast } from "react-toastify";
const showToastMessage = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      break;
  }
};

let initialState = {
  userDetails: {},
  isLoggedIn: false,
  triggerToast: (message, type) => showToastMessage(message, type),
};
if (localStorage.getItem("userDetails")) {
  initialState = {
    ...initialState,
    isLoggedIn: true,
    userDetails: JSON.parse(localStorage.getItem("userDetails")),
  };
}

export const AuthContext = createContext(initialState);
