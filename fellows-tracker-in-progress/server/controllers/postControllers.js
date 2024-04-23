const Post = require('../model/Post');

// Create
// POST /api/fellows/:fellowId/posts
const createPost = async (req, res) => {
  // The fellowId will be a path parameter in the request URL
  const { fellowId } = req.params;
  // The POST request body will be an object: `{ message: 'hello' }`
  const { message } = req.body;

  const newPost = await Post.create(fellowId, message);
  res.send(newPost);
};

// what endpoint should trigger this controller?
// GET /api/fellows/:fellowId/posts
const servePostsByFellow = async (req, res) => {
  const { fellowId } = req.params;
  // where is the id coming from?
  const postsByFellow = await Post.findByFellowId(fellowId)
  res.send(postsByFellow);
}

// GET /api/posts
// GET /api/posts/:id

// GET /api/fellows/:fellowId/posts
// DELETE /api/fellows/:fellowId/posts/:postId
// DELETE /api/fellows/:fellowId/posts

module.exports = {
  createPost,
  servePostsByFellow
};