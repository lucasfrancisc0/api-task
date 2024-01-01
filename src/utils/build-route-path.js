export function buildRoutePath(path){
  const routeParamatersRegex = /:([a-zA-z]+)/g
  const pathWithParams = path.replaceAll(routeParamatersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex

};
