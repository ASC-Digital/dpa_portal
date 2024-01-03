/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const PostActions = ({
  likes,
  comments,
  postId,
  handleLike,
  post,
  handleSelectPost,
  tempLikes,
  currentUser,
}) => {
  return (
    <div className="mt-4 d-flex justify-content-between">
      <div>
        <button
          className={`mr-1 btn`}
          style={{ color: "rgb(21, 132, 179)" }}
          onClick={() => handleLike(postId, likes)}
        >
          <i
            className={`${
              likes?.some(
                (i) => i?.postId === postId && i?.userId === currentUser?.userId
              ) || tempLikes?.some((i) => i === postId)
                ? "fas"
                : "far"
            } fa-thumbs-up`}
          ></i>
          {"    "}
          {likes?.length + tempLikes?.filter((i) => i === postId)?.length || 0}
        </button>
        <button
          className="btn"
          style={{ color: "rgb(21, 132, 179)" }}
          onClick={() => handleSelectPost(post)}
        >
          <i className="far fa-comment"></i> {comments?.length || 0}
        </button>
      </div>
    </div>
  );
};
