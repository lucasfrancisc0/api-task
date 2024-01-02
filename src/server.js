import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


const server = http.createServer(async(req, res) => {
  await json(req, res);

  const { method , url } = req;

  const route = routes.find( route => {
    return route.method === method && route.path.test(url)
  });

  if(route){
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Page not found');

});

const PORT = 3333;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
