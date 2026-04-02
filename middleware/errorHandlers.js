import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const notFoundHandler = (req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        path: req.path,
        method: req.method
    });
};

export const errorHandler = (err, req, res, next) => {
    console.error('Server error:', err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ 
        error: 'Internal Server Error', 
        message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message 
    });
};
