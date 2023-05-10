import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

export const Navbar2 = () => {
  const hideNavbarAt = ["/", "/register", "/login"];
  const { pathname } = useLocation();
  const [hideNavigationTabs, setHideNavigationTabs] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const navigate = useNavigate();
  const [openMenuDropdown, setMenuDropdown] = useState(false);
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state?.userDetails;

  let navTabs = [
    {
      name: "Interviews",
      path: "/interview",
      role: ["student", "interviewer"],
    },
    {
      name: "Blogs",
      path: "/blogs",
      role: ["student", "interviewer"],
    },
    {
      name: "AI Exam",
      path: "/test-yourself",
      role: ["student"],
    },
    {
      name: "Go Premium",
      path: "/join-premium",
      role: ["student"],
    },
    {
      name: "Dashboard",
      path: "/admin",
      role: ["admin"],
    },
  ];

  let activeNavTabs = navTabs.filter((tab) =>
    tab.role.includes(userDetails?.role)
  );

  const profileTabs = [
    {
      title: (
        <>
          <span>Hey, {userDetails?.firstName || ""}</span>
          <span>Role: {userDetails?.role || ""}</span>
        </>
      ),
    },
    {
      title: "👀 View Profile",
      path: "/profile",
      name: "profile",
    },
    {
      title: "⭐️ Score ",
      path: "",
      name: "score",
    },
    {
      title: "👋🏻 Log out",
      name: "logout",
    },
  ];

  const onClickHome = () => {
    if (userDetails?._id) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (userDetails._id) {
      if (["/", "/login", "/register"].includes(pathname)) {
        navigate("/feed");
      }
    }
    if (!hideNavbarAt.includes(pathname)) {
      setHideNavigationTabs(true);
      setShowLoginBtn(false);
    } else {
      setHideNavigationTabs(false);
      setShowLoginBtn(true);
    }
  }, [pathname]);

  const logout = () => {
    updateState({ ...state, isLoggedIn: false, userDetails: {} });
    state.triggerToast(`See you again, ${userDetails.firstName}`, "success");
    localStorage.clear();
    navigate("/");
  };

  const handleProfileDropdown = (name) => {
    switch (name) {
      case "profile":
        navigate(`/${name}`);
        break;
      case "score":
        break;
      case "logout":
        logout();
        break;
      default:
        console.log("in default");
        break;
    }
  };

  return (
    <>
      <div className="navbar sticky text-white bg-blue-700">
        <div className="navbar-start">
          {state?.isLoggedIn && (
            <div
              className="dropdown"
              onClick={() => setMenuDropdown(!openMenuDropdown)}
            >
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              {openMenuDropdown && (
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-700 text-white font-semibold rounded-box w-52"
                >
                  {activeNavTabs.map((tab, idx) => (
                    <Link key={idx} to={tab.path}>
                      <li>
                        <a>{tab.name}</a>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            onClick={onClickHome}
            className="btn btn-ghost normal-case text-xl"
          >
            Crack That Interview
          </button>

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {hideNavigationTabs &&
                activeNavTabs.map((tab, idx) => (
                  <Link key={idx} to={tab.path}>
                    <li>
                      <span>{tab.name}</span>
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
        {hideNavigationTabs && (
          <div className="navbar-end gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow font-semibold bg-blue-700 rounded-box w-52 justify-start"
              >
                {profileTabs.map((tab, idx) => (
                  <li key={idx} onClick={() => handleProfileDropdown(tab.name)}>
                    <span className="flex flex-col">{tab.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {showLoginBtn && (
          <div className="w-full justify-end">
            <Link
              to={
                pathname === "/register" || pathname === "/"
                  ? "/login"
                  : "/register"
              }
            >
              <button className="bg-white text-blue-700 py-2 px-6 text-sm font-medium rounded-lg">
                {pathname === "/register" || pathname === "/"
                  ? "Login"
                  : "Sign up"}
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
