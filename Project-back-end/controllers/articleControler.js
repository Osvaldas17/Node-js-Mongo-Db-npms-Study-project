const Article = require('../models/articleModel')
const sharp = require('sharp')

const getArticles = async (req, res) => {
    let allArticles = await Article.find().sort({ createdAt: -1 } ).populate('userId')
    res.send(allArticles)
}

const clapArticle = async (req, res) => {
    try {
        if (!req.body.clapId) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body.clapId
        }, {
            $inc: {
                clapCount: 1
            }
        }, {
            new: true
        })

        res.send(article)

    } catch (e) {
        res.status(400).send(e)
    }
}

const getSelectedArticle = async (req, res) => {
    try {
        let article = await Article.findOne({
            _id: req.body.id
        }).populate('userId')
        res.send(article)

    } catch (e) {
        res.status(400).send(e)
    }
}

const getTrendingArticles = async (req, res) => {
    try {
        let topArticles = await Article.find().populate('userId').sort({ clapCount: -1 }).limit(6);
        res.send(topArticles);
    } catch (e) {
        res.status(400).send(e);
    }
}

const getOneLatestArticle = async (req, res) => {
    let oneArticles = await Article.find().sort({ createdAt: -1 } ).populate('userId').limit(1)
    res.send(oneArticles)
}
const getFourRandomArticles = async (req, res) => {
    let getFourRandomArticles = await Article.find().sort({ createdAt: -1 } ).populate('userId').limit(5)
    res.send(getFourRandomArticles)
}


const createArticle = async (req, res) => {
    let path1 = "uploads/"+"resided-1-" + Date.now() + ".jpg"
    let path = "uploads/"+"resized-0-" + Date.now() + ".jpg"
    await sharp(req.file.path)
        .resize(200,158)
        .jpeg({quality: 50})
        .toFile(path)

    await sharp(req.file.path)
        .resize(600)
        .jpeg({quality: 50})
        .toFile(path1)


    try {

        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            mainArticleImage: req.file.path,
            userId: req.user._id,
            thumbnailSm: path,
            thumbnailMed: path1
        })

        let savedArticle = await article.save()
        res.send(savedArticle)

    } catch (e) {
        res.status(400).send(e)
    }
}
const deleteArticle = async (req, res) => {
    Article.deleteOne({ _id: req.body._id }, function (err) {
        if (err) throw (err);
    });
    res.send(Article)
}

const bookmarkArticle = async (req, res) => {
    let user = req.user

    let articleId = req.body.articleId
    let bookmarks = req.user.bookmarks

    if (req.body.articleId && bookmarks.indexOf(articleId) <= 0) {
        user.bookmarks.push(req.body.articleId)
        await user.save()
    }
    res.send(user)
}

const removeFromBookmark = async (req, res) => {
    let user = req.user

    if (req.body.articleId) {
        user.bookmarks.remove(req.body.articleId)
        await user.save()
    }
    res.send(user)
}


const getBookmarkedArticles = async (req, res) => {
    let articleIds = req.user.bookmarks
    let bookmarks = await Article.find().where('_id').in(articleIds).exec();
    res.send(bookmarks)
}


const getMyArticles = async (req, res) => {
    let articles = await Article.find({
        userId: req.user._id
    }).populate('userId')
    res.send(articles)
}

module.exports = {
    getArticles,
    createArticle,
    clapArticle,
    getTrendingArticles,
    getMyArticles,
    deleteArticle,
    getOneLatestArticle,
    getFourRandomArticles,
    getSelectedArticle,
    bookmarkArticle,
    getBookmarkedArticles,
    removeFromBookmark,
}
