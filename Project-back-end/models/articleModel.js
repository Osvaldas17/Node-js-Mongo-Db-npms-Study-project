
const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mainArticleImage: {
        type: String,
        required: true
    },
    clapCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            if (ret.mainArticleImage) ret.mainArticleImage = 'http://localhost:3000/' + ret.mainArticleImage
        }
    }
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article