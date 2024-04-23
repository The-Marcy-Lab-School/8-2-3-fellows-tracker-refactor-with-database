import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const FellowDetails = () => {
  // fetched state
  const [fellow, setFellow] = useState({})
  const [posts, setPosts] = useState([])

  // form state
  const [newFellowName, setNewFellowName] = useState('');
  const [postContent, setPostContent] = useState('');

  // for submission state
  const [newPostResponse, setNewPostResponse] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [currentFellowResponse, _] = await fetchData(`/api/fellows/${id}`)
      if (currentFellowResponse) setFellow(currentFellowResponse);
    }
    doFetch();
  }, [])

  useEffect(() => {
    const doFetch = async () => {
      const [postsResponse, _] = await fetchData(`/api/fellows/${id}/posts`)
      if (postsResponse) setPosts(postsResponse);
    }
    doFetch();
  }, [newPostResponse])

  const handleDeleteFellow = async () => {
    const options = {
      method: "DELETE"
    }
    await fetchData(`/api/fellows/${id}`, options)
    navigate('/');
  }

  const handleChangeFellowName = async (e) => {
    e.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ fellowName: newFellowName })
    }
    const [updatedFellowResponse, _] = await fetchData(`/api/fellows/${id}`, options)
    if (updatedFellowResponse) setFellow(updatedFellowResponse)

    setNewFellowName('')
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: postContent })
    }
    const [newPost, _] = await fetchData(`/api/fellows/${id}/posts`, options);
    if (newPost) setNewPostResponse(newPost);
  }



  return (
    <>
      <h1>Fellow Details</h1>
      <p>Posts by {fellow.name} - {fellow.id}</p>
      <form onSubmit={handlePostSubmit}>
        <label htmlFor="postContent">New Post</label>
        <input type="text" name="postContent" id="postContent" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {
          posts.map((post) => {
            return <li key={post.id}>
              {post.message}
            </li>
          })
        }
      </ul>

      <form onSubmit={handleChangeFellowName}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <button className='btn warning' onClick={handleDeleteFellow}>Delete Fellow</button>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default FellowDetails;