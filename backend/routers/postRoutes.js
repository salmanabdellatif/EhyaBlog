import express from 'express'
const router = express.Router()

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from '../controllers/postControllers.js'
import auth from '../middleware/authentication.js'

router.route('/').post(auth, createPost).get(getAllPosts)
router
  .route('/:slug')
  .put(auth, updatePost)
  .delete(auth, deletePost)
  .get(getPost)

export default router
