import express from 'express'
const router = express.Router()
import {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
  getSingleCategory,
} from '../controllers/postCategoriesController.js'
import auth from '../middleware/authentication.js'

router.route('/').post(auth, createPostCategory).get(getAllPostCategories)
router
  .route('/:categoryId')
  .get(getSingleCategory)
  .put(auth, updatePostCategory)
  .delete(auth, deletePostCategory)

export default router
