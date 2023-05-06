/*
pending with error css
Loading css
user premium

*/
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import picture from "../profilePicture.jpg";
import { AuthContext } from "../context/AuthContext.js";

export const Trending = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);
  const userPremium = state.userDetails.isPremiumUser;
  const userName = state.userDetails.firstName;
  let [blogs, setBlogs] = useState([]);
  let [users, setUsers] = useState([]);
  const headers = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  // const logoutUser = () => {
  //   try {
  //     console.log("1..................");
  //     updateState({ ...state, isLoggedIn: false, userDetails: {} });
  //     console.log("2..................");
  //     localStorage.clear();
  //     navigate("/login");
  //     console.log("3..................");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("hello");
        let data = await axios.get(`http://localhost:4000/trending`, headers);
        if (data.data.message === "error") throw "error";
        console.log(data.data.data.article);
        setBlogs(data.data.data.article);
        setUsers(data.data.data.topUsers);
      } catch (e) {
        setBlogs("error");
        setUsers("error");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <span className="block font-bold text-xl mb-2">
          Hello {userName}! Welcome to Trending Page
        </span>
      </div>
      <div className="bg-cyan-100 rounded overflow-hidden shadow-lg w-full capitalize">
        <div className="flex flex-col px-6 py-3  m-5 rounded-lg bg-lime-200">
          <div className=" flex items-center justify-between font-bold my-3">
            <span className="text-xl">Top blogs of this weeks </span>
            <Link
              className="font-bold bg-yellow-300 px-3 py-2  m-3 rounded-lg "
              to="/blogs"
            >
              View All Blogs
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5 ">
            {blogs &&
              Boolean(blogs.length) &&
              blogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="flex flex-col py-2 px-5 max-h-min space-y bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap"
                >
                  <div className="flex flex-row justify-between items-center overflow-hidden">
                    <div className="flex">
                      <Link
                        to={
                          blog.isPremium
                            ? userPremium
                              ? `/blogs/${blog._id}`
                              : `/join-premium`
                            : userPremium
                            ? `/blogs/${blog._id}`
                            : `/blogs/${blog._id}`
                        }
                        state={{ data: blog }}
                      >
                        <h3 className="capitalize w-8/9 h-1/3 px-5 py-2 font-bold overflow-scrollable">
                          {blog.title}
                        </h3>
                      </Link>
                      <span className="self-center">👍{blog.upVotesCount}</span>
                      <span className="self-center">
                        👎{blog.downVotesCount}
                      </span>
                    </div>
                    {blog.isPremium ? (
                      <span className="self-baselne pb-5">👑</span>
                    ) : null}
                  </div>
                  <div className="flex flex-row mt-auto">
                    {blog?.tags &&
                      Boolean(blog.tags.length) &&
                      blog.tags.slice(0, 3).map((tag, idx) => (
                        <button
                          className="p-2 m-3 h-10 bg-gray-200 rounded-full px-3 py-1 overflow-hidden "
                          key={idx}
                        >
                          {`#${tag}`}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            {blogs.length === 0 && (
              <>
                <p>there are no blogs to display</p>
              </>
            )}
          </div>
        </div>
        <div className="px-6 py-4  m-10 rounded-lg bg-lime-200">
          <div className="font-bold my-2">
            <span> Top performers of the week</span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {users &&
              users.length &&
              users.map((user, idx) => (
                <div
                  key={idx}
                  className="flex flex-col  max-h-fit  bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap"
                >
                  <div className="flex items-center justify-between my-2 px-5 py-2">
                    <Link to={`/users/${user._id}`} className="font-bold ">
                      <img
                        src={picture}
                        className="max-h-8 max-w-8  m-2 rounded-full inline"
                      />

                      <span>{user.firstName + user.lastName}</span>
                    </Link>

                    <p id="userscore" className=" font-semibold">
                      {user.userScore}
                    </p>
                  </div>
                  <div className="flex flex-row mt-auto">
                    {user?.tags &&
                      user.tags.length &&
                      user.tags.slice(0, 3).map((tag, idx) => (
                        <button
                          className="p-2 m-3 bg-gray-200 rounded-full px-3 py-1"
                          key={idx}
                        >
                          {`#${tag}`}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
