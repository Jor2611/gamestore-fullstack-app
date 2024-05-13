// http.js
import axios from 'axios';

const { REACT_APP_BACKEND_API_URI, REACT_APP_RAWGIO_API_URL, REACT_APP_RAWGIO_API_KEY } = process.env;

console.log(REACT_APP_BACKEND_API_URI)

const backendAPI = axios.create({
  baseURL: REACT_APP_BACKEND_API_URI
});

const rawgIOAPI = axios.create({
  baseURL: REACT_APP_RAWGIO_API_URL,
  params: {
    key: REACT_APP_RAWGIO_API_KEY,
  },
});

export { backendAPI, rawgIOAPI };
