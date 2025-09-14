import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const notFoundHandler = (req, res) => {
    if (req.accepts('json')) {
        res.status(404).json({ error: 'Not Found' });
    } else {
        res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
    }
};

export const errorHandler = (err, req, res, next) => {
    console.error('Server error:', err.stack);
    if (req.accepts('json')) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    } else {
        res.status(500).sendFile(path.join(__dirname, '../public', '500.html'));
    }
};