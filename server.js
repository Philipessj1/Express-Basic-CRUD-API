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

const handleLimit = (req, res, data) => {

    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        
        return data.slice(0, limit);
    } else {

        return data;
    }
}

// Get all the posts

app.get('/api/posts', (req, res) => {

    const data = handleLimit(req, res, posts);

    res.json(data);
});

// Get single post by id

app.get('/api/posts/:id', (req, res) => {

    const id = parseInt(req.params.id);
    res.json(posts.filter(post => post.id === id));
});

app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});