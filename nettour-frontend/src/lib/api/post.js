import axios from 'axios';

const server = 'http://localhost:4000'

export const fulllist = () => axios.get(`/api/posts`);
export const next = (url) => axios.get(url);
export const writepost = ({title, content}) => axios.post(`api/posts`, { title, content });
export const readpost = ({name, urlslug}) => axios.get(`/api/posts/post/${name}/${urlslug}`);

//export const readcomment = (postid) => axios.get(`/api/posts/${postid}/comments`);
export const writecomment = ({postid, comment}) => axios.post(`api/posts/${postid}/comments`, { comment })
