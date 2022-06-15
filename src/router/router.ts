// import { EventEmitter } from 'events';

// const emitter = new EventEmitter();

export interface IRouter {
  'users'?:IRouterPath // {  // '/user'
    // 'GET': () => void,
    // 'POST': () => void,
    // 'PUT': () => void,
    // 'DELETE': () => void,
  // }
}
interface IRouterPath {
  'GET': () => void,
  'POST': () => void,
  'PUT': () => void,
  'DELETE': () => void,

}

// export interface IResponse {
//   response: string,
// }
//
// export interface IRequest {
//   request: string,
// }


export class Router {
  endpoints:IRouter[];

  constructor() {
    this.endpoints = [];
  }

  request(method = 'GET', routeP:string, handler:()=>{}):void {
    if (!this.endpoints[`rou`]) {
      this.endpoints[routeP] = {};
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

  get(path:string, handler:(request:void, response:string) =>  {
    this.request('GET', path, handler);
  }
  post(path:string, handler:()=>{}):void {
    this.request('POST', path, handler);
  }
  put(path:string, handler:()=>{}):void {
    this.request('PUT', path, handler);
  }
  delete(path:string, handler:()=>{}):void {
    this.request('DELETE', path, handler);
  }


}
