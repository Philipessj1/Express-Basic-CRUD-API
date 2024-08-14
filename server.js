import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});