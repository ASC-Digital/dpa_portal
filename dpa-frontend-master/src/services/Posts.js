import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Settings
export async function getPosts(queryString) {
  const response = await request({
    endpoint: `/api/posts` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getPosts-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getPosts-success]: ", response.data.data);

  return {
    status: true,
    posts: response.data.data?.data,
    totalItems: response.data.data?.totalItems,
    page: response.data.data?.page,
  };
}

// Send Settings
export async function createPost(body) {
  const response = await request({
    endpoint: `/api/posts`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[createPost-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[createPost-success]: ", response.data);

  return {
    status: true,
  };
}

export async function getPostComments(postId) {
  const response = await request({
    endpoint: `/api/comments?postId=${postId}`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getPostComments-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getPostComments-success]: ", response.data.data);

  return {
    status: true,
    comments: response.data.data,
  };
}

export async function createPostComment(body) {
  const response = await request({
    endpoint: `/api/comments`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[createPostComment-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[createPostComment-success]: ", response.data);

  return {
    status: true,
  };
}

export async function updatePostComment(id, body) {
  const response = await request({
    endpoint: `/api/comments/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updatePostComment-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updatePostComment-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Settings
export async function updatePost(id, body) {
  const response = await request({
    endpoint: `/api/posts/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updatePost-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updatePost-success]: ", response.data);

  return {
    status: true,
  };
}

export async function sendLike(body) {
  const response = await request({
    endpoint: `/api/likes`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendLike-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendLike-success]: ", response.data);

  return {
    status: true,
  };
}

export async function deleteLike(id) {
  const response = await request({
    endpoint: `/api/likes/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteLike-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteLike-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Settings
export async function deletePost(id) {
  const response = await request({
    endpoint: `/api/posts/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deletePost-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deletePost-success]: ", response.data);

  return {
    status: true,
  };
}

export async function deletePostComment(id) {
  const response = await request({
    endpoint: `/api/comments/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deletePostComment-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deletePostComment-success]: ", response.data);

  return {
    status: true,
  };
}
