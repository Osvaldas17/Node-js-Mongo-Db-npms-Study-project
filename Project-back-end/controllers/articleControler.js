const Article = require('../models/articleModel')
<<<<<<< HEAD
const sharp = require('sharp')
=======
>>>>>>> Vilmanto

const getArticles = async (req, res) => {
    let allArticles = await Article.find().populate('userId')
    res.send(allArticles)
}

const clapArticle = async (req, res) => {
    try {
<<<<<<< HEAD
        if (!req.body._id) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body._id
=======
        if (!req.body.clapId) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body.clapId
>>>>>>> Vilmanto
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
<<<<<<< HEAD
=======
    console.log(req.body)
>>>>>>> Vilmanto
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
const getFiveLatestArticles = async (req, res) => {
    let getFourRandomArticles = await Article.find().sort({ createdAt: -1 } ).populate('userId').limit(5)
    res.send(getFourRandomArticles)
}

<<<<<<< HEAD

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

    console.log('path',path)

    try {

=======
const createArticle = async (req, res) => {

    try {
>>>>>>> Vilmanto
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            mainArticleImage: req.file.path,
            userId: req.user._id,
<<<<<<< HEAD
            thumbnailSm: path,
            thumbnailMed: path1
        })

=======
        })

        console.log(article)

>>>>>>> Vilmanto
        let savedArticle = await article.save()
        res.send(savedArticle)

    } catch (e) {
        res.status(400).send(e)
<<<<<<< HEAD
    }
}
=======
        console.log(e)
    }
}

>>>>>>> Vilmanto
const deleteArticle = async (req, res) => {
    Article.deleteOne({ _id: req.body._id }, function (err) {
        if (err) throw (err);
    });
    res.send(Article)
}

<<<<<<< HEAD
const bookmarkArticle = async (req, res) => {
    try {
        if (!req.body._id) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body._id
        }, {
            bookmarked: true

        }, {
            new: true
        })

        res.send(article)

    } catch (e) {
        res.status(400).send(e)
    }
}
const removeFromBookmark = async (req, res) => {
    try {
        if (!req.body._id) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body._id
        }, {
            bookmarked: false

        }, {
            new: true
        })

        res.send(article)

    } catch (e) {
        res.status(400).send(e)
    }
}

const getBookmarkedArticles = async (req, res) => {
    let articles = await Article.find({
        bookmarked: true
    }).populate('userId')
    res.send(articles)
}

=======
>>>>>>> Vilmanto
const getMyArticles = async (req, res) => {
    let articles = await Article.find({
        userId: req.user._id
    }).populate('userId')
    res.send(articles)
<<<<<<< HEAD
}

=======
    console.log(articles)
}


>>>>>>> Vilmanto
module.exports = {
    getArticles,
    createArticle,
    clapArticle,
    getTrendingArticles,
    getMyArticles,
    deleteArticle,
    getOneLatestArticle,
    getFiveLatestArticles,
    getSelectedArticle,
<<<<<<< HEAD
    bookmarkArticle,
    getBookmarkedArticles,
    removeFromBookmark
=======
>>>>>>> Vilmanto
}
