import Post from '../models/post.js'
import Comment from '../models/comment.js'
import { v4 as uuidv4 } from 'uuid'
import { uploadPicture } from '../middleware/uploadPicture.js'
import { fileRemover } from '../utils/fileRemover.js'

const createPost = async (req, res, next) => {
  try {
    const upload = uploadPicture.single('postPhoto')
    upload(req, res, async function (err) {
      try {
        if (err) {
          return res
            .status(500)
            .json('An unknown error occured when uploading ' + err.message)
        }
        if (!req.file) {
          return res.status(405).json('please provide photo')
        }
        const { title, caption, content, body, tags, categories } = req.body
        const post = await Post.create({
          title,
          caption,
          content,
          slug: uuidv4(),
          body,
          tags,
          categories,
          photo: req.file.filename,
          user: req.user._id,
        })
        return res.json(post)
      } catch (error) {
        next(error)
      }
    })
  } catch (error) {
    next(error)
  }
}
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    if (!post) {
      return res.status(404).json('post not found')
    }
    const upload = uploadPicture.single('postPhoto')
    upload(req, res, async function (err) {
      if (err) {
        return res
          .status(500)
          .json('An unknown error occured when uploading ' + err.message)
      }
      const { title, caption, content } = req.body
      post.title = title || post.title
      post.caption = caption || post.caption
      post.content = content || post.content
      if (req.file) {
        post.photo = req.file.filename
        fileRemover(post.photo)
      }
      const updatedPost = await post.save()
      return res.json(updatedPost)
    })
  } catch (error) {
    next(error)
  }
}
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug })
    if (!post) {
      return res.status(404).json('post not fount')
    }
    fileRemover(post.photo)
    await Comment.deleteMany({ post: post._id })
    return res.status(200).json('post successfully deleted')
  } catch (error) {
    next(error)
  }
}
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: 'user',
        select: ['avatar', 'name'],
      },
      {
        path: 'categories',
        select: ['title'],
      },
      {
        path: 'comments',
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: 'user',
            select: ['avatar', 'name'],
          },
          {
            path: 'replies',
            match: {
              check: true,
            },
            populate: [
              {
                path: 'user',
                select: ['avatar', 'name'],
              },
            ],
          },
        ],
      },
    ])
    if (!post) {
      return res.status(404).json('post not found')
    }
    return res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}
const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.keywords
    let where = {}
    if (filter) {
      where.title = { $regex: filter, $options: 'i' }
    }
    let query = Post.find(where)
    const page = parseInt(req.query.page) || 1 // current page
    const pageSize = parseInt(req.query.limit) || 10 // document per page
    const skip = (page - 1) * pageSize // documents to be skipped
    const total = await Post.find(where).countDocuments() // total documents
    const pages = Math.ceil(total / pageSize) // pages number

    res.header({
      'x-filter': filter,
      'x-totalcount': JSON.stringify(total),
      'x-currentpage': JSON.stringify(page),
      'x-pagesize': JSON.stringify(pageSize),
      'x-totalpagecount': JSON.stringify(pages),
    })

    if (page > pages) {
      return res.json([])
    }
    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: 'user',
          select: ['avatar', 'name', 'verified'],
        },
        {
          path: 'categories',
          select: ['title'],
        },
      ])
      .sort({ updatedAt: 'desc' })
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

export { createPost, updatePost, deletePost, getPost, getAllPosts }
