import axios from 'axios'
import baseApi from "./baseApi";

const instanceParams = {
  baseURL: process.env.REACT_APP_RAWGIO_API_URL,
  params: {
    key: process.env.REACT_APP_RAWGIO_API_KEY,
  },
};

const APIInstance = axios.create(instanceParams);
const api = baseApi(APIInstance);

export const findMatchedGames = (query) => 
  api.get("/games", { params: { search: query } })
  .then((res) => res.data.results);

