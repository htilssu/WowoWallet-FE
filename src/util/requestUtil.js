import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

const post = async (url, data) => {
  try {
    return await request.post(url, data);
  }
  catch (e) {
    return Promise.reject(new Error(e.message));
  }
};

const get = async (url) => {
  return await request.get(url);
};

const deleteRequest = async (url) => {
  return await request.delete(url);
};

export {request, post, get, deleteRequest};
