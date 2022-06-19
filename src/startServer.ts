import * as http from 'http';
import { Router } from './router/router.js';
import { EventEmitter } from 'events'

const PORT = process.env.PORT || 3000;

const router = new Router();
const emitter = new EventEmitter();

router.get('/users', (request, response) => {
  response.end('YOU SEND REQUEST TO /USER');
})

router.post('/users', (request, response) => {
  response.end('YOU HAVE CREATED A USER');
})

router.get('/', (request, response) => {
  response.end('YOU SEND REQUEST TO / = HELLO WORLD');
})

const server = http.createServer((request, response) => {
  // response.writeHead(200, {
  //   'Content-type': 'text/html; charset=utf-8'
  // });
  // response.writeHead(200, {
  //   'Content-type': 'application/json'
  // })
  // if (request.url === '/users') {
  //   return response.end(JSON.stringify([
  //     { id:1, name: 'Igor', }
  //   ]));
  // }
  emitter.emit(`[${request.url}]: [${request.method}]`, request, response)

  response.end(request.url);
  // response.end('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
})
