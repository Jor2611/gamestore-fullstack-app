import axios from 'axios'
import baseApi from './baseApi';

const instanceParams = {
  baseURL: `${process.env.REACT_APP_BACKEND_API_URI}/game` 
};

const APIInstance = axios.create(instanceParams);
const api = baseApi(APIInstance);

export const fetchGameRows = (page,size) => 
  api.get('', { params: { page, size }, headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
  .then((res) => res.data);

export const fetchGame = (id) => 
  api.get(`/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
  .then((res) => res.data);

export const createGame = (data) => 
  api.post('', { ...data }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
  .then((res) => res.data);

export const updateGame = (id, data) => 
  api.patch(`/${id}`, { ...data }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
  .then((res) => res.data);

export const deleteGame = (id) => 
  api.delete(`/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
  .then((res) => res.data);
