import axios from 'axios'
import baseApi from "./baseApi";

const instanceParams = {
  baseURL: `${process.env.REACT_APP_BACKEND_API_URI}/` 
};

const APIInstance = axios.create(instanceParams);
const api = baseApi(APIInstance);

export const loadGenres = () => 
  api.get("/genre", {}).then((res) => res.data);

export const loadPlatforms = () => 
  api.get("/platform", {}).then((res) => res.data);
