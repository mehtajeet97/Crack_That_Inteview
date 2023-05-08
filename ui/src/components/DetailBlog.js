/* 
upvotes or downvotes or submission of userread blogs gets updated when the component unmounts
*/
/* // todo : userid user premium
problem : when the user upvotes or downvote or doesnt vote when going back to the blogs page it is sending the request
event if there is no change in votes
fixed that problem while updating the blog
*/

import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import axios from "axios";

export const DetailBlog = () => {
  const { state, updateState } = useContext(AuthContext);

  const userId = state.userDetails._id;
  const userPremium = state.userDetails.isPremiumUser;

  const location = useLocation();
  const navigate = useNavigate();

  const [blog, editBlog] = useState([]);
  const [origBlog, setOrigBlog] = useState([]);
  const [back, setBack] = useState(false);

  const { blogId } = useParams();

  const voteController = (event) => {
    const upVotes = [...blog.upVotes];
    const downVotes = [...blog.downVotes];
    let source = event.target.id;
    if (source === "upVote") {
      if (upVotes.includes(userId)) {
        upVotes.pop(userId);
      } else if (downVotes.includes(userId)) {
        upVotes.push(userId);
        downVotes.pop(userId);
      } else {
        upVotes.push(userId);
      }
    } else if (source === "downVote") {
      if (downVotes.includes(userId)) {
        downVotes.pop(userId);
      } else if (upVotes.includes(userId)) {
        downVotes.push(userId);
        upVotes.pop(userId);
      } else {
        downVotes.push(userId);
      }
    }

    editBlog({
      ...blog,
      upVotes: upVotes,
      upVotesCount: upVotes.length,
      downVotes: downVotes,
      downVotesCount: downVotes.length,
    });
  };

  const headers = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };

  const updateDate = () => {
    const date = blog.updatedAt.split(" ");
    return (
      <>
        <p className="pr-3 ">Updated At </p>
        <span>
          {`${date[2]}
        ${date[1]}
        ${date[3]}`}
        </span>
      </>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get(
          `http://localhost:4000/articles/${blogId}`,
          headers
        );

        if (data.message === "error") throw "error";
        editBlog(data.data);
        setOrigBlog(data.data);
      } catch (e) {
        if (e.response.status === 401) {
          state.triggerToast(
            "Your session has been expired. Please log in.",
            "error"
          );
          localStorage.clear();
          navigate("/login");
        } else {
          editBlog([]);
          setOrigBlog([]);
        }
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    if (
      back &&
      (origBlog.upVotes.length !== blog.upVotes.length ||
        origBlog.downVotes.length !== blog.downVotes.length)
    ) {
      return () => {
        console.log("i shouldnt run");
        try {
          const errors = [];
          const id = location.pathname.split("/")[2];
          axios
            .patch(
              `http://localhost:4000/articles/${id}`,
              {
                upVotes: blog.upVotes,
                downVotes: blog.downVotes,
              },
              headers
            )
            .catch((e) => errors.push(e));
          axios
            .patch(
              `http://localhost:4000/users/${userId}`,
              {
                blogId: id,
              },
              headers
            )
            .catch((e) => errors.push(e));
        } catch (e) {
          console.log(e);
        }
      };
    }
  }, [back]);

  if (blog.isPremium) {
    if (!userPremium) {
      navigate("/join-premium");
    }
  }
  return (
    <div>
      {blog && blog.length !== 0 && (
        <div key={blog.blogId} className="shadow-xl m-8 text-black">
          <div className="flex flex-col space-x-4 p-3 ">
            <button
              onClick={() => {
                setBack(true);
                navigate(-1);
              }}
              className="font-semibold self-start space-y-2"
            >
              {" "}
              {"<   "}Go Back
            </button>

            <div className="flex justify-between  mx-10 mt-5 items-center">
              <div className="">
                <p className="mr-10 font-semibold capitalize">{blog.title}</p>
                <button
                  id="upVote"
                  onClick={voteController}
                  className={
                    blog.upVotes.includes(userId)
                      ? "font-bold "
                      : "font-light opacity:70 self-start"
                  }
                >
                  👍{blog.upVotesCount}
                </button>
                <button
                  id="downVote"
                  onClick={voteController}
                  className={
                    blog.downVotes.includes(userId)
                      ? "font-bold self-start"
                      : "font-light opacity:70 self-start"
                  }
                >
                  👎{blog.downVotesCount}
                </button>
              </div>

              <span className="flex  flex-col  font-light">{updateDate()}</span>
            </div>

            <div className="flex space-x-3 my-5 items-center flex-wrap">
              {blog?.tags &&
                Boolean(blog.tags.length) &&
                blog.tags.slice(0, 3).map((x, y) => (
                  <span key={y} className="font-light capitalize">
                    | {x} |
                  </span>
                ))}
            </div>
            <div>
              {blog.content.split("\n\n").map((x, y) => (
                <p className="my-4" key={y}>
                  {x}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      {blog.length === 0 && (
        <div className="bg-blue-700 h-12 items-center p-3  text-white basis-2/7 rounded   shadow-lg text-truncate col-span-3 justify-self-center text-black font-bold capitalize">
          <p>error whileloading Blog ...!!!</p>
        </div>
      )}
    </div>
  );
};
