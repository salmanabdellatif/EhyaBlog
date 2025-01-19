import express from 'express'
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  deleteUser,
} from '../controllers/userControllers.js'
import auth from '../middleware/authentication.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', auth, getAllUsers)
router.get('/user', auth, getUser)
router.put('/updateUser/:id', auth, updateUser)
router.put('/updateUserAvatar', auth, updateUserAvatar)
router.delete('/:id', auth, deleteUser)

export default router
