import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:4000';  
  return 'https://api.nettour.ml';
})();

const client = axios.create({
  baseURL,
  withCredentials: true,
});
//withCredentials: process.env.NODE_ENV === 'development' ? false : true
export default client;