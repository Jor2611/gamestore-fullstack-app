import { backendAPI, rawgIOAPI } from './axiosInstances';
import { eventEmitter } from './eventEmitter';

backendAPI.interceptors.response.use(
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


/**
 * BACKEND endpoints
 */

export async function adminSignIn(data){
  try{
    const response = await backendAPI.post(`/account/basement/token`, data);
    return response.data;
  }catch(err){
    console.log(err);
    err.msg = err.response.data.msg || err.message; 
    throw err;
  }
}


export async function checkToken(token){
  try{
    const response = await backendAPI.get(`/account/checkToken?token=Bearer ${token}`);
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export async function fetchGame(id){
  try{
    const response = await backendAPI.get(`/game/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }  
}

export async function fetchGames(){
  try{
    const response = await backendAPI.get(`/game`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }  
}

export async function fetchGameRows(page, size){
  try{
    const response = await backendAPI.get(`/game?page=${page}&size=${size}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }  
}

export async function createGame(data){
  try{
    const response = await backendAPI.post(`/game`, { ...data }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export async function updateGame(id,data){
  try{
    const response = await backendAPI.patch(`/game/${id}`, { ...data }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export async function deleteGame(id){
  try{
    const response = await backendAPI.delete(`/game/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export async function loadGenres(){
  try{
    const response = await backendAPI.get(`/genre`);
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}


export async function loadPlatforms(){
  try{
    const response = await backendAPI.get(`/platform`);
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}


/**
 * RAWG.io endpoints
 */

export async function findMatchedGames(query){
  try{
    const response = await rawgIOAPI.get(`/games?search=${query}`);
    return response.data.results;
  }catch(err){
    console.log(err);
    throw err;
  }
}


// export async function fetchPlatforms(query){
//   try{
//     const response = await rawgIOAPI.get(`/platforms`);
//     console.log(response.data.results)
//     return response.data.results;
//   }catch(err){
//     console.log(err);
//     throw err;
//   }
// }

