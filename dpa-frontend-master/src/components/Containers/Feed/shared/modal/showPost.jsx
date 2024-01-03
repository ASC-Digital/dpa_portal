import { PostActions } from "../../post/actions";
import { PostAvatar } from "../../post/avatar";

export const ShowPostComments = ({
  currentUser,
  post,
  handleShowComments,
  handleLike,
  handleDeletePost,
  handleEditPost,
  handleSelectPost,
  hideShadow,
  hideActions,
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
      <div className="mt-4" style={{ maxHeight: "10vh" }}>
        <p className="mb-4">{content}</p>
        <div className={`d-flex row`}>
          {attachments?.map((item) => {
            if (item?.type?.includes("image")) {
              return (
                <a href={item?.link} className="mt-3">
                  <img src={item?.link} alt="3" />
                </a>
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
          />
        )}
      </div>
    </div>
  );
};
