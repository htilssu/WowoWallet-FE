import axios from 'axios';

// eslint-disable-next-line no-undef
const apiUrl = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

const post = async (url, data) => {
  //get token from browser
  const token = localStorage.getItem('token');
  if (token) {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  try {
    return await request.post(url, data);
  }
  catch (e) {
    console.log(e.message);
    return Promise.reject(new Error(e.message))
  }
};

const get = async (url) => {
  //get cookies from browser
  const token = localStorage.getItem('token');
  if (token) {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return await request.get(url);
};

const deleteRequest = async (url) => {
  //get cookies from browser
  const token = localStorage.getItem('token');
  if (token) {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return await request.delete(url);
};

export {request, post, get, deleteRequest};
