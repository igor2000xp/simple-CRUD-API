import http from 'http';
import { getUsers, getUser, createUser } from './controllers/userControllers.js';
// import * as module from 'module';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const require = module.createRequire(import.meta.url);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const JSON_P = path.resolve( __dirname, 'data/users.json');

// const dataA = require(JSON_P);

export const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<h1>Hello World</h1>');
  // res.end();
  const userId = req.url.split('/')[3] ? req.url.split('/')[3] : '';

  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (userId && req.method === 'GET') {
    getUser(req, res, userId);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route nod Found' }));
  }


});

const PORT =  process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
