import { Router } from 'express'
const router = Router()
import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
} from '../controllers/commentControllers.js'
import auth from '../middleware/authentication.js'

router.route('/').get(auth, getAllComments).post(auth, createComment)
router.route('/:commentId').put(auth, updateComment).delete(auth, deleteComment)

export default router
