import axios from "axios";

const baseUrl = "/api/notes";
let config = null;

const setAuthorizationWithToken = (newToken) => {
  config = {
    headers: { Authorization: `Bearer ${newToken}` },
  };
};

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = async (newNote) => {
  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const update = async (id, newNote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newNote, config);
  return response.data;
};

export default { getAll, create, update, setAuthorizationWithToken };
