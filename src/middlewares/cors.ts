import { Request, Response, NextFunction } from 'express';

const allowedCors: string[] = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  PUT = 'PUT',
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers || {};
  const { method } = req;
  const requestHeaders: string | undefined = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS: HttpMethod[] = [
    HttpMethod.GET,
    HttpMethod.HEAD,
    HttpMethod.PUT,
    HttpMethod.PATCH,
    HttpMethod.POST,
    HttpMethod.DELETE,
  ];

  if (origin && allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
