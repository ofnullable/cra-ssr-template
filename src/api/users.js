import axios from 'axios';

export const loadUsersApi = () => axios.get(`https://jsonplaceholder.typicode.com/users`);

export const loadUserApi = (id) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);