import api from './config';

export const loadUsersApi = () => api.get(`/users`);

export const loadUserApi = (id) => api.get(`/users/${id}`);