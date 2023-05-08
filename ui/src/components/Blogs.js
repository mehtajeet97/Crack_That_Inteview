import { Link, useNavigate, redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext.js";

import axios from "axios";

export const Blogs = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);

  // Change the array value to proper values such 'all' to 'All'
  const skills = state.userDetails.skills;

  const user = state.userDetails.firstName;
  const userPremium = state.userDetails.isPremiumUser;

  const [filteredBlogs, setfilteredBlogs] = useState([]); //used to render the current content
  const [allBlogs, setAllBlogs] = useState([]); //used to get the original content
  let [skillState, skillStateSet] = useState(0); //both of these to toggle css

  const filterSelected = (selectedSkill = "all") => {
    const filterBlogs =
      selectedSkill === "all"
        ? allBlogs
        : allBlogs.filter((x) => {
            return x.tags.includes(selectedSkill.toLowerCase());
          });

    setfilteredBlogs(filterBlogs);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get("http://localhost:4000/articles", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setfilteredBlogs(data.data);
        setAllBlogs(data.data);
      } catch (e) {
        if (e.response.status === 401) {
          state.triggerToast(
            "Your session has been expired. Please log in.",
            "error"
          );
          localStorage.clear();
          navigate("/login");
        } else {
          setfilteredBlogs([]);
          setAllBlogs([]);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-6 py-4  mx-auto rounded-lg bg-lime-200 text-black">
        <span className="block font-bold text-xl mb-2 capitalize">
          Hello {user}! Welcome to our blogs
        </span>
      </div>
      <div className=" my-6 px-6 py-4  mx-auto rounded-lg bg-lime-200 text-black">
        <h3 className="block font-bold text-xl mb-2 mb-6 ">
          Get Blogs By Your Skills
        </h3>
        <button
          className="bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg"
          key={" all"}
          source={"skills"}
          onClick={() => {
            skillStateSet("all");
            filterSelected();
          }}
        >
          All
        </button>

        {skills.map((skill, idx) => (
          <button
            className={`capitalize px-3 py-2 rounded-lg text-red-400 m-3 ${
              skillState == skill
                ? " bg-yellow-30   ring opacity-70 ring-red-400"
                : " bg-yellow-300 "
            }`}
            key={idx}
            index={idx}
            source={"skills"}
            onClick={() => {
              skillStateSet(skill);
              filterSelected(skill);
              // cssToggle(event);
            }}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="capitalize grid grid-cols-3 gap-5">
        {filteredBlogs &&
          filteredBlogs.length !== 0 &&
          Array.isArray(filteredBlogs) &&
          filteredBlogs.slice(0, 9).map((blog, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between  p-3   font-bold max-h-fit min-h-1/2 bg-blue-700 basis-2/7 rounded-2xl   shadow-lg text-truncate flex-wrap"
            >
              <div className="flex flex-row justify-between text-white">
                <div className="flex ">
                  <div className="max-w-sm">
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
                      <h3 className="capitalize px-5 py-2 max-w-sm overflow-hidden">
                        {blog.title}
                      </h3>
                    </Link>
                  </div>
                  <span className="self-center">👍{blog.upVotesCount}</span>
                  <span className="self-center">👎{blog.downVotesCount}</span>
                </div>
                {blog.isPremium ? <span>👑</span> : null}
              </div>
              <div className="flex flex-row text-black">
                {blog?.tags &&
                  blog.tags.length !== 0 &&
                  blog.tags.slice(0, 3).map((tag, idx) => (
                    <button
                      className=" capitalize p-2 m-3 bg-gray-200 rounded-full px-3 py-1"
                      key={idx}
                    >
                      {`#${tag}`}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        {filteredBlogs.length === 0 && (
          <div className="bg-blue-700 h-12 items-center p-3  text-white basis-2/7 rounded   shadow-lg text-truncate col-span-3 justify-self-center text-black font-bold capitalize">
            <p>error whileloading Blogs ...!!!</p>
          </div>
        )}
      </div>
    </div>
  );
};
