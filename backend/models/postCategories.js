import { Schema, model } from 'mongoose'

const PostCategoriesSchema = new Schema(
  {
    title: { type: String, required: [true, 'please provide title'] },
  },
  { timestamps: true }
)

const PostCategories = model('PostCategories', PostCategoriesSchema)
export default PostCategories
