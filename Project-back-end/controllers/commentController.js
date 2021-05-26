const Comment = require ('../models/commentModel')

const getArticleComments = async (req, res) => {
    let articleComments = await Comment.find({
        articleId: req.body.id2
    }).populate('userId')
    res.send(articleComments)
}

const createComment = async (req, res) => {
    try {
        const comment = new Comment({
            commentContent: req.body.commentInput,
            userId: req.user._id,
            articleId: req.body.id1,
        })
        console.log(comment)
        let savedComment = await comment.save()
        res.send(savedComment)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }

}

module.exports = {
    createComment,
    getArticleComments
}