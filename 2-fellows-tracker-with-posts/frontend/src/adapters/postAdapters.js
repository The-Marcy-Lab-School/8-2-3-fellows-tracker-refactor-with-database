import fetchData from '../utils/fetchData';

export const getFellowPosts = async (fellowId) => {
  return await fetchData(`/api/fellows/${fellowId}/posts`)
}

export const postNewPost = async (fellowId, postContent) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ postContent })
  }
  return await fetchData(`/api/fellows/${fellowId}/posts`, options)
}

export const deletePost = async (postId) => {
  const options = {
    method: "DELETE"
  }
  return await fetchData(`/api/posts/${postId}`, options);
}