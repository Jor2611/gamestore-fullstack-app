import axios from 'axios'
import baseApi from "./baseApi";

const instanceParams = {
  baseURL: `${process.env.REACT_APP_BACKEND_API_URI}/account` 
};

const APIInstance = axios.create(instanceParams);

const api = baseApi(APIInstance);

export const adminSignIn = (data, opts = {}) => 
  api.post("/basement/token", { ...data } , opts)
  .then((res) => res.data);

export const checkToken = (token) => 
  api.get("/checkToken", { params: { token: `Bearer ${localStorage.getItem("admin_token")}` } })
  .then((res) => res.data);
