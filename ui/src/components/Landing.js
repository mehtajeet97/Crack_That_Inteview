import { Link } from "react-router-dom";
import picture from "../virtualInterview.jpg";

export const Landing = () => {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Prepare yourself for the interviews like never before
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            We are going to conduct mock interviews with people across the globe
            at the comfort of your choice.
          </p>

          <div className="mt-4 md:mt-8">
            <Link to={"login"}>
              <span className="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400">
                Get Started Today
              </span>
            </Link>
          </div>
        </div>
      </div>

      <img
        alt="Violin"
        src={picture}
        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%_-_4rem)] md:rounded-tl-[60px]"
      />
    </section>
  );
};
