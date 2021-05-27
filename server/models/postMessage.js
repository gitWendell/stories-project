import mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema =  new Schema({
    messages: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    comments: [{
        ownerId: String,
        name: String,
        content: String,
    }]
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage