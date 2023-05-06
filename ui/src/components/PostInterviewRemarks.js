import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export const PostInterviewRemarks = () => {
    
    const [interviewInformation, setInterviewInformation] = useState([]);
    const [rating, setRating] = useState();
    const { state, updateState } = useContext(AuthContext);
    const interviewDetails = state.userDetails;
  
   useEffect(()=>{
      const getInterview = async ()=>{
        let interviewInfo = await getInterviewInfo(interviewDetails._id);
        setInterviewInformation(interviewInfo);
      };
      getInterview();
      },[])
  
    const getInterviewInfo = async(id) => {
      const { data } = await axios.get(`http://localhost:4000/interviews/${id}`,{headers:{Authorization: `${localStorage.getItem("accessToken")}`}})
      console.log(data);
      return data;
    }  
    
    const displayRating = (e) => {
        console.log(e.target.value);
        setRating(e.target.value);
    }

    const handleSubmit = (event) => {
        
    }

    return(
        <div className="bg-blue-700 rounded overflow-hidden shadow-lg text-center mb-2 w-1/2 mx-auto px-6 py-4">
        <h1 className="align-center font-semibold text-center text-white">Interview Remarks</h1>
        <p className="align-center font-semibold text-center text-white mt-4">You just interviewed</p>
        <p className="align-center font-semibold text-center text-white mt-4">Please provide your feedback below</p>
        <form className="w-full flex justify-center interview-remarks-form mb-2 text-center">
        <div className="w-full space-y-4 rounded-lg sm:max-w-md xl:p-0 mt-4 text-center">
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="role-related-knowledge">Role Related Knowledge</label>
        <div className="text-center rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value="0.5" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value="1" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value="1.5" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value="2" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value="2.5" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value="3" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value="3.5" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value="4" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value="4.5" onChange={(e) => displayRating(e.target.value, "role")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value="5" onChange={(e) => displayRating(e.target.value, "role")}/>
        </div>
        </div>
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="general-cognitive-ability">General Cognitive Ability</label>
        <div className="text-center rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value1="0.5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value1="1" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value1="1.5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value1="2" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value1="2.5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value1="3" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value1="3.5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value1="4" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value1="4.5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value1="5" onChange={(e) => displayRating(e.target.value, "cognitive")}/>
        </div>
        </div>
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="general-cognitive-ability">Communication</label>
        <div className="text-center rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value2="0.5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value2="1" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value2="1.5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value2="2" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value2="2.5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value2="3" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value2="3.5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value2="4" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value2="4.5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value2="5" onChange={(e) => displayRating(e.target.value, "communication")}/>
        </div>
        </div>
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="general-cognitive-ability">Attitude and Motivation</label>
        <div className="text-center rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value3="0.5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value3="1" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value3="1.5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value3="2" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value3="2.5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value3="3" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value3="3.5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value3="4" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value3="4.5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value3="5" onChange={(e) => displayRating(e.target.value, "attitude")}/>
        </div>
        </div>
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="general-cognitive-ability">Team Player</label>
        <div className="text-center rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value4="0.5" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value4="1" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value4="1.5" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value4="2" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value4="2.5" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value4="3" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value4="3.5" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value4="4" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" value4="4.5" onChange={(e) => displayRating(e.target.value, "team")}/>
        <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" value4="5" onChange={(e) => displayRating(e.target.value, "team")}/>
        </div>
        </div>
        <div className="rounded-lg max-w-md flex justify-between">
        <label className="text-white font-semibold text-center mt-4 mb-2" for="general-cognitive-ability">Additional Comments</label>
        <textarea className="textarea textarea-bordered" placeholder="Comments"></textarea>
        </div>
        </div>
        </form>
        <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
        </div>
    )
}