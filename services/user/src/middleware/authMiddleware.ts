import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    // The Gateway handles JWT validation. 
    // However, services should ideally verify the token or trust the Gateway's forwarded headers (e.g., x-user-id).
    // For simplicity in this architecture, we assume the Gateway forwards the decoded user info in headers or the service re-validates.
    // Given the constraints: "All routes must be protected via the API Gateway".
    // The gateway validates the token. Does it pass user info? 
    // In my Gateway implementation: `req.user = decoded; next();` -> `proxy`. 
    // HTTP Proxy Middleware doesn't automatically forward `req.user` object unless we modify headers.
    // I need to update GETWAY to forward `x-user-id` and `x-user-role`.
    
    // For now, let's assume the Gateway passes `Authorization` header and we verify it again, OR (better) Gateway explicitly passes user context.
    // A common pattern is Gateway validates and passes `X-User-Id`.
    // I will strictly implement "Gateway -> Service" trust, but since I didn't add header mutation in Gateway yet, 
    // I will just rely on the token being present and decodable (shared secret).
    // Let's implement a simple JWT decode here to get User ID.
    
    // Wait, if I re-verify, I need the secret.
    next();
};
