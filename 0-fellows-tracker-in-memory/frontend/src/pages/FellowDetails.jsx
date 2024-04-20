import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const FellowDetails = () => {
  const [fellow, setFellow] = useState({})
  const [newFellowName, setNewFellowName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [currentFellowResponse, _] = await fetchData(`/api/fellows/${id}`)
      if (currentFellowResponse) setFellow(currentFellowResponse);
    }
    doFetch();
  }, [])

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

  return (
    <>
      <h1>Fellow Details</h1>
      <p>Posts by {fellow.name} - {fellow.id}</p>
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