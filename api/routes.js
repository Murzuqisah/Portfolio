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


// server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})