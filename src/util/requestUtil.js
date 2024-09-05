import axios from "axios";

// eslint-disable-next-line no-undef
const apiUrl = import.meta.env.BASE_URL

const request = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
    }
});

const post = async (url, data) => {
    //get cookies from browser
    const token = localStorage.getItem("token");
    if (token) {
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return await request.post(url, data);
};

const get = async (url) => {
    //get cookies from browser
    const token = localStorage.getItem("token");
    if (token) {
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return await request.get(url);
};

const deleteR = async (url) => {
    //get cookies from browser
    const token = localStorage.getItem("token");
    if (token) {
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return await request.delete(url);
};

export {request, post, get, deleteR};
