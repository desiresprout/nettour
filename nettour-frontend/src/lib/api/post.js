//import axios from 'axios';
import axios from 'lib/client';

//url - "/api/posts/?username=kohahn21&cursor=5c46abdac488371993d64289"


//const next =  `/api/posts/?${username ? `username=${username}&` : ''}cursor=${posts[14]._id}` : null;


export const prefetchpost = (url,user) => axios.get(`${url}` +(user ? `&user=${user}` : '' ) );
export const writepost = ({title, content, slug, imageurl}) => axios.post(`/api/posts`, { title, content, slug, imageurl });
export const readpost = ({name, urlslug}) => axios.get(`/api/posts/post/${name}/${urlslug}`);
export const writecomment = ({postid, currentusername, comment}) => axios.post(`/api/posts/post/${postid}/comments`, { currentusername, comment });
export const editcomment = ({ commentid, comment}) => axios.patch('/api/posts/post/comments', {  commentid, comment});
export const getpost = (id) => axios.get(`/api/posts/post/${id}`);
export const editpost = ({id, title, content, slug, imagepath}) => axios.patch(`/api/posts/post/edit`, { id, title, content, slug, imagepath});
export const removepost = (id) => axios.delete(`/api/posts/post/${id}`);
export const removecomment = (commentid) => axios.patch(`/api/posts/delete/comment`, { commentid });
export const createurl = ({ filename, type }) => axios.post(`/api/posts/createurl`, { filename, type });
export const likePost = (postid) => axios.post(`api/posts/${postid}/likes`);
export const unlikePost = (postid) => axios.delete(`api/posts/${postid}/likes`);


//export const postlists = () => axios.get(`/api/posts`);

export const postlists = (username) => axios.get('/api/posts' + (username ? `?username=${username}&user=true` : ''));





