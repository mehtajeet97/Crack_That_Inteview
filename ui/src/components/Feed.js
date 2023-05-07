import { Link } from "react-router-dom";

export const Feed = () => {
  const cards = [
    {
      title: "Interviews",
      path: "/interviewerslots",
      data: "Hey this is an interview card. you will get any upcoming interviews here",
    },
    { title: "Blogs", path: "/blog" },
    { title: "Show me what's trending today", path: "/trending" },
    { title: "Test Yourself", path: "/test-yourself" },
    { title: "Recent Interviews", path: "/interview" },
    { title: "Learn More", path: "/interview" },
    { title: "Learn About Premium", path: "/join-premium" },
  ];

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-cyan-300 basis-2/7 rounded overflow-hidden shadow-lg"
        >
          <div className="px-6 py-4">
            <Link to={card.path}>
              <div className="font-bold text-xl mb-2">{card.title}</div>
            </Link>
            <p className="text-gray-700 text-base">{card.data && card.data}</p>
            <p className="text-gray-700 text-base">
              {!card.data &&
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.`}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {card?.tags &&
              card.tags.length &&
              card.tags.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            {!card.tags && (
              <>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #python
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #javascript
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #ruby
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
