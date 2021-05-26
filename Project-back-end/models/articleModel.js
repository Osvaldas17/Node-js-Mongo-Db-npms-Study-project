
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
    thumbnailSm: {
        type: String,
    },
    thumbnailMed: {
        type: String,
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
    bookmarked: {
      type: Boolean,
      default: false
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
            if (ret.thumbnailSm) ret.thumbnailSm = 'http://localhost:3000/' + ret.thumbnailSm
            if (ret.thumbnailMed) ret.thumbnailMed = 'http://localhost:3000/' + ret.thumbnailMed
        }
    }
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article