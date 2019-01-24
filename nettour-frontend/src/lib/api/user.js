import axios from 'lib/client';

export const getUserInfo = (username) => axios.get(`/api/users/${username}`);