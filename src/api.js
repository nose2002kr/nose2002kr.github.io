import axios from "axios";
import { isAuthenticationValid } from "./context/AuthContext";



//console.log("API: " + process.env.REACT_APP_BASE_API_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    if (isAuthenticationValid())
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

export const run_to_server = async (server, prompt, onmessage = undefined) => {
  return new Promise((resolve, reject) => {
    if (!isAuthenticationValid()) {
      reject({code:1003});
      return;
    }
  
    const socket = new WebSocket(`${process.env.REACT_APP_BASE_API_URL}/server/${server}/run?token=${localStorage.getItem('access_token')}`);
    socket.onmessage = onmessage
    socket.onopen = () => socket.send(prompt);
    socket.onclose = (e) => e.code === 1000 ? resolve() : reject(e)
    socket.onerror = (err) => reject(err);
  });
}

export const turn_off_server = async (server) => {
  if (!isAuthenticationValid()) {
    return new Promise((_, reject) => reject({code:403}));
  }

  const response = await apiClient.get('/server/'+server+'/turn_off');
  return response.data;
}


