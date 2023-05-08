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

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await axios.get(`http://localhost:4000/trending`, headers);
        if (data.data.message === "error") throw "error";

        setBlogs(data.data.data.article);
        setUsers(data.data.data.topUsers);
      } catch (e) {
        if (e.response.status === 401) {
          state.triggerToast(
            "Your session has been expired. Please log in.",
            "error"
          );
          localStorage.clear();
          navigate("/login");
        } else {
          setBlogs([]);
          setUsers([]);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <span className="block font-bold text-xl mb-2 text-black">
          Hello {userName}! Welcome to Trending Page
        </span>
      </div>
      <div className="bg-cyan-100 rounded overflow-hidden shadow-lg w-full capitalize">
        <div className="flex flex-col px-6 py-3  m-5 rounded-lg bg-lime-200">
          <div className=" flex items-center justify-between font-bold my-3">
            <span className="text-xl text-black">Top blogs of this weeks </span>
            {blogs && blogs.length !== 0 && (
              <Link
                className="font-bold bg-yellow-300 px-3 py-2  m-3 rounded-lg text-black "
                to="/blogs"
              >
                View All Blogs
              </Link>
            )}
          </div>
          <div className="grid grid-cols-3 gap-5 justify-center">
            {blogs &&
              blogs.length !== 0 &&
              blogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="flex flex-col py-2 px-5 max-h-min space-y bg-blue-700 text-white basis-2/7 rounded-xl   shadow-lg text-truncate flex-wrap"
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
                          className="p-2 m-3 h-10 bg-gray-200 text-black rounded-full px-3 py-1 overflow-hidden "
                          key={idx}
                        >
                          {`#${tag}`}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            {blogs?.length === 0 && (
              <div className="bg-blue-700 h-12 items-center p-3  text-white basis-2/7 rounded   shadow-lg text-truncate col-span-3 justify-self-center text-black font-bold capitalize">
                <p>Error while loading the blogs</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4  m-10 rounded-lg bg-lime-200">
          <div className="font-bold my-2 text-black">
            <span> Top performers of the week</span>
          </div>
          <div className="grid grid-cols-3 gap-5 content-center">
            {users &&
              users.length !== 0 &&
              users.map((user, idx) => (
                <div
                  key={idx}
                  className="flex flex-col  max-h-fit  bg-blue-700 text-white basis-2/7 rounded   shadow-lg text-truncate flex-wrap"
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
                          className="p-2 m-3 bg-gray-200 text-black rounded-full px-3 py-1"
                          key={idx}
                        >
                          {`#${tag}`}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            {users?.length === 0 && (
              <div className="bg-blue-700 h-12 items-center p-3  text-white basis-2/7 rounded   shadow-lg text-truncate col-span-3 justify-self-center text-black font-bold capitalize">
                <p>error whileloading users ...!!!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
