import express from 'express'
import { createBlog, deleteBlog, getBlogs, likeBlog, updateBlog, getBlog } from '../controllers/blog.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', getBlog)
router.get('/', getBlogs);
router.post('/', auth, createBlog);
router.patch('/:id', auth, updateBlog);
router.patch('/:id/likeBlog',auth, likeBlog);
router.delete('/:id', deleteBlog);

export default router