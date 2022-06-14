// import { EventEmitter } from 'events';

// const emitter = new EventEmitter();

export class Router {
  constructor() {
    this.endpoints = {
      // '/users': {
      //   'GET': getHandler,
      //   'POST': postHandler,
      //   'PUT': putHandler,
      //   'DELETE': deleteHandler,
      // }
    }
  }

  request(method = 'GET', routePath, handler, emitter) {
    if (!this.endpoints[routePath]) {
      this.endpoints[routePath] = {};
    }
    // /users [ GET, POST, PUT ]
    const endpoint = this.endpoints[routePath];

    if (endpoint[method]) {
      throw  new Error(`There is the rote ${routePath} in the method [${method}]`)
    }

    endpoint[method] = handler;

    // [path]:[method]  --  [/users]:[get] [/users]:[post]
    // 1:27:40
    // emitter.on(`[${routePath}]:[${method}]`, (req, res) => {
    //   handler(req, res)
    // })
  }

  get(path, handler) {
    this.request('GET', path, handler);
  }
  post(path, handler) {
    this.request('POST', path, handler);
  }
  put(path, handler) {
    this.request('PUT', path, handler);
  }
  delete(path, handler) {
    this.request('DELETE', path, handler);
  }


}
