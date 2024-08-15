import express from 'express';
import { handleLimit, handleFindPostById } from '../utils/index.js';

const router = express.Router();

let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
];

// GET Routes
// Get all the posts
router.get('/', (req, res) => {

    let data = posts;
    if (req.query.limit) data = handleLimit(req, res, posts);

    res.json(data);
});

// Get single post by id
router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);

    if (!post) {

        return res
            .status(404)
            .json({ message: `The post with id of ${id} not found!` });
    }

    res.status(200).json(post);
});

// POST Routes
router.post('/', (req, res) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if (!newPost.title) {
        return res
            .status(400)
            .json({ message: 'Please include a title!' })
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

// PUT Routes
router.put('/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);
    if (!post) {
        return res
            .status(404)
            .json({ message: 'Post not found!' })
    }
    post.title = req.body.title;
    res.status(200).json(posts);
});

export default router;
