import { handleLimit, handleFindPostById } from '../utils/index.js';

let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
];

//  @desc   Get all Posts
//  @route  GET /api/posts

const getAllPosts = (req, res, next) => {

    let data = posts;
    if (req.query.limit) data = handleLimit(req, res, posts);

    res.json(data);
}

//  @desc   Get single Post by id
//  @route  GET /api/posts/:id
const getPostById = (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);

    if (!post) {

        const error = new Error(`The post with id of ${id} not found!`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
}

//  @desc   Create a Post
//  @route  POST /api/posts
const createPost = (req, res, next) => {

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
}

//  @desc   Update a Post by id
//  @route  PUT /api/posts/:id
const updatePost = (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);
    if (!post) {

        const error = new Error(`Post not found!`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
}

//  @desc   Delete a Post by id
//  @route  DELETE /api/posts/:id
const deletePost = (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = handleFindPostById(posts, id);
    if (!post) {

        const error = new Error(`Post not found!`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);
}

export {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
