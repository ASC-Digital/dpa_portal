import React from "react";
import { PostAvatar } from "./avatar";

export const PostComments = ({
  comments,
  user,
  postId,
  handleShowComments,
}) => {
  return (
    <div className="mt-4">
      <hr />
      <div id={`comment-${postId}`}>
        <h6>Comentários</h6>
        {comments?.length ? (
          <div className={`panel container p-2`}>
            {comments?.map((comment) => {
              return (
                <div
                  className="mt-3 p-3"
                  style={{ backgroundColor: "white", borderRadius: 5 }}
                >
                  <PostAvatar
                    email={comment?.user?.email}
                    name={comment?.user?.name}
                    photoUrl={comment?.user?.photoUrl}
                    user={user}
                    createdAt={comment?.createdAt}
                  />
                  <hr />
                  <div className="mt-4">
                    <div style={{ color: "black" }}>{comment?.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
