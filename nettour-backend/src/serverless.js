// import serverless from 'serverless-http';
// import app from './index';

const serverless = require('serverless-http');
const app = require('./index');

export const handler = serverless(app);