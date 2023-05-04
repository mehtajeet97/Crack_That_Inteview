/**user premium  */

import { useEffect, useState } from "react";
import { PremiumPage1 } from "./PremiumPage1";
import { Navigate } from "react-router-dom";

export const Premium = () => {
  const userIsPremium = false;
  let [mark, setMark] = useState(true);
  const toggleChange = () => {
    if (mark) setMark(false);
    else setMark(true);
  };
  useEffect(() => {}, [mark]);
  if (userIsPremium) {
    return <Navigate to="/feed" />;
  }
  return (
    <div>
      <PremiumPage1 change={toggleChange} mark={mark} />
    </div>
  );
};
