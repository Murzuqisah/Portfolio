import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';



const app = express();

// Directory and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse JSON and     url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const htmlFiles = ['contact', 'certifications', 'socials', 'blogs'];

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to render HTML files
htmlFiles.forEach(file => {
    app.get(`/${file}`, (req, res) => {
        const filePath = path.join(__dirname, 'public', `${file}.html`);
        res.sendFile(filePath, err => {
            if (err) {
                console.error(`Error serving ${file}.html:`, err);
                res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
            }
        });
    });
});

// server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})