/*this component renderes the blogs from a list of blogs and connected to Blog.js and BlogFilter Button.js*/

/*
todo : userskills, userroles, user name, user premium
pending added a plain loading text with css 

*/

/*appearance of the card
 */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

export const Blogs = () => {
  // Change the array value to proper values such 'all' to 'All'
  const skills = ["java", "AWS", "SQL", "python", "javascript"];
  const roles = ["front-end", "back-end", "web-development"];
  const user = "bhanu";
  const userPremium = true;

  const userskills = [];

  const getArticles = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/articles");
      if (data.message === "error") throw "error";
      return data.data;
    } catch (e) {
      console.log(e);
      return "error";
    }
  };

  let [skill, setSkill] = useState();
  let [role, setrole] = useState();
  const [filteredBlogs, setfilteredBlogs] = useState(); //used to render the current content
  const [allBlogs, setAllBlogs] = useState(); //used to get the original content
  let [skillState, skillStateSet] = useState(skills.map((x) => 0)); //both of these to toggle css
  let [roleState, roleStateSet] = useState(roles.map((x) => 0));

  const cssToggle = (event) => {
    const source = event.target.getAttribute("source");
    const index = event.target.getAttribute("index");
    if (source == "skills" && index) {
      skillState = skillState.map((x, y) => {
        if (y == index) return 1;
        else return 0;
      });
      skillStateSet(skillState);
    } else if (source == "skills" && !index) {
      skillState = skillState.map((x) => 0);
      skillStateSet(skillState);
    }
    if (source == "roles" && index) {
      roleState = roleState.map((x, y) => {
        if (y == index) return 1;
        else return 0;
      });
      roleStateSet(roleState);
    } else if (source == "roles" && !index) {
      roleState = roleState.map((x) => 0);
      roleStateSet(roleState);
    }
  };

  const filterBlogs = (filterName = "all", roleName = "all") => {
    if (filterName === "all" && roleName === "all") {
      setfilteredBlogs(allBlogs);
    } else {
      setfilteredBlogs(spliced(allBlogs, filterName, roleName));
    }
  };

  const spliced = (allBlogs, filterName, roleName) => {
    const filteredBlogs = allBlogs.filter((x) => {
      if (filterName === "all" && roleName !== "all") {
        return x.tags.includes(roleName);
      } else if (filterName !== "all" && roleName === "all") {
        return x.tags.includes(filterName);
      } else {
        return x.tags.includes(filterName) && x.tags.includes(roleName);
      }
    });

    return filteredBlogs;
  };

  useEffect(() => {
    async function fetchData() {
      const articles = await getArticles();

      if (articles == "error") {
        setfilteredBlogs("error");
      }
      setfilteredBlogs(articles);
      setAllBlogs(articles);
    }
    fetchData();
  }, []);
  useEffect(() => {
    filterBlogs(skill, role);
  }, [skill, role]);
  if (!filteredBlogs) {
    return <p>Loading........</p>;
  }

  if (filteredBlogs == "error") {
    return (
      <>
        <p>could'nt fetch the blogs</p>
      </>
    );
  }
  return (
    <div>
      <div className="px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <span className="block font-bold text-xl mb-2 capitalize">
          Hello {user}! Welcome to our blogs
        </span>
      </div>
      <div className=" my-2 px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <h3 className="block font-bold text-xl mb-2 ">
          Get Blogs By Your Skills
        </h3>
        <button
          className="bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg"
          key={" all"}
          source={"skills"}
          onClick={(event) => {
            cssToggle(event);
            setSkill("all");
          }}
        >
          All
        </button>

        {!userskills.length &&
          skills.map((skill, idx) => (
            <button
              className={`capitalize px-3 py-2 rounded-lg text-red-400 m-3 ${
                skillState[idx]
                  ? " bg-yellow-30   ring opacity-70 ring-red-400"
                  : " bg-yellow-300 "
              }`}
              key={idx}
              index={idx}
              source={"skills"}
              onClick={(event) => {
                cssToggle(event);
                setSkill(skill);
              }}
            >
              {skill}
            </button>
          ))}
        <button
          className="bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg "
          key={"clear all"}
          source={"skills"}
          onClick={(event) => {
            cssToggle(event);
            setSkill("all");
          }}
        >
          Clear All
        </button>
      </div>

      <div className="my-2 px-6 py-4  mx-auto rounded-lg bg-lime-200">
        <h3 className="block font-bold text-xl mb-2">Get Blogs By Role</h3>
        <button
          className="bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg"
          key={" all"}
          source={"roles"}
          onClick={(event) => {
            cssToggle(event);
            setrole("all");
          }}
        >
          All
        </button>
        {roles &&
          roles.map((role, idx) => (
            <button
              className={`capitalize px-3 py-2 text-red-400 m-3 ${
                roleState[idx]
                  ? " bg-yellow-30  rounded-lg ring opacity-70 ring-red-400"
                  : " bg-yellow-300  rounded-lg"
              }`}
              key={idx}
              index={idx}
              source={"roles"}
              onClick={(event) => {
                cssToggle(event);
                setrole(role);
              }}
            >
              {role}
            </button>
          ))}
        <button
          className="bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg"
          key={"clear all"}
          source={"roles"}
          onClick={(event) => {
            cssToggle(event);
            setrole("all");
          }}
        >
          Clear All
        </button>
      </div>

      <div className="capitalize grid grid-cols-3 gap-5">
        {filteredBlogs &&
          Boolean(filteredBlogs.length) &&
          Array.isArray(filteredBlogs) &&
          filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between  p-3  max-h-fit min-h-1/2 bg-cyan-300 basis-2/7 rounded-2xl   shadow-lg text-truncate flex-wrap"
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
                    <h3 className="capitalize px-5 py-2 max-w-3/4 overflow-hidden">
                      {blog.title}
                    </h3>
                  </Link>
                  <span className="self-center">👍{blog.upVotesCount}</span>
                  <span className="self-center">👎{blog.downVotesCount}</span>
                </div>
                {blog.isPremium ? <span>👑</span> : null}
              </div>
              <div className="flex flex-row">
                {blog?.tags &&
                  blog.tags.length &&
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
      </div>
    </div>
  );
};
