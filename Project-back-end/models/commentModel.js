const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentContent: {
        type: String,
        required: true
    },
    createdAtComment: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    articleId: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password 
    }
}
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment