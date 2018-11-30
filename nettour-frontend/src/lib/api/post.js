import axios from 'axios';

const server = 'http://localhost:4000'

export const fulllist = () => axios.get(`/api/posts`);
export const next = (url) => axios.get(url);
export const writepost = ({title, content, slug}) => axios.post(`api/posts`, { title, content, slug });
export const readpost = ({name, urlslug}) => axios.get(`/api/posts/post/${name}/${urlslug}`);
export const writecomment = ({postid, currentusername, comment}) => axios.post(`/api/posts/post/${postid}/comments`, { currentusername, comment });
export const editcomment = ({ commentid, comment}) => axios.patch('/api/posts/post/comments', {  commentid, comment});
export const getpost = (id) => axios.get(`/api/posts/post/${id}`);
export const editpost = ({id, title, content, slug}) => axios.patch(`/api/posts/post/edit`, { id, title, content, slug});

export const removepost = (id) => axios.delete(`/api/posts/post/${id}`);
export const removecomment = (commentid) => axios.patch(`/api/posts/delete/comment`, { commentid });