import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/postController.js';

const router = express.Router();

// GET Routes
// Get all the posts
router.get('/', getAllPosts);

// Get single post by id
router.get('/:id', getPostById);

// POST Routes
router.post('/', createPost);

// PUT Routes
router.put('/:id', updatePost);

// DELETE Routes
router.delete('/:id', deletePost);

export default router;
