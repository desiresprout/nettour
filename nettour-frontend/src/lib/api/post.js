//import axios from 'axios';
import axios from 'lib/client';

export const postlists = () => axios.get(`/api/posts`);
export const next = (url) => axios.get(url);
export const writepost = ({title, content, slug, imageurl}) => axios.post(`/api/posts`, { title, content, slug, imageurl });
export const readpost = ({name, urlslug}) => axios.get(`/api/posts/post/${name}/${urlslug}`);
export const writecomment = ({postid, currentusername, comment}) => axios.post(`/api/posts/post/${postid}/comments`, { currentusername, comment });
export const editcomment = ({ commentid, comment}) => axios.patch('/api/posts/post/comments', {  commentid, comment});
export const getpost = (id) => axios.get(`/api/posts/post/${id}`);
export const editpost = ({id, title, content, slug, imagepath}) => axios.patch(`/api/posts/post/edit`, { id, title, content, slug, imagepath});
export const removepost = (id) => axios.delete(`/api/posts/post/${id}`);
export const removecomment = (commentid) => axios.patch(`/api/posts/delete/comment`, { commentid });

export const createurl = ({ filename, type }) => axios.post(`/api/posts/createurl`, { filename, type });