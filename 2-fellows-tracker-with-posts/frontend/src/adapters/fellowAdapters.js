import fetchData from '../utils/fetchData';

export const getFellows = async () => {
  return await fetchData(`/api/fellows/`)
}

export const getFellowById = async (fellowId) => {
  return await fetchData(`/api/fellows/${fellowId}`)
}

export const createFellow = async (fellowName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName })
  }
  return await fetchData(`/api/fellows/`, options);
}

export const changeFellowName = async (fellowId, newFellowName) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ fellowName: newFellowName })
  }
  return await fetchData(`/api/fellows/${fellowId}`, options)
}

export const deleteFellow = async (fellowId) => {
  const options = {
    method: "DELETE"
  }
  await fetchData(`/api/fellows/${fellowId}`, options);
}