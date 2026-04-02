// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// For serverless: use a simple pass-through limiter
// In production, consider using external rate limiting service (e.g., Redis)
export const rateLimiter = (req, res, next) => {
    // Disable rate limiting in serverless environment
    // Each function invocation is independent and in-memory storage is not shared
    next();
};

// Optional: Basic rate limiting without memory (can be re-enabled with external store)
// export const rateLimiter = rateLimit({
//     store: new RedisStore(...),  // Requires Redis configuration
//     windowMs: 15 * 60 * 1000,
//     max: 1000,
//     message: 'Too many requests from this IP'
// });

// middleware/cors.js
export const corsMiddleware = (req, res, next) => {
    // Vercel-specific CORS configuration
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-API-Key');
    res.setHeader('Cache-Control', 's-maxage=31536000');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
};
