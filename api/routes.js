import express from 'express';
import { fileURLToPath } from 'url';


app.use(express.json());

// Directory and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})