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

export const AuthContext = createContext({
  userDetails: {},
  isLoggedIn: false,
  triggerToast: (message, type) => showToastMessage(message, type),
});
