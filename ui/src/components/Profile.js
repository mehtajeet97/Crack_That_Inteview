import { validation } from "../shared/helper.js";
import picture from "../blank-profile-picture.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

//To do: Reset Password Link
export const Profile = () => {
  const navigate = useNavigate();
  const [currentProfileState, setProfileState] = useState({});
  const [originalProfileState, setOriginalProfileState] = useState({});
  const [isEdit, setEdit] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(picture);
  const [errors, setErrors] = useState({});
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;

  useEffect(() => {
    const getUser = async () => {
      let user = await getUserCall(userDetails._id);
      setProfileState(user);
      setOriginalProfileState(user);
    };
    getUser();
  }, []);

  const getUserCall = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/users/${id}`, {
      headers: { Authorization: `${localStorage.getItem("accessToken")}` },
    });
    return data;
  };
  // const getUserCall = async (id) => {
  //   const { data } = await axios.get(`http://localhost:4000/users/${id}`, {
  //     headers: { Authorization: `${localStorage.getItem("accessToken")}` },
  //   });
  //   console.log(data.data);
  //   return data.data;
  // };

  const handleFieldChange = (e) => {
    setProfileState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCancel = () => {
    setProfileState(originalProfileState);
    setEdit((prev) => !prev);
    setProfilePhoto(picture);
  };

  const handleProfileChange = (e) => {
    document.getElementById("profile").click();
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const userProfile = async () => {
    try {
      let payload = currentProfileState;
      const userProfileURL = `http://localhost:4000/users/${state.userDetails._id}`;
      let { data, status } = await axios.patch(userProfileURL, payload, {
        headers: {
          update: "user-profile",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });
      if (status === 200) {
        navigate("/feed");
        setProfileState(data);
      } else {
        console.log(data);
      }
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append("profilePhoto", profilePhoto);
    const formJson = Object.fromEntries(formData.entries());
    let validationResult = validation.userProfile(formJson);
    if (!validationResult) {
      setErrors(validationResult.errors);
    } else {
      let payload = validationResult.data;
      userProfile(payload);
    }
  };

  return (
    <div className="bg-blue-700 rounded overflow-hidden shadow-lg text-md mb-2 w-1/2 mx-auto px-6 py-4">
      <div className="font-semibold text-white mb-2">User Profile</div>
      <div className="btn-group">
        <button className="btn mb-2" onClick={handleCancel}>
          {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>
      <form className="w-full max-w-lg user-profile-form mb-2">
        <div className="w-full space-y-4 rounded-lg sm:max-w-md xl:p-0">
          {isEdit && (
            <div className="w-full rounded-lg sm:max-w-md xl:p-0">
              <label for="avatar">Select a Profile Picture</label>
              <img
                src={profilePhoto}
                className="w-3/5 lg:block hidden mt-2"
                alt="Profile"
                onClick={handleProfileChange}
              ></img>
              <input
                type="file"
                onChange={handleProfileChange}
                id="profile"
                className="hidden"
                accept="image/*"
              />
            </div>
          )}
          {!isEdit && (
            <img
              src={picture}
              className="w-3/5 lg:block hidden"
              alt="Profile"
            ></img>
          )}
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-5 mb-5 focus:outline-none focus:bg-white opacity-300"
              id="grid-first-name"
              type="text"
              name="firstName"
              value={currentProfileState?.firstName || ""}
              onChange={handleFieldChange}
              placeholder="Siddharth"
              disabled={!isEdit}
            ></input>
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="last-name">
              Last Name
            </label>
            <input
              className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-5 mb-5 focus:outline-none focus:bg-white opacity-300"
              id="grid-first-name"
              type="text"
              name="lastName"
              value={currentProfileState?.lastName || ""}
              onChange={handleFieldChange}
              placeholder="Prabhakaran"
              disabled={!isEdit}
            ></input>
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="phone-number">
              Phone Number
            </label>
            <input
              className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-5 mb-5 focus:outline-none focus:bg-white opacity-300"
              id="phone"
              type="tel"
              name="phoneNumber"
              value={currentProfileState?.phoneNumber || ""}
              onChange={handleFieldChange}
              placeholder=""
              disabled={!isEdit}
            ></input>
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label
              className="text-white font-semibold mb-2"
              for="email-address"
            >
              Email Address
            </label>
            <input
              className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-5 mb-5 focus:outline-none focus:bg-gray opacity-300 cursor-not-allowed"
              id="email-address"
              type="email"
              name="email"
              value={currentProfileState?.email || ""}
              placeholder="example@gmail.com"
              disabled
            ></input>
          </div>
          {/* TO DO: Make changes to the social media icons and skills to make it editable */}
          <div>
            {isEdit && (
              <div className="w-full rounded-lg sm:max-w-md xl:p-0">
                <label className="text-white font-semibold mb-2" for="linkedin">
                  Linkedin
                </label>
                <input
                  className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-10 mb-5 focus:outline-none focus:bg-white opacity-300"
                  id="linkedin"
                  type="text"
                  name="linkedin"
                  value={currentProfileState?.linkedin || ""}
                  onChange={handleFieldChange}
                  placeholder="Linkedin"
                ></input>
              </div>
            )}
            {!isEdit && (
              <button
                type="button"
                className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                onClick={() => {
                  if (currentProfileState?.linkedin)
                    window.open(currentProfileState.linkedin, {
                      target: "_blank",
                    });
                }}
              >
                <svg
                  className="w-10 h-10 fill-current"
                  role="img"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path>
                  </g>
                </svg>
              </button>
            )}
          </div>
          <div>
            {isEdit && (
              <div className="w-full rounded-lg sm:max-w-md xl:p-0">
                <label className="text-white font-semibold mb-2" for="github">
                  GitHub
                </label>
                <input
                  className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-10 mb-5 focus:outline-none focus:bg-white opacity-300"
                  id="github"
                  type="text"
                  name="github"
                  value={currentProfileState?.github || ""}
                  onChange={handleFieldChange}
                  placeholder="GitHub"
                ></input>
              </div>
            )}
            {!isEdit && (
              <button
                className="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                onClick={() => {
                  if (currentProfileState?.github)
                    window.open(currentProfileState.github, {
                      target: "_blank",
                    });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="w-10 h-10 fill-current"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </button>
            )}
          </div>
          <div>
            {isEdit && (
              <div className="w-full rounded-lg sm:max-w-md xl:p-0">
                <label className="text-white font-semibold mb-2" for="twitter">
                  Twitter
                </label>
                <input
                  className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-10 mb-5 focus:outline-none focus:bg-white opacity-300"
                  id="twitter"
                  type="text"
                  name="twitter"
                  value={currentProfileState?.twitter || ""}
                  onChange={handleFieldChange}
                  placeholder="Twitter"
                ></input>
              </div>
            )}
            {!isEdit && (
              <button
                className="bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                onClick={() => {
                  if (currentProfileState?.twitter)
                    window.open(currentProfileState.twitter, {
                      target: "_blank",
                    });
                }}
              >
                <svg
                  className="w-10 h-10 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
            )}
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="skills">
              Skills
            </label>
            {currentProfileState.skills.length > 0 ? (
              <div className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row">
                {currentProfileState.skills.map((skill) => (
                  <div className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-black-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-100 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4">
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="organization">
              Organization
            </label>
            <input
              className="appearance-none block w-half bg-gray-200 text-black-700 border border-black-500 rounded py-3 px-10 mb-5 focus:outline-none focus:bg-gray opacity-300 cursor-not-allowed"
              id="organization"
              type="text"
              value={currentProfileState?.organization || ""}
              placeholder="Organization"
              disabled
            ></input>
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label
              className="text-white font-semibold mb-2"
              for="upcoming-interviews"
            >
              Upcoming Interviews
            </label>
            {currentProfileState.upcomingInterviews.length > 0 ? (
              <div className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row">
                {currentProfileState.upcomingInterviews.map((interview) => (
                  <div className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-black-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4">
                    {interview}
                  </div>
                ))}
              </div>
            ) : (
              <div>No Upcoming Interviews</div>
            )}
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label
              className="text-white font-semibold mb-2"
              for="recent-interviews"
            >
              Recent Interviews
            </label>
            {currentProfileState.recentInterviews.length > 0 ? (
              <div className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row">
                {currentProfileState.recentInterviews.map((interview) => (
                  <div className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-black-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4">
                    {interview}
                  </div>
                ))}
              </div>
            ) : (
              <div>No Recent Interviews</div>
            )}
          </div>
          <div className="w-full rounded-lg sm:max-w-md xl:p-0">
            <label className="text-white font-semibold mb-2" for="blogs">
              Blogs
            </label>
            {currentProfileState.blogs.length > 0 ? (
              <div className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row">
                {currentProfileState.blogs.map((blog) => (
                  <div className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-black-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4">
                    {blog}
                  </div>
                ))}
              </div>
            ) : (
              <div> No Blogs </div>
            )}
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
