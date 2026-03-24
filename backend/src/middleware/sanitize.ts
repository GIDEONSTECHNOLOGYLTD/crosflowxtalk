import { Request, Response, NextFunction } from 'express';
import mongoSanitize from 'express-mongo-sanitize';

export const sanitizeInput = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized potentially malicious input: ${key}`);
  },
});

export const sanitizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);
  
  res.json = function(data: any) {
    if (data && typeof data === 'object') {
      const sanitized = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key === 'password' || key === 'secret' || key === 'token' || key === 'apiKey') {
          return undefined;
        }
        return value;
      }));
      return originalJson(sanitized);
    }
    return originalJson(data);
  };
  
  next();
};

export const secureHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.removeHeader('X-Powered-By');
  next();
};
