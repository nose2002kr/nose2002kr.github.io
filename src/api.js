import axios from "axios";

//console.log("API: " + process.env.REACT_APP_BASE_API_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
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
    const socket = new WebSocket(`${process.env.REACT_APP_BASE_API_URL}/server/${server}/prompt?token=hehe`);
    socket.onmessage = onmessage
    socket.onopen = () => socket.send("Hello from client");
    socket.onclose = () => resolve();
    socket.onerror = (err) => reject(err);
  });
}

