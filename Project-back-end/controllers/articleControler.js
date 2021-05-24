const Article = require('../models/articleModel')

const getArticles = async (req, res) => {
    let allArticles = await Article.find().populate('userId')
    res.send(allArticles)
}

const clapArticle = async (req, res) => {
    try {
        if (!req.body._id) throw {
            message: 'Provide article id'
        }
        let article = await Article.findOneAndUpdate({
            _id: req.body._id
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
    console.log(req.body)
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

const createArticle = async (req, res) => {

    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            mainArticleImage: req.file.path,
            userId: req.user._id,
        })

        console.log(article)

        let savedArticle = await article.save()
        res.send(savedArticle)

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}
const deleteArticle = async (req, res) => {
    Article.deleteOne({ _id: req.body._id }, function (err) {
        if (err) throw (err);
    });
    res.send(Article)
}

const getMyArticles = async (req, res) => {
    let articles = await Article.find({
        userId: req.user._id
    }).populate('userId')
    res.send(articles)
    console.log(articles)
}


module.exports = {
    getArticles,
    createArticle,
    clapArticle,
    getTrendingArticles,
    getMyArticles,
    deleteArticle,
    getOneLatestArticle,
    getFiveLatestArticles,
    getSelectedArticle
}
