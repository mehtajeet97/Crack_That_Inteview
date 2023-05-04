/*
pending with error css
Loading css
user premium

*/
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import picture from "../profilePicture.jpg";

export const Trending = () => {
  const userPremium = false;
  let [blogs, setBlogs] = useState([]);
  let [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await axios.get(`http://localhost:4000/trending`);

        if (data.data.message === "error") throw "error";
        setBlogs(data.data.data.article);
        setUsers(data.data.data.topUsers);
      } catch (e) {
        setBlogs("error");
        setUsers("error");
      }
    }
    fetchData();
  }, []);

  if (!users || !blogs) {
    return <p>Loading........</p>;
  }
  if (users == "error" || blogs == "error") {
    return <p>Error while loading this page</p>;
  }

  return (
    <div>
      <div className="px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <span className="block font-bold text-xl mb-2">
          Hello {"bhanu"}! Welcome to Trending Page
        </span>
      </div>
      <div className="bg-cyan-100 rounded overflow-hidden shadow-lg w-full capitalize">
        <div className="flex flex-col px-6 py-3  m-10 rounded-lg bg-lime-200">
          <div className=" flex items-center justify-between font-bold my-3">
            <span className="text-xl">Top blogs of this weeks </span>
            <Link
              className="font-bold bg-yellow-300 px-3 py-2  m-3 rounded-lg "
              to="/blogs"
            >
              View All Blogs
            </Link>
          </div>
          <div className="flex flex-wrap justify-between">
            {blogs &&
              Boolean(blogs.length) &&
              blogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="flex flex-col py-2 px-5 max-h-fit space-y bg-cyan-300 basis-2/7 rounded   shadow-lg text-truncate flex-wrap"
                >
                  <div className="flex flex-row justify-between">
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
                        <h3 className="capitalize px-5 py-2 font-bold">
                          {blog.title}
                        </h3>
                      </Link>
                      <span className="self-center">👍{blog.upVotesCount}</span>
                      <span className="self-center">
                        👎{blog.downVotesCount}
                      </span>
                    </div>
                    {blog.isPremium ? (
                      <span className="self-center">👑</span>
                    ) : null}
                  </div>
                  <div className="flex flex-row mt-auto">
                    {blog?.tags &&
                      Boolean(blog.tags.length) &&
                      blog.tags.slice(0, 3).map((tag, idx) => (
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
            {Boolean(!blogs.length) && (
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
          <div className="flex justify-between flex-wrap">
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
