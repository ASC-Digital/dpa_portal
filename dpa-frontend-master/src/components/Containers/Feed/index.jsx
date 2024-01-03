/* eslint-disable no-unused-vars */
import ModalDelete from "@/components/Presentational/ModalDelete";
import { useAuth } from "@/contexts/Authentication";
import useStorage from "@/hooks/useStorage";
import {
  createPost,
  deleteLike,
  deletePost,
  getPosts,
  sendLike,
  updatePost,
} from "@/services/Posts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { CreatePostModal } from "./createPostModal";
import { NewPost } from "./newPost";
import { Post } from "./post";
import "./style.css";
import { ViewPostModal } from "./viewPostWithComments";

export const FeedsContainer = () => {
  const { user } = useAuth();
  const { uploadData } = useStorage();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postId, setPostId] = useState("");
  const [openModel, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [openSelectedPostModal, setOpenSelectedPostModal] = useState(false);
  const [page, setPage] = useState(1);
  const [tempLikes, setTempLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [rowsPerPage] = useState(10);

  const retrievePosts = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        if (user?.userId) {
          const results = await getPosts(
            `?userId=${user?.userId}&roleId=${user?.roleId}&targetUser=${user?.userId}&page=${page}&limit=${rowsPerPage}`
          );
          setTotalItems(results?.totalItems);
          setPosts(results?.posts);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [user, rowsPerPage]
  );

  const handleLike = async (postId, likes) => {
    try {
      setTempLikes((l) => [...l, postId]);
      const likeFound =
        likes?.find((item) => item?.userId === user?.userId) ||
        tempLikes?.find((i) => i === postId);
      if (likeFound) {
        setTempLikes((l) => l?.filter((i) => i !== postId));
        await deleteLike(likeFound?.id);
      } else {
        await sendLike({ userId: user?.userId, postId });
      }
    } catch (error) {
      setTempLikes((l) => l?.filter((i) => i !== postId));
    } finally {
    }
  };

  const handleResetStates = () => {
    setNewPost("");
    setAttachments([]);
    setSelectedRole("");
    setPostId("");
    setOpenModal(false);
  };

  const handleCreatePost = async () => {
    if (newPost?.length || attachments?.length) {
      setLoadingUpload(true);
      let uploaded = [];
      const attachmentsFilterd = attachments?.filter((a) => !a?.id);
      for await (let file of attachmentsFilterd) {
        if (file?.file) {
          const result = await uploadData(file?.file);
          uploaded?.push({ link: result, type: file?.type });
        } else {
          uploaded?.push({ link: file?.url, type: file?.type });
        }
      }

      if (attachmentsFilterd?.length !== uploaded?.length) return;

      try {
        if (postId?.length) {
          await updatePost(postId, {
            content: newPost,
            userId: user?.userId,
            targetRole: selectedRole,
            attachments: uploaded,
          });
        } else {
          await createPost({
            content: newPost,
            userId: user?.userId,
            targetRole: selectedRole,
            attachments: uploaded,
          });
        }
      } catch (error) {
      } finally {
        handleResetStates();
        setLoadingUpload(false);
        await retrievePosts();
      }
    }
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteID(id);
    setDeleteModal(true);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(deleteID);
    } catch (error) {
    } finally {
      handleResetStates();
      setDeleteModal(false);
      await retrievePosts();
    }
  };

  const handleEditPost = (post) => {
    setPostId(post?.id);
    setNewPost(post?.content);
    setAttachments(post?.attachments);
    setSelectedRole(post?.targetRole);
    setOpenModal(true);
  };

  const handleShowComments = (postId) => {
    const text = document.getElementById(`commentText-${postId}`);
    const element = document.getElementById(`comment-${postId}`);
    if (element.style.display === "none") {
      element.style.display = "";
      text.innerText = "Ocultar comentários";
    } else {
      element.style.display = "none";
      text.innerText = "Mostrar comentários";
    }
  };

  const handleChangePage = (page) => {
    setPage(page);
    retrievePosts(page);
  };

  useEffect(() => {
    setTimeout(async () => await retrievePosts(), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retrievePosts]);

  const handleAddAttachments = (e) => {
    const file = e;
    setAttachments((a) => [...a, file]);
  };

  const handleOpenCreatePostModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    handleResetStates();
    setOpenModal(false);
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setOpenSelectedPostModal(true);
  };

  const handleCloseSelectPost = () => {
    setSelectedPost("");
    retrievePosts();
    setOpenSelectedPostModal(false);
  };

  return (
    <>
      <div
        className="container"
        style={{

          height: "auto",
          padding: 10,
        }}
      >
        <NewPost
          handleOpenCreatePostModal={handleOpenCreatePostModal}
          currentUser={user}
        />
        <div
          style={{
            marginTop: 30,
            marginBottom: 20,
            borderRadius: 20,
          }}
        >
          {posts?.map((post) => (
            <Post
              key={post?.id}
              currentUser={user}
              post={post}
              tempLikes={tempLikes}
              handleShowComments={handleShowComments}
              handleLike={handleLike}
              handleDeletePost={handleOpenDeleteModal}
              handleEditPost={handleEditPost}
              handleSelectPost={handleSelectPost}
            />
          ))}
        </div>
        <PaginationControl
          page={page}
          between={4}
          total={totalItems}
          limit={rowsPerPage}
          changePage={(page) => {
            handleChangePage(page);
          }}
          ellipsis={1}
        />
      </div>
      <CreatePostModal
        modal={openModel}
        files={attachments}
        setFiles={handleAddAttachments}
        setAttachments={setAttachments}
        onClose={handleCloseModal}
        handleCreatePost={handleCreatePost}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        setNewPost={setNewPost}
        newPost={newPost}
        loadingUpload={loadingUpload}
      />
      <ModalDelete
        modal={deleteModal}
        title={"Excluir Postagem"}
        onClose={() => setDeleteModal(false)}
        onClick={handleDeletePost}
      />
      <ViewPostModal
        currentUser={user}
        post={selectedPost}
        modal={openSelectedPostModal}
        onClose={handleCloseSelectPost}
      />
    </>
  );
};
