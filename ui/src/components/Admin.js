/**todo error
 * error validation in blogs update and create
 * bad requests
 * server side error
 * error check in backend reconfigure
 */

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

import Select from "react-select";

//To do: Write Functionality for Ban User
export const Admin = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [interviewsData, setInterviewsData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlog, setFilteredBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const skills = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "c++", label: "C++" },
    { value: "swift", label: "Swift" },
    { value: "nodejs", label: "NodeJS" },
    { value: "express", label: "Express" },
    { value: "react", label: "React" },
    { value: "mongo", label: "MongoDB" },
    { value: "bash", label: "Bash" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "hadoop", label: "Hadoop" },
    { value: "pyspark", label: "PySpark" },
    { value: "r", label: "R" },
    { value: "machine_learning", label: "Machine Learning" },
    { value: "docker", label: "Docker", type: "skills" },
  ];
  useEffect(() => {
    const getUser = async () => {
      let userData = await getUserCall();
      if (userData?.length) {
        setUsersData(userData);
        setFilteredUserData(userData);
      }
    };
    getUser();
    const getInterview = async () => {
      let interviewData = await getInterviewCall();
      if (interviewData?.length) {
        setInterviewsData(interviewData);
      }
    };
    getInterview();
    const getBlog = async () => {
      let blogs = await getBlogs();
      if (blogs?.length) {
        setBlogs(blogs);
        setFilteredBlogs(blogs);
      }
    };
    getBlog();
  }, []);
  const getBlogs = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/articles", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      return data.data;
    } catch (e) {
      let status = e.response.status;
      if (status === 401) {
        localStorage.clear();
        state.triggerToast("invalid user credentials login again", "error");
        navigate("/login");
      } else if (status === 500) {
        state.triggerToast("Internal Server Error", "error");
      } else {
        state.triggerToast("Error Fetching Blogs", "error");
      }
    }
  };
  const getUserCall = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/users", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      return data.data;
    } catch (e) {
      let status = e.response.status;
      if (status === 401) {
        localStorage.clear();
        state.triggerToast("invalid user credentials login again", "error");
        navigate("/login");
      } else if (status === 500) {
        state.triggerToast("Internal server error", "error");
      } else {
        state.triggerToast("error getting users", "error");
      }
    }
  };

  const getInterviewCall = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/interviews", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      return data;
    } catch (e) {
      let status = e.response.status;
      if (status === 401) {
        localStorage.clear();
        state.triggerToast("invalid user credentials login again", "error");
        navigate("/login");
      } else if (status === 500) {
        state.triggerToast("Internal server error", "error");
      } else {
        state.triggerToast("Error Fetching Data", "error");
      }
    }
  };

  const banUser = async (payload) => {
    try {
      const userURL = `http://localhost:4000/users/${payload.userId}`;
      let { data, status } = await axios.patch(userURL, payload, {
        headers: {
          update: "banUser",
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      if (status === 200) {
        setUsersData(
          usersData.map((user) => {
            if (user._id === payload.userId) {
              return data.data;
            } else {
              return user;
            }
          })
        );
      }
    } catch (e) {
      let status = e.response.status;
      if (status === 401) {
        localStorage.clear();
        state.triggerToast("invalid user credentials login again", "error");
        navigate("/login");
      } else if (status === 500) {
        state.triggerToast("Internal server error", "error");
      } else {
        state.triggerToast("Error Updating User", "error");
      }
    }
  };
  const updatePremium = async (payload) => {
    try {
      const userURL = `http://localhost:4000/users/${payload.userId}`;
      let { data, status } = await axios.patch(userURL, payload, {
        headers: {
          update: "premium",
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      if (status === 200) {
        setUsersData(
          usersData.map((user) => {
            if (user._id === payload.userId) {
              return data.data;
            } else {
              return user;
            }
          })
        );
      }
    } catch (e) {
      let status = e.response.status;
      if (status === 401) {
        localStorage.clear();
        state.triggerToast("invalid user credentials login again", "error");
        navigate("/login");
      } else if (status === 500) {
        state.triggerToast("Internal server error", "error");
      } else if (status === 404) {
        state.triggerToast("user not found", "error");
      } else {
        state.triggerToast("Error Fetching Data", "error");
      }
    }
  };

  //To do: Write Functionality for Ban User
  const handleBanUser = async (user) => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let payload = {
      _id: userDetails._id,
      role: userDetails.role,
      isBanned: !user.isBanned,
      userId: user._id,
    };

    await banUser(payload);
  };

  const handleUserRequest = async (user, event) => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let payload = {
      _id: userDetails._id,
      role: userDetails.role,
      userId: user._id,
      requestPremium:
        event.target.textContent.toLowerCase() === "approve"
          ? { ...user.requestPremium, status: "Approved" }
          : { ...user.requestPremium, status: "Rejected" },
      isPremiumUser:
        event.target.textContent.toLowerCase() === "approve" ? true : false,
    };

    await updatePremium(payload);
  };
  const searchUser = () => {
    let filter = document.getElementsByName("filter")[0].value;
    let input = document.getElementById("search").value;

    if (input.length > 0) {
      const users = filteredUserData.filter((x) => {
        return x[filter].toLowerCase().includes(input.toLowerCase());
      });
      setUsersData(users);
    } else {
      setUsersData(filteredUserData);
    }
  };
  const searchblog = () => {
    let input = document.getElementById("searchBlog").value;

    if (input.length > 0) {
      const blogs = filteredBlog.filter((x) =>
        x["title"].toLowerCase().includes(input.toLowerCase())
      );
      setBlogs(blogs);
    } else {
      setBlogs(filteredBlog);
    }
  };
  const updateBlog = (event, blog) => {
    event.preventDefault();

    if (event.target[0].value === blog.content) {
      state.triggerToast("no changes are made to the blog", "warning");
    } else {
      blog = { ...blog, content: event.target[0].value };
      patchBlog(blog);
    }
  };
  const postBlogs = async (blog) => {
    try {
      blog.role = JSON.parse(localStorage.getItem("userDetails")).role;

      const userURL = `http://localhost:4000/articles/`;
      let { data, status } = await axios.post(userURL, blog, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      blogs.push(data.data);
      setBlogs(blogs);
      setFilteredBlogs(blogs);

      setTags([]);
      state.triggerToast("blog added successfully", "success");
    } catch (e) {
      if (e.response.status == 401) {
        state.triggerToast(
          "You are not allowed to create blogs Please log in.",
          "error"
        );
        localStorage.clear();
        navigate("/login");
      } else if (e.response.status == 500) {
        state.triggerToast("internal server error", "error");
      } else {
        state.triggerToast("couldnt add blog", "error");
      }
    }
  };
  const createBlog = async (event) => {
    try {
      let errors = [];
      event.preventDefault();

      let title = document.getElementById("blogTitle").value;
      let content = document.getElementById("blogcontent").value;
      let isPremium = document.getElementById("isPremium").checked;

      if (!(title.length >= 0)) {
        errors.push("blog title cannot be empty");
      }
      if (!(content.length >= 0)) {
        errors.push("blog content cannot be empty");
      }

      let tagsSelected = tags.map((x) => {
        return x.value;
      });
      if (!(tagsSelected.length >= 0)) {
        errors.push("blog tags cannot be empty");
      }
      if (errors.length > 0) {
        throw errors;
      }
      let newBlog = {
        title,
        content,
        tags: tagsSelected,
        isPremium,
      };

      postBlogs(newBlog);
      document.getElementById("blogTitle").value = "";
      document.getElementById("blogcontent").value = "";
      document.getElementById("isPremium").checked = false;
      setTags([]);
      document.getElementById("createBlog").checked = false;
    } catch (e) {
      e.map((x) => {
        state.triggerToast(x, "error");
      });
    }
  };
  const selectedTags = (data) => {
    setTags(data);
  };
  const deleteBlog = async (blog) => {
    try {
      const userURL = `http://localhost:4000/articles/${blog._id}`;
      let data = await axios.delete(userURL, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });

      setBlogs(
        blogs.filter((x) => {
          if (x._id !== data.data.data.id) {
            return x;
          }
        })
      );
    } catch (e) {
      if (e.response.status == 401) {
        state.triggerToast(
          "You are not allowed to delete blogs Please log in.",
          "error"
        );
        localStorage.clear();
        navigate("/login");
      } else if (e.response.status == 500) {
        state.triggerToast("internal server error", "error");
      } else {
        state.triggerToast("couldnt delete the blogs", "error");
      }
    }
  };
  const patchBlog = async (blog) => {
    //done
    try {
      const userURL = `http://localhost:4000/articles/${blog._id}`;

      let data = await axios.patch(userURL, blog, {
        headers: {
          update: "blog",
          Authorization: localStorage.getItem("accessToken"),
          role: state.userDetails.role,
        },
      });
      data = data.data;
      setBlogs(
        blogs.map((x) => {
          if (x._id === data.data._id) {
            x = { ...x, data };
            return x;
          } else {
            return x;
          }
        })
      );
      setFilteredBlogs(
        blogs.map((x) => {
          if (x._id === data.data._id) {
            x = { ...x, data };
            return x;
          } else {
            return x;
          }
        })
      );

      state.triggerToast(`blog edited successfully`, "success");
    } catch (e) {
      if (e.response.status == 401) {
        state.triggerToast(
          "You are not allowed to edit blogs Please log in.",
          "error"
        );
        localStorage.clear();
        navigate("/login");
      } else if (e.response.status == 500) {
        state.triggerToast("internal server error", "error");
      } else {
        state.triggerToast("couldnt edit the blogs", "error");
      }
    }
  };
  const userPage = (
    <>
      <div className=" flex flex-row w-full items-center space-around justify-between overflow-x-auto text-white font-semibold text-4xl m-4 overflow-hidden">
        <span className="p-3">Users</span>
        <div className="flex flex-row relative">
          <select
            name="filter"
            onChange={searchUser}
            className="text-lg rounded-lg bg-transparent h-fit self-center  active:bg-white   focus:bg-white focus:text-black capitalize  "
          >
            <option value="firstName">first name</option>
            <option value="lastName">last name</option>
            <option value="email">email address</option>
          </select>
          <input
            id="search"
            placeholder="🔎search user"
            className="rounded-2xl m-2 py-2 px-3 placeholder:p-4 text-xl  w-full relative capitalize "
            onChange={searchUser}
          />
          <button
            className=" absolute  right-0 text-base m-3 px-1 py-1"
            onClick={() => {
              document.getElementById("search").value = "";
              searchUser();
            }}
          >
            ❌
          </button>
        </div>
      </div>
      {usersData.length > 0 && (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Ban</th>
                <th>Premium Request</th>
              </tr>
            </thead>
            <tbody>
              {usersData.slice(0, 6).map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        disabled={user.role.toLowerCase() === "admin"}
                        onClick={() => handleBanUser(user)}
                        className="btn btn-ghost btn-xs"
                      >
                        {user.isBanned ? "Revoke Ban" : "Ban User"}
                      </button>
                    </td>
                    {user.isBanned || user.isPremiumUser ? (
                      user.isBanned ? (
                        <td>Banned</td>
                      ) : (
                        <td>Premium User</td>
                      )
                    ) : (
                      <td>
                        <label
                          disabled={
                            user.requestPremium?.status.toLowerCase() ===
                              "new" ||
                            user.requestPremium?.status.toLowerCase() ===
                              "rejected" ||
                            user.role === "admin"
                          }
                          htmlFor="my-modal-6"
                          className="btn btn-ghost btn-xs col-span-2"
                        >
                          View Request
                        </label>

                        <input
                          type="checkbox"
                          id="my-modal-6"
                          className="modal-toggle"
                        />
                        <div className="modal modal-bottom sm:modal-middle">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              {` Application ${user.firstName} for Premium Status`}
                            </h3>
                            <p className="py-4">
                              {user.requestPremium.message}
                            </p>
                            <div className="modal-action">
                              <label
                                htmlFor="my-modal-6"
                                className="btn"
                                onClick={(event) =>
                                  handleUserRequest(user, event)
                                }
                              >
                                Approve
                              </label>
                              <label
                                htmlFor="my-modal-6"
                                className="btn"
                                onClick={(event) =>
                                  handleUserRequest(user, event)
                                }
                              >
                                Reject
                              </label>
                              <label htmlFor="my-modal-6" className="btn">
                                Cancel
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {usersData.length == 0 && <span>no users found</span>}
    </>
  );
  const interviewPage = (
    <>
      {interviewsData.length > 0 && (
        <>
          <div className="overflow-x-auto text-white font-semibold text-4xl m-4 overflow-hidden">
            Interviews
          </div>
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
              )||
              {interviewsData.map((interview) => {
                return (
                  <tr key={interview._id}>
                    <td>{interview.interviewee}</td>
                    <td>{interview.interviewer}</td>
                    <td>{interview.interviewerLink}</td>
                    <td>{interview.interviewDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
  const blogsPage = (
    <>
      <div className=" flex flex-row w-full items-center space-around justify-between overflow-x-auto text-white font-semibold text-4xl m-4 overflow-hidden">
        <span className="p-3">Blogs</span>
        <div className="flex flex-row items-stretch ">
          <span className="flex flex-row relative">
            <input
              id="searchBlog"
              placeholder="🔎 search Blogs by title"
              className="rounded-2xl m-2 py-2 px-3 placeholder:p-4 text-xl  w-full relative "
              onChange={searchblog}
            />
            <button
              className="absolute right-0  text-base m-3 my-5 px-1 py-1"
              onClick={() => {
                document.getElementById("searchBlog").value = "";
                searchblog();
              }}
            >
              ❌
            </button>
          </span>
          <label htmlFor="createBlog" className="btn modal-action">
            ➕
          </label>

          <input type="checkbox" id="createBlog" className="modal-toggle" />
          <div className="modal  modal-middle h-full overflow-scroll ">
            <form
              className="w-11/12 h-5/6"
              id="createBlogForm"
              onSubmit={(event) => {
                createBlog(event);
              }}
            >
              <div className=" bg-slate-800 w-full h-full flex flex-col gap-5 p-5 justify-between">
                <div className="w-full h-1/2 self-stretch ">
                  <label htmlFor="title" className="text-xl capitalize">
                    enter title
                    <input
                      name="title"
                      id="blogTitle"
                      placeholder="enter Blog title"
                      className="w-5/6 p-2 rounded-lg m-5 block"
                    />
                  </label>

                  <label
                    htmlFor="blogcontent "
                    className="capitalize text-xl scrollbar-hide"
                  >
                    Content
                    <textarea
                      id="blogcontent"
                      className="block m-5 w-11/12 h-5/6 overflow-scroll text-xl p-5 scroll"
                    ></textarea>
                  </label>
                  <div className=" flex flex-row justify-between h-fit items-center  overflow-visible">
                    <Select
                      id="skillOptions"
                      options={skills}
                      placeholder="select 3 tags for blog"
                      value={tags}
                      onChange={selectedTags}
                      isOptionDisabled={() => tags.length >= 3}
                      isMulti
                      className="w-1/8 h-fit text-lg text-black grow"
                      required
                    />
                    <span>
                      <input
                        type="checkbox"
                        id="isPremium"
                        value="true"
                        className="ml-5 m-1"
                      />
                      <label htmlFor="isPremium" className="text-lg m-5">
                        {" "}
                        Premium Blog
                      </label>
                    </span>
                    <div className=" modal-action self-center m-3">
                      <button className="btn mt-0" type="submit">
                        Submit
                      </button>
                      <label htmlFor="createBlog" className="btn modal-action">
                        close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {blogs.length > 0 && (
        <>
          <table className="table table-zebra w-full text-ellipsis">
            <thead>
              <tr>
                <th>Blog Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => {
                return (
                  <tr key={blog._id}>
                    <td className="flex flex-row justify-between">
                      <span>{blog.title}</span>
                      <span>{blog.isPremium ? "👑" : ""}</span>
                    </td>
                    <td>
                      <label htmlFor={blog._id} className="btn btn-xs">
                        ViewBlog
                      </label>
                      <input
                        type="checkbox"
                        id={blog._id}
                        className="modal-toggle"
                      />

                      <div className="modal modal-middle xl:modal-middle ">
                        <form
                          onSubmit={(event) => {
                            document.getElementById(
                              `${blog._id}+form`
                            ).disabled = "true";
                            document.getElementById(
                              `${blog._id}+edit`
                            ).className = " btn visible";
                            document.getElementById(
                              `${blog._id}+submit`
                            ).className = " btn invisible";
                            updateBlog(event, blog);
                          }}
                          className="h-5/6 bg-slate-800 w-9/12 p-5"
                        >
                          <div className=" flex flex-col h-full w-full">
                            <div className="flex flex-row justify-between">
                              <h3 className="font-bold text-lg m-10">
                                <p>{blog.title}</p>
                              </h3>
                              <label
                                htmlFor={blog._id}
                                className="btn modal-action"
                                onClick={() => {
                                  document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled = document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled
                                    ? true
                                    : true;
                                  document.getElementById(
                                    `${blog._id}+submit`
                                  ).className = "invisible btn modal-action";
                                  document.getElementById(
                                    `${blog._id}+edit`
                                  ).className = "visible btn modal-action";
                                }}
                              >
                                ❌
                              </label>
                            </div>
                            <div className="w-full h-full text-center ">
                              <textarea
                                className="w-full h-full rounded-xl px-3 py-2  "
                                disabled={true}
                                id={`${blog._id}+form`}
                                value={blog.content}
                              ></textarea>
                            </div>

                            <div className="modal-action">
                              <button
                                id={`${blog._id}+submit`}
                                htmlFor={blog._id}
                                type="submit"
                                className="btn invisible  "
                              >
                                Submit
                              </button>
                              <label
                                className={`btn visible modal-action`}
                                type="button"
                                id={`${blog._id}+edit`}
                                onClick={() => {
                                  document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled = document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled
                                    ? false
                                    : true;
                                  document.getElementById(
                                    `${blog._id}+submit`
                                  ).className = document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled
                                    ? "invisible btn modal-action"
                                    : "visible btn modal-action";
                                  document.getElementById(
                                    `${blog._id}+edit`
                                  ).className = document.getElementById(
                                    `${blog._id}+form`
                                  ).disabled
                                    ? "visible btn modal-action"
                                    : "invisible btn modal-action";
                                }}
                              >
                                Edit
                              </label>
                              <label
                                htmlFor={blog._id}
                                className="btn modal-action "
                                type="button"
                                onClick={() => {
                                  deleteBlog(blog);
                                }}
                              >
                                🗑️
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {blogs.length == 0 && <span>no blogs found</span>}
    </>
  );
  const page = (currentPage = "users") => {
    if (currentPage === "users") {
      setPageIndex(0);
    } else if (currentPage === "interviews") {
      setPageIndex(1);
    } else if (currentPage === "blogs") {
      setPageIndex(2);
    }
  };
  const setPage = [userPage, interviewPage, blogsPage];

  if (!interviewsData || !usersData) {
    return <p>Loading....</p>;
  }

  return (
    <div className="flex flex-col bg-blue-700 rounded overflow-hidden shadow-lg items-center text-xl mb-2 w-4/5 mx-auto px-6 py-4">
      <div className="stats shadow w-fit">
        <button onClick={() => page("users")}>
          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value">{filteredUserData.length}</div>
            <div className="stat-desc">Total number of users signed up</div>
          </div>
        </button>
        <button onClick={() => page("interviews")}>
          <div className="stat place-items-center">
            <div className="stat-title">Interviews</div>
            <div className="stat-value">{interviewsData.length}</div>
            <div className="stat-desc">Total number of interviews</div>
          </div>
        </button>
        <button onClick={() => page("blogs")}>
          <div className="stat place-items-center">
            <div className="stat-title">Blogs</div>
            <div className="stat-value">{filteredBlog.length}</div>
            <div className="stat-desc">Total number of Blogs availabe</div>
          </div>
        </button>
      </div>

      {setPage[pageIndex]}
    </div>
  );
};
