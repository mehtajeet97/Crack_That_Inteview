import img from "../virtualInterview.jpg";
import logo from "../logo.svg";
import support from "../support.webp";
import test from "../test.jpg";
import blog from "../blog.png";
import { PremiumPage2 } from "./PremiumPage2";
export const PremiumPage1 = (props) => (
  <>
    <div
      className="  rounded-lg bg-cover h-full "
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="flex flex-col backdrop-blur h-full bg-white/30 items-center">
        <div className="flex flex-col items-center">
          <img src={logo} className="max-h-40 max-w-40" />
          <h1 className="font-bold text-5xl">Join Our Premium</h1>
        </div>
        <div className="flex justify-evenly m-10">
          <div className="flex flex-col items-start p-5 max-h-fit space-y bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap">
            <img
              src={support}
              className="max-h-20 max-w-20 m-5 rounded-lg self-center flex-wrap"
            />
            <span>
              <h1 className="font-bold"> Interviews With Top Interviewers</h1>
              <p>
                Have interviews with our top interviews where you can get great
                guidance and get trained for top company interviews
              </p>
            </span>
          </div>
          <div className="flex flex-col items-start p-5  max-h-fit space-y bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap">
            <img
              src={test}
              className="bg-white max-h-20 max-w-20 m-5 rounded-lg self-center "
            />
            <h1 className="font-bold">
              {" "}
              Get Top Questions For The Preperation
            </h1>
            <span>
              <p>
                {" "}
                Get access to the top unanswered questions and their detailed
                solution
              </p>
            </span>
          </div>
          <div className="flex flex-col items-start p-5 max-h-fit space-y bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap">
            <img
              src={blog}
              className="bg-white max-h-20 max-w-20 m-5 rounded-lg self-center "
            />
            <h1 className="font-bold">
              {" "}
              Get News letters, Notification and Access to premium blogs
            </h1>
            <span>
              <p>
                With the premium access you can get weekly newsletter of the top
                blogs, access to the premium blogs and notification as soon as
                the blogs created
              </p>
            </span>
          </div>
        </div>
        <button
          className={
            props.mark
              ? "self-center bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg font-bold"
              : "invisible"
          }
          onClick={() => props.change()}
        >
          Get Started
        </button>
        {Boolean(!props.mark) && <PremiumPage2 change={props.change} />}
      </div>
    </div>
  </>
);
