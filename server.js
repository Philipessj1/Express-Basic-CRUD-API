import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

const PORT = process.env.PORT;

//  app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
];

app.get('/api/posts', (req, res) => {

    res.json(posts);
})


app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});