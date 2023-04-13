import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const hideNavbarAt = ["/", "/register", "/login"];
  const [hideNavigationTabs, setHideNavigationTabs] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!hideNavbarAt.includes(pathname)) {
      setHideNavigationTabs(true);
    } else {
      setHideNavigationTabs(false);
    }
  }, [pathname]);

  const tabs = [
    { title: "Home", path: "/feed" },
    { title: "Trending", path: "/trending" },
    { title: "Test Yourself", path: "/test-yourself" },
    { title: "Profile", path: "/profile" },
  ];

  return (
    <nav className="flex flex-col md:flex-row bg-blue-600 p-3">
      <div className="flex items-center text-white mr-4">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Crack That Interview
        </span>
      </div>
      {hideNavigationTabs && (
        <div className="text-sm flex justify-around md:w-1/3 items-center">
          {tabs.map((tab, idx) => {
            return (
              <Link key={idx} to={`${tab.path}`}>
                <button className="block text-white font-normal hover:text-white mr-4">
                  {tab.title}
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
