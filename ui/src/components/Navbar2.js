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
  const userDetails = state.userDetails;

  let navTabs = [
    {
      name: "Interviews",
      path: "/interview",
      role: ["student", "interviewer"],
    },
    {
      name: "Blogs",
      path: "/blog",
      role: ["student", "interviewer"],
    },
    {
      name: "AI Exam",
      path: "/test-yourself",
      role: ["student"],
    },
    {
      name: "Go Premium",
      path: "/premium",
      role: ["student"],
    },
    {
      name: "Dashboard",
      path: "/admin",
      role: ["admin"],
    }
  ];

  let activeNavTabs = navTabs.filter((tab) =>
    tab.role.includes(userDetails.role)
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
    localStorage.clear();
    updateState({ ...state, isLoggedIn: false, userDetails: {} });
    state.triggerToast("User Successfully Logged Out!", "success");
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
          {state.isLoggedIn && (
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
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  <span className="badge badge-md bg-white text-blue-700 indicator-item">
                    8
                  </span>
                </div>
              </label>
              <div
                tabIndex={1}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
