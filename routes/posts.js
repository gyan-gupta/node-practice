const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');

router.get('/', PostController.getPosts);

// Create post
router.post('/',PostController.createPost);

// Find specific post
router.get('/:postId', PostController.getPost);

// Delete
router.delete('/:postId', PostController.deletePost);

//Update
router.patch('/:postId', PostController.updatePost);


module.exports = router;