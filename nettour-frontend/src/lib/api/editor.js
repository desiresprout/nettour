import axios from 'axios';

export const writePost = (title, content, state) => axios.post('/api/posts', { title, content, state });
