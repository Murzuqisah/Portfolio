import helmet from 'helmet';
import path from 'path';

// Path traversal protection middleware
export const pathTraversalProtection = (req, res, next) => {
    const normalizedPath = path.normalize(req.path);
    if (normalizedPath.includes('..') || normalizedPath.includes('\\')) {
        return res.status(403).json({ error: 'Path traversal attempt blocked' });
    }
    next();
};

export const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://ajax.googleapis.com", "https://cdnjs.cloudflare.com", "https://kit.fontawesome.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://cdn.jsdelivr.net", "https://ka-f.fontawesome.com", "https://api.github.com", "https://raw.githubusercontent.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
});