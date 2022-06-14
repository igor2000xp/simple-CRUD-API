import * as http from 'http';

const PORT = 3000;

http.createServer((request, response) => {
  response.end('It is my server');
}).listen(PORT);
