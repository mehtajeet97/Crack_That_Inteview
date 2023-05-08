import { createContext } from "react";
import { toast } from "react-toastify";

export const showToastMessage = (message, type) => {
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
    case "warning":
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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

export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        userDetails: JSON.parse(localStorage.getItem("userDetails")),
        isLoggedIn: true,
        accessToken: localStorage.getItem("accessToken"),
      };
  }
};

export const AuthContextProvider = ({ children }) => {};
