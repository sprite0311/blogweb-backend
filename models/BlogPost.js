import mongoose from "mongoose";

const blog = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    name: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const BlogPost = mongoose.model('blog', blog)

export default BlogPost