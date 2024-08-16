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
router.get('/', (req, res, next) => {

    let data = posts;
    if (req.query.limit) data = handleLimit(req, res, posts);

    res.json(data);
});

// Get single post by id
router.get('/:id', (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);

    if (!post) {

        const error = new Error(`The post with id of ${id} not found!`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
});

// POST Routes
router.post('/', (req, res, next) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if (!newPost.title) {

        const error = new Error(`Please include a title!`);
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

// PUT Routes
router.put('/:id', (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);
    if (!post) {

        const error = new Error(`Post not found!`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
});

// DELETE Routes
router.delete('/:id', (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);
    if (!post) {

        const error = new Error(`Post not found!`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);
});

export default router;
