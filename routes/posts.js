import express from 'express';
import { handleLimit } from '../utils/index.js';

const router = express.Router();

let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
];

// Get all the posts

router.get('/', (req, res) => {

    let data = posts;
    if (req.query.limit) data = handleLimit(req, res, posts);

    res.json(data);
});

// Get single post by id

router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {

        return res
            .status(404)
            .json({ message: `The post with id of ${id} not found!` });
    }

    res.status(200).json(post);
});

export default router;
