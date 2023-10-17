import { apiAuthenticated } from '../lib/axios';

const Reducer = (apiUrl) => {
  const get = () => {
    return apiAuthenticated.get(apiUrl)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const getById = (id) => {
    return apiAuthenticated.get(`${apiUrl}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const remove = (id) => {
    return apiAuthenticated.delete(`${apiUrl}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const post = (body) => {
    return apiAuthenticated.post(apiUrl, body)
      .then((response) => response.data);
  };

  const patch = (id, body) => {
    return apiAuthenticated.patch(`${apiUrl}/${id}`, body)
      .then((response) => response.data);
  };

  const put = (id, body) => {
    return apiAuthenticated.put(`${apiUrl}/${id}`, body)
      .then((response) => response.data);
  };

  return { get, getById, remove, post, patch, put };
};

export default Reducer;
