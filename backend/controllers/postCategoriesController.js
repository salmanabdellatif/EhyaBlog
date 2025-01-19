import PostCategories from '../models/postCategories.js'
import Post from '../models/post.js'

const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body
    const postCategory = await PostCategories.findOne({ title })
    if (postCategory) {
      return res.status(401).json('post category is already created')
    }
    const newPostCategory = new PostCategories({ title })
    const savedPostCategory = await newPostCategory.save()
    return res.status(201).json(savedPostCategory)
  } catch (error) {
    next(error)
  }
}
const getSingleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const postCategory = await PostCategories.findById(categoryId)
    if (!postCategory) {
      return res.status(404).json('post category not found')
    }
    return res.status(200).json(postCategory)
  } catch (error) {
    next(error)
  }
}
const getAllPostCategories = async (req, res, next) => {
  try {
    const filter = req.query.keywords
    let where = {}
    if (filter) {
      where.title = { $regex: filter, $options: 'i' }
    }
    let query = PostCategories.find(where)
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 10
    const skip = (page - 1) * pageSize
    const total = await PostCategories.find(where).countDocuments()
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
      .sort({ updatedAt: 'desc' })
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body
    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.categoryId,
      { title },
      { new: true }
    )
    if (!postCategory) {
      return res.status(404).json('post category not found')
    }
    return res.json(postCategory)
  } catch (error) {
    next(error)
  }
}
const deletePostCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    )
    const deletedCategory = await PostCategories.findByIdAndDelete(categoryId)
    if (!deletedCategory) {
      return res.status(404).json('Category not found or already deleted')
    }
    return res.json('Category deleted successfully')
  } catch (error) {
    next(error)
  }
}

export {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
  getSingleCategory,
}
