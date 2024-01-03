import { PostActions } from "./actions";
import { PostAvatar } from "./avatar";
import ReactPlayer from "react-player/youtube";

export const Post = ({
  currentUser,
  post,
  handleShowComments,
  handleLike,
  handleDeletePost,
  handleEditPost,
  handleSelectPost,
  hideShadow,
  hideActions,
  tempLikes,
}) => {
  const { name, photoUrl, email } = currentUser;
  const { comments, likes, user, content, attachments, createdAt, id } = post;

  return (
    <div
      className={`p-4 mt-4 ${hideShadow ? "" : "shadowAdded"}`}
      style={{ backgroundColor: "white", borderRadius: 15 }}
    >
      <PostAvatar
        email={email}
        name={name}
        photoUrl={photoUrl}
        user={user}
        createdAt={createdAt}
        handleDeletePost={handleDeletePost}
        postId={id}
        post={post}
        handleEditPost={handleEditPost}
      />
      <hr />
      <div className="mt-4">
        <p className="mb-4">{content}</p>
        <div>
          {attachments?.map((item) => {
            if (item?.type?.includes("image")) {
              return (
                <img src={item?.link} alt="3" style={{ maxWidth: "100%" }} />
              );
            } else if (item?.link?.includes("mp4")) {
              return (
                <video controls width="100%" controlsList="nodownload">
                  <source src={item?.link} type="video/mp4" />
                </video>
              );
            } else if (item?.link?.includes("webm")) {
              return (
                <video controls width="100%" controlsList="nodownload">
                  <source src={item?.link} type="video/webm" />
                </video>
              );
            } else if (item?.type?.includes("video")) {
              return (
                <ReactPlayer url={item?.link} controls={true} config={{ file: { attributes: { controlsList: "nodownload" } }}}/>
              );
            } else {
              return (
                <div>
                  <a href={item?.link}>{item?.link} </a>
                </div>
              );
            }
          })}
        </div>

        {!hideActions && (
          <PostActions
            comments={comments}
            likes={likes}
            postId={id}
            handleLike={handleLike}
            post={post}
            handleSelectPost={handleSelectPost}
            tempLikes={tempLikes}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};
