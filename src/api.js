import axios from "axios";
import { is_authentication_valid } from "./context/AuthContext";



//console.log("API: " + process.env.REACT_APP_BASE_API_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    if (is_authentication_valid())
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export const post_login = async (username, password) => {
  const response = await apiClient.post('/login',{
      username: username,
      password: password
  });
  return response.data;
};

export const get_videos = async () => {
  const response = await apiClient.get('/video');
  return response.data;
};

export const get_servers = async () => {
  const response = await apiClient.get('/servers');
  return response.data;
};

export const prompt_to_servers = async (server, prompt, onmessage = undefined) => {
  return new Promise((resolve, reject) => {
    if (!is_authentication_valid()) {
      reject('Login first');
      return;
    }
  
    const socket = new WebSocket(`${process.env.REACT_APP_BASE_API_URL}/server/${server}/run?token=${localStorage.getItem('access_token')}`);
    socket.onmessage = onmessage
    socket.onopen = () => socket.send(prompt);
    socket.onclose = (e) => e.code === 1000 ? resolve() : reject(e)
    socket.onerror = (err) => reject(err);
  });
}

