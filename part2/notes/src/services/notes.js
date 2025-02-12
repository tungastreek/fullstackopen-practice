import axios from 'axios';
const baseUrl = '/api/notes';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = (newNote) => axios.post(baseUrl, newNote).then(response => response.data);

const update = (id, newNote) => axios.put(`${baseUrl}/${id}`, newNote).then(response => response.data);

export default { getAll, create, update };
