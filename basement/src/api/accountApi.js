import axios from 'axios'
import baseApi from "./baseApi";
import { eventEmitter } from '../utils/eventEmitter';

const instanceParams = {
  baseURL: `${process.env.REACT_APP_BACKEND_API_URI}/account` 
};

const APIInstance = axios.create(instanceParams);

// APIInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       if(error.response.status === 401){
//         error.response.data.msg = 'SESSION_EXPIRED';
//         eventEmitter.emit('unauthorized');
//       }

//       error.msg = error.response ? error.response.data.msg : error.message;
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Error setting up request:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

const api = baseApi(APIInstance);

export const adminSignIn = (data) => 
  api.post("/basement/token", { ...data } ,{})
  .then((res) => res.data);

export const checkToken = (token) => 
  api.get("/checkToken", { params: { token: `Bearer ${localStorage.getItem("admin_token")}` } })
  .then((res) => res.data);
