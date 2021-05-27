import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost, commentPost, deleteComment } from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getPosts)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.patch('/:id/comments', auth, commentPost)
router.patch('/:id/comments/:key', auth, deleteComment)
router.delete('/:id', auth,deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router;