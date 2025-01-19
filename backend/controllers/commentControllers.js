import Comment from '../models/comment.js'
import Post from '../models/post.js'
const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body
    const post = await Post.findOne({ slug: slug })
    if (!post) {
      return res.status(404).json('post not fount')
    }
    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    })
    const createdComment = await newComment.save()
    return res.status(201).json(createdComment)
  } catch (error) {
    next(error)
  }
}
const updateComment = async (req, res, next) => {
  try {
    const { desc, check } = req.body
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) {
      return res.status(404).json('comment not found')
    }
    comment.desc = desc || comment.desc
    comment.check = typeof check === 'undefined' ? comment.check : check
    const updatedComment = await comment.save()
    res.status(200).json(updatedComment)
  } catch (error) {
    next(error)
  }
}
const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
    if (!deletedComment) {
      return res.status(404).json('comment not found')
    }
    await Comment.deleteMany({ parent: deletedComment._id })
    return res.status(200).json('comment deleted successfully')
  } catch (error) {
    next(error)
  }
}
const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.keywords
    let where = {}
    if (filter) {
      where.desc = { $regex: filter, $options: 'i' }
    }
    let query = Comment.find(where)
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 10
    const skip = (page - 1) * pageSize
    const total = await Comment.find(where).countDocuments()
    const pages = Math.ceil(total / pageSize)

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
          path: 'parent',
          populate: [
            {
              path: 'user',
              select: ['avatar', 'name'],
            },
          ],
        },
        {
          path: 'replyOnUser',
          select: ['avatar', 'name'],
        },
        {
          path: 'post',
          select: ['slug', 'title'],
        },
      ])
      .sort({ updatedAt: 'desc' })

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export { createComment, updateComment, deleteComment, getAllComments }
