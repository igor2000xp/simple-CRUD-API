import http from 'http';
import dotenv from 'dotenv';
import cluster from 'cluster';
import * as os from 'os';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/userControllers.js';
import { ROUTE_IS_WRONG } from './constants/errors-const.js';

dotenv.config();

const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary process pid ${process.pid}`);
//   for (let i = 0; i < numCPUs; i += 1) {
//     cluster.fork();
//
//     // cluster.on('exit', (worker) => {
//     //   console.log(`Worker with pid ${worker.process.pid} is died`);
//     //   cluster.fork();
//     // })
//   }
// }

export const index = http.createServer((req, res) => {
  const userId = req.url.split('/')[3] ? req.url.split('/')[3] : '';

  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (userId && req.method === 'GET') {
    getUser(req, res, userId);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else  if (userId && req.method === 'PUT') {
    updateUser(req, res, userId);
  } else if (userId && req.method === 'DELETE') {
    deleteUser(req, res, userId);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ERROR: ROUTE_IS_WRONG }));
    console.log(ROUTE_IS_WRONG);
  }
});

const PORT =  process.env.PORT || 3000;
index.listen(PORT, () => console.log(`Server running on port ${PORT} from .env`));
