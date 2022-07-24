import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
   return axios.get(baseUrl).then(response => response.data)
}

const create = (newObj) => {
   return axios.post(baseUrl, newObj).then(response => response.data)
}

const remove = (id) => {
   return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (newObject) => {
   return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(response => response.data)
}

export default { getAll, create, remove, update}