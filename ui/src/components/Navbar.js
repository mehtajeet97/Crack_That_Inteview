import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const hideNavbarAt = ["/", "/register", "/login"];
  const [hideNavigationTabs, setHideNavigationTabs] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!hideNavbarAt.includes(pathname)) {
      setHideNavigationTabs(true);
      setShowLoginBtn(false);
    } else {
      setHideNavigationTabs(false);
      setShowLoginBtn(true);
    }
  }, [pathname]);

  const tabs = [
    { title: "Home", path: "/feed" },
    { title: "Trending", path: "/trending" },
    { title: "Test Yourself", path: "/test-yourself" },
    { title: "Profile", path: "/profile" },
  ];

  return (
    <nav className="flex flex-row justify-between bg-blue-500 p-3 sticky top-0">
      <Link to={"/feed"}>
        <div className="flex flex-row items-center text-white mr-4">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-md tracking-tight">
            Crack That Interview
          </span>
        </div>
      </Link>
      {hideNavigationTabs && (
        <div className="text-sm flex mt-4 justify-around md:w-1/3 items-center">
          {tabs.map((tab, idx) => {
            return (
              <Link key={idx} to={`${tab.path}`}>
                <button className="block text-white font-normal hover:font-bold hover:text-md mr-4">
                  {tab.title}
                </button>
              </Link>
            );
          })}
        </div>
      )}
      {showLoginBtn && (
        <Link to={pathname === "/register" ? "/login" : "/register"}>
          <button className="bg-white py-2 px-6 text-sm font-medium rounded-lg">
            {pathname === "/register" ? "Login" : "Sign up"}
          </button>
        </Link>
      )}
    </nav>
  );
};
