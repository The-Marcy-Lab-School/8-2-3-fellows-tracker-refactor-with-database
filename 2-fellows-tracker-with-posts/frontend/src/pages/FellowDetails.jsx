import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteFellow, getFellowById, changeFellowName } from '../adapters/fellowAdapters';
import { deletePost, getFellowPosts, postNewPost } from '../adapters/postAdapters';

const FellowDetails = () => {
  // fetched state
  const [fellow, setFellow] = useState({});
  const [postsByFellow, setPostsByFellow] = useState([])

  // form response state
  const [deletedPost, setDeletedPost] = useState('');
  const [newPost, setNewPost] = useState('');

  // form input state
  const [newFellowName, setNewFellowName] = useState('');
  const [postContent, setPostContent] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  // fetch the current fellow based on the current URL path
  useEffect(() => {
    const doFetch = async () => {
      const [currentFellow, _] = await getFellowById(id)
      if (currentFellow) setFellow(currentFellow);
    }
    doFetch();
  }, [])

  // fetch the posts for this fellow, refetch if a new post is added or a post is deleted
  useEffect(() => {
    const doFetch = async () => {
      const [posts, _] = await getFellowPosts(id);
      if (posts) setPostsByFellow(posts);
    }
    doFetch();
  }, [deletedPost, newPost])

  const handleChangeFellowName = async (e) => {
    e.preventDefault();
    if (!newFellowName) return;
    const [updatedFellow, _] = await changeFellowName(id, newFellowName);
    if (updatedFellow) setFellow(updatedFellow);
    setNewFellowName('');
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const [newPostResponse, _] = await postNewPost(id, postContent)
    if (newPostResponse) setNewPost(newPostResponse);
    setPostContent('');
  }

  const handleDeletePost = async (postId) => {
    const [deletedPostResponse, _] = await deletePost(postId);
    if (deletedPostResponse) setDeletedPost(deletedPostResponse);
  }

  const handleDeleteFellow = async () => {
    await deleteFellow(id)
    navigate('/')
  }

  return (
    <>
      <h1>Fellow Details</h1>
      <h2>Posts by {fellow.name}</h2>
      <ul>
        {
          postsByFellow.map((post) => {
            return (
              <li className='post-list-item' key={post.id}>
                <p>{post.post_content}</p>
                <button onClick={() => handleDeletePost(post.id)}>X</button>
              </li>
            )
          })
        }
      </ul>

      <form onSubmit={handleSubmitPost}>
        <label htmlFor="postContent">New Post</label>
        <textarea name="postContent" id="postContent" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleChangeFellowName}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <button style={{ backgroundColor: 'red' }} onClick={handleDeleteFellow}>Delete Fellow</button>
      <br></br>
      <br></br>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default FellowDetails;