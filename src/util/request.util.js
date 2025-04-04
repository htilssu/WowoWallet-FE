import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Gửi yêu cầu POST tới API
 * @param {string} url - Đường dẫn API
 * @param {Object} data - Dữ liệu gửi trong body
 * @param {Object} config - Cấu hình bổ sung (params, headers...)
 * @returns {Promise<any>} - Kết quả từ API
 */
const wPost = async (url, data, config = {}) => {
  return (await request.post(url, data, config)).data;
};

const wGet = async (url) => {
  return (await request.get(url)).data;
};

const wDelete = async (url) => {
  return (await request.delete(url)).data;
};

const wPut = async (url, data) => {
  return (await request.put(url, data)).data;
};

export { request, wPost, wGet, wDelete, wPut };
