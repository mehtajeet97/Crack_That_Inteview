/**
 * user id
 * user premium request
 */
import axios from "axios";
import { useEffect, useState } from "react";
export const PremiumPage2 = (props) => {
  const userId = "644de76d6db84ae1de17336a";
  const userRequest = "";
  const [error, setError] = useState([]);
  const [flag, setFlag] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = event.target[0].value;
    if (!payload) error.push("cannot be empty");
    if (error.length > 0) {
      setError(error);
    } else {
      const res = await axios.patch(
        `http://localhost:4000/users/${userId}`,
        { data: payload, status: "pending" },
        { headers: { reqType: "premium-request" } }
      );

      setFlag(res.data);
    }
  };
  useEffect(() => {
    console.log(flag);
  }, [flag]);
  if (userRequest == "pending") {
    return <p>Request already submitted</p>;
  }
  return (
    <>
      {!flag && (
        <form
          className="h-full w-full p-10 flex flex-col  items-center "
          onSubmit={handleSubmit}
        >
          <p className="my-5 ml-15  self-center font-bold ">
            Your reason to be a part of out premium program
          </p>
          <div className="h-full w-10/12">
            <textarea
              id="reason"
              rows="8"
              placeholder="Your reason for Joining the Premium :"
              className="grow  resize-none  w-full m-5 p-3 rounded-lg focus:outline-none bg-blue-400 text-white placeholder-white"
            ></textarea>
          </div>
          <div className="w-full flex flex-row justify-center">
            <button
              type="submit"
              className="bg-yellow-300 px-3 py-2 w-1/5  text-red-400 m-3 rounded-lg font-bold"
            >
              Submit
            </button>
            <button
              onClick={() => props.change()}
              className="bg-yellow-300 px-3 py-2 w-1/5  text-red-400 m-3 rounded-lg font-bold"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      {flag && flag?.message && flag.message == "ok" && (
        <div className="flex items-center font-bold m-10 bg-green-300 ">
          <p className="self-center">Request Submitted</p>
        </div>
      )}
    </>
  );
};
