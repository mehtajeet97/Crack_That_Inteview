import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-blue-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="bg-gray-50 border border-gray-400 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required=""
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-white font-medium">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-white hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Link to={"/feed"}>
              <button
                type="submit"
                className="w-full text-white border-2 border-solid border-white hover:bg-white hover:text-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </Link>
            <p className="text-sm font-normal text-white">
              Don’t have an account yet?{" "}
              <Link to={"/register"}>
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
