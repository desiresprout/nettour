
import axios from 'lib/client';

export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkUsernameExists = (username) => axios.get('/api/auth/exists/username/'+ username); 

export const localRegister = ({email, username, password}) => axios.post('/api/auth/auth-email', { email, username, password });
export const localLogin = ({email, password}) => axios.post('http://localhost:4000/api/auth/login/local', { email, password });

export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');

export const socialLogin = ({provider, accessToken}) => axios.post(`/api/auth/login/${provider}`, { accessToken });
export const socialRegister = ({provider, accessToken, username}) => axios.post(`/api/auth/register/${provider}`, { accessToken, username });

export const getCode = ({ email, code }) => axios.get(`/api/auth/getcode?email=${email}&code=${code}`);
export const resetCode = ( email ) => axios.get(`/api/auth/resetcode/` + email);
