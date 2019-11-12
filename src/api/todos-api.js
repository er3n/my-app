import axios from 'axios';

const baseUrl = 'https://simplistic-kick.glitch.me/api';

export const getTodos = () => {
  return axios.get(`${baseUrl}/todos`);
};

export const deleteTodo = id => {
  return axios.delete(`${baseUrl}/todos/${id}`);
};

export const addTodo = todo => {
  return axios.put(`${baseUrl}/todos`, todo);
};

export const completeTodo = id => {
  return axios.post(`${baseUrl}/todos/${id}/complete`);
};

export const redoTodo = id => {
  return axios.post(`${baseUrl}/todos/${id}/redo`);
};
