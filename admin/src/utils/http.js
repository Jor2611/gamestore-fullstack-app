import axiosInstance from './axiosInstance';
import { eventEmitter } from './eventEmitter';

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if(error.response.status === 401){
        error.response.data.msg = 'Session Expired';
        eventEmitter.emit('unauthorized');
      }

      error.msg = error.response ? error.response.data.msg : error.message;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

const BACKEND_URL = 'http://localhost:4000';

export async function adminSignIn(data){
  try{
    const response = await axiosInstance.post(`${BACKEND_URL}/account/basement/token`, data);
    return response.data;
  }catch(err){
    console.log(err);
    err.msg = err.response.data.msg || err.message; 
    throw err;
  }
}

export async function checkToken(token){
  try{
    const response = await axiosInstance.get(`${BACKEND_URL}/account/checkToken?token=Bearer ${token}`);
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}