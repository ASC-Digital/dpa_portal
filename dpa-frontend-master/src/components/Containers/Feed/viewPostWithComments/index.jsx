import {
  createPostComment,
  deletePostComment,
  getPostComments,
} from "@/services/Posts";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../shared/modal";
import { ShowPostComments } from "../shared/modal/showPost";
import { CommentsBaloons } from "./comments";
import { CommentInput } from "./createCommentInput/input";

export const ViewPostModal = ({ currentUser, post, modal, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const getPostComment = useCallback(async () => {
    if (post?.id) {
      const results = await getPostComments(post?.id);

      setComments(results?.comments);
    }
  }, [post?.id]);

  const handleCreateComment = async () => {
    if (newComment?.length) {
      try {
        await createPostComment({
          userId: currentUser?.userId,
          content: newComment,
          postId: post?.id,
        });
      } catch (error) {
      } finally {
        setNewComment("");
        getPostComment();
      }
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deletePostComment(id);
    } catch (error) {
    } finally {
      getPostComment();
    }
  };

  useEffect(() => {
    getPostComment();
  }, [getPostComment]);

  return (
    <Modal modal={modal} onClose={onClose} title={"Comentários"}>
      <div>
        <div style={{ minHeight: "50vh", maxHeight: "80vh" }}>
          <div className="bottomShadow hideOverflowX">
            <ShowPostComments
              currentUser={currentUser}
              post={post}
              hideShadow={true}
              hideActions={true}
            />
          </div>

          <div className="showCommentsDiv" style={{ marginBottom: 10 }}>
            {comments?.map((comment) => (
              <CommentsBaloons
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>

        <CommentInput
          currentUser={currentUser}
          handleCreateComment={handleCreateComment}
          setValue={setNewComment}
          value={newComment}
        />
      </div>
    </Modal>
  );
};
