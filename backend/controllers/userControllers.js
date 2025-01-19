import User from '../models/user.js'
import Post from '../models/post.js'
import Comment from '../models/comment.js'
import { uploadPicture } from '../middleware/uploadPicture.js'
import { fileRemover } from '../utils/fileRemover.js'

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.createJWT(),
    })
  } catch (error) {
    next(error)
  }
}
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email not found')
    }
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password')
    }
    return res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.createJWT(),
    })
  } catch (error) {
    next(error)
  }
}
const getAllUsers = async (req, res, next) => {
  try {
    // get search keyword from query
    const filter = req.query.keywords
    let where = {}
    // set a mongodb query object
    if (filter) {
      // search users with email & name
      where.$or = [
        { email: { $regex: filter, $options: 'i' } },
        { name: { $regex: filter, $options: 'i' } },
      ]
    }
    let query = User.find(where)

    const page = parseInt(req.query.page) || 1 // current page number
    const pageSize = parseInt(req.query.limit) || 10 // user per page
    const skip = (page - 1) * pageSize // documents to skip
    const total = await User.find(where).countDocuments() // total users
    const pages = Math.ceil(total / pageSize) // total page number

    res.header({
      'x-filter': filter,
      'x-totalcount': JSON.stringify(total),
      'x-currentpage': JSON.stringify(page),
      'x-pagesize': JSON.stringify(pageSize),
      'x-totalpagecount': JSON.stringify(pages),
    })

    if (page > pages) {
      // docs count = 0
      return res.json([])
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: 'desc' })

    return res.json(result)
  } catch (error) {
    next()
  }
}
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json('User not found')
    }
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
    })
  } catch (error) {
    next(error)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const userIdToUpdate = req.params.id
    let userId = req.user._id

    // admins have full control, and each user can update their own profile
    if (!req.user.admin && userId != userIdToUpdate) {
      return res.status(403).json('Forbidden resource')
    }

    let user = await User.findById(userIdToUpdate)

    if (!user) {
      return res.status(404).json('User not found')
    }
    // only admins can change the admin field
    if (typeof req.body.admin !== 'undefined' && req.user.admin) {
      user.admin = req.body.admin
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password

    const updatedUser = await user.save()

    const responseData = {
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      verified: updatedUser.verified,
      admin: updatedUser.admin,
      token: await updatedUser.createJWT(),
    }
    return res.status(200).json(responseData)
  } catch (error) {
    next(error)
  }
}
const updateUserAvatar = async (req, res, next) => {
  try {
    const upload = uploadPicture.single('profilePicture')

    upload(req, res, async function (err) {
      if (err) {
        return res
          .status(500)
          .json('An unknown error occured when uploading ' + err.message)
      }
      // every thing went well
      if (req.file) {
        // if there is a picture
        let filename
        let updatedUser = await User.findById(req.user._id)
        filename = updatedUser.avatar
        if (filename) {
          fileRemover(filename)
        }
        updatedUser.avatar = req.file.filename
        await updatedUser.save()
        const responseData = {
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
          token: await updatedUser.createJWT(),
        }
        return res.status(200).json(responseData)
      } else {
        // if there is no picture
        let filename
        let updatedUser = await User.findById(req.user._id)
        filename = updatedUser.avatar
        updatedUser.avatar = ''
        await updatedUser.save()
        fileRemover(filename)

        const responseData = {
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
          token: await updatedUser.createJWT(),
        }
        return res.status(200).json(responseData)
      }
    })
  } catch (error) {
    next(error)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json('user not found')
    }
    const postsToDelete = await Post.find({ user: user._id })
    const postIdsToDelete = postsToDelete.map(post => post._id)
    await Comment.deleteMany({ post: { $in: postIdsToDelete } })
    await Post.deleteMany({ _id: { $in: postIdsToDelete } })
    const deletedUser = await User.findByIdAndDelete(user._id)
    fileRemover(deletedUser.avatar)

    return res.status(200).json({ message: 'user deleted successfully' })
  } catch (error) {
    next(error)
  }
}
export {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  deleteUser,
}
