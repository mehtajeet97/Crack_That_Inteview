import axios from 'axios';
import { useState, useEffect } from "react";

//To do: Write Functionality for Ban User
export const Admin = () => {
    const [usersData, setUsersData] = useState([]);
    const [interviewsData, setInterviewsData] = useState([]);
    const [userTableHeaders, setUserTableHeaders] = useState([])
    const [interviewTableHeaders, setInterviewTableHeaders] = useState([])

    useEffect(()=>{
        const getUser = async ()=>{
          let userData = await getUserCall();
          setUsersData(userData);
          if (usersData.length) {
              setUserTableHeaders(Object.keys(usersData[0]))
          }
        };
        getUser();
        const getInterview = async ()=>{
            let interviewData = await getInterviewCall();
            setInterviewsData(interviewData);
            if (interviewData.length) {
                setInterviewTableHeaders(Object.keys(interviewData[0]))
            }
          };
        getInterview();
    }, [])

    const getUserCall = async() => {
        const { data }  = await axios.get('http://localhost:4000/users', { headers: {'Authorization': localStorage.getItem('accessToken')}})
        console.log(data.data);
        return data.data;
    }

    const getInterviewCall = async() => {
        const {data} = await axios.get('http://localhost:4000/interviews', { headers: {'Authorization': localStorage.getItem('accessToken')}})
        console.log(data);
        return data;
    }

    //To do: Write Functionality for Ban User
    const handleBanUser = (user) =>{
      console.log(user)
    }

    return(
        <div className="bg-blue-700 rounded overflow-hidden shadow-lg text-xl mb-2 w-3/5 mx-auto px-6 py-4">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Users</div>
              <div className="stat-value">{usersData.length}</div>
              <div className="stat-desc">Total number of users signed up</div>
            </div>
          <div className="stat place-items-center">
            <div className="stat-title">Interviews</div>
            <div className="stat-value">{interviewsData.length}</div>
            <div className="stat-desc">Total number of interviews</div>
          </div>
        </div>   
        <div className="overflow-x-auto text-white font-semibold mb-2">Users</div>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Ban</th>
              </tr>
            </thead>
             <tbody>
            {usersData.length && usersData.map(user => {
            return (<tr key={user._id}><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.email}</td><td>{user.role}</td><td><button disabled={user.role.toLowerCase() === 'admin'} onClick={() => handleBanUser(user)} className="btn btn-ghost btn-xs">Ban User</button></td></tr>)
            })}
            </tbody>
            </table>
            <div className="overflow-x-auto text-white font-semibold mb-2">Interviews</div>
            <table className="table table-zebra w-full">
            <thead>
            <tr>
            <th>Interviewee</th>
            <th>Interviewer</th>
            <th>Interview Link</th>
            <th>Interview Date</th>
            </tr>
            </thead>
        <tbody>
        {interviewsData.length && interviewsData.map(interview => {
            return (<tr key={interview._id}><td>{interview.interviewee}</td><td>{interview.interviewer}</td><td>{interview.interviewLink}</td><td>{interview.interviewDate}</td></tr>)
            })}
        </tbody>
        </table>
        </div>
    );
};