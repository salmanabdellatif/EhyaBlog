import { Schema, model } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'PostCategories' }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id', // post id will be stored in the comment model
  foreignField: 'post', // "post" field in the "Comment" model contains the "_id" of the post
})

const Post = model('Post', postSchema)
export default Post
