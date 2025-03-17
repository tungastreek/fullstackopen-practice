import axios from "axios";

const baseUrl = "/api/notes";
let token = null;

const setToken = (newToken) => (token = newToken);

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = async (newNote) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const update = (id, newNote) =>
  axios.put(`${baseUrl}/${id}`, newNote).then((response) => response.data);

export default { getAll, create, update, setToken };
