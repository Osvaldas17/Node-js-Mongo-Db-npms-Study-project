const router = require('express').Router();
const multer = require('multer')

const articleController = require('../controllers/articleControler')
const userController = require('../controllers/userController')
const authenticateMiddleware = require('../middleware/authenticate')
<<<<<<< HEAD
=======
const commentController = require('../controllers/commentController')
>>>>>>> Vilmanto


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage
})

router.route('/article')
<<<<<<< HEAD
    .post(authenticateMiddleware.authenticate, upload.single('mainArticleImage'),articleController.createArticle)
=======
    .post(authenticateMiddleware.authenticate, upload.single('mainArticleImage'), articleController.createArticle)
>>>>>>> Vilmanto
    .get(articleController.getArticles)
router.route('/getOneArticle')
    .get(articleController.getOneLatestArticle)
router.route('/getFourRandomArticles')
    .get(articleController.getFiveLatestArticles)
router.route('/article/clap')
    .post(articleController.clapArticle)
router.route('/myArticles')
    .get(authenticateMiddleware.authenticate, articleController.getMyArticles)
router.route('/deleteArticle')
    .post(authenticateMiddleware.authenticate, articleController.deleteArticle)
router.route('/getTrendingArticles')
    .get(articleController.getTrendingArticles)
router.route('/getSelectedArticle')
    .post(articleController.getSelectedArticle)
<<<<<<< HEAD
router.route('/removeFromBookmark')
    .post(authenticateMiddleware.authenticate, articleController.removeFromBookmark)
router.route('/bookmarkArticle')
    .post(authenticateMiddleware.authenticate, articleController.bookmarkArticle)
router.route('/getBookmarkedArticles')
    .get(authenticateMiddleware.authenticate, articleController.getBookmarkedArticles)
=======
router.route('/comment')
    .post(authenticateMiddleware.authenticate, commentController.createComment)
    .get(commentController.getComments)
router.route('/articleComments')
    .get(commentController.getArticleComments)
>>>>>>> Vilmanto


router.route('/user/signUp').post(userController.signUp)
router.route('/user/signIn').post(userController.signIn)
router.route('/user/currentUser').get(authenticateMiddleware.authenticate, userController.currentUser)
router.route('/user/logOut').post(authenticateMiddleware.authenticate, userController.logOut)
router.route('/user/getAllUsers').get(userController.getAllUsers)
router.route('/user/updateUserInfo').post(authenticateMiddleware.authenticate, upload.single('avatar'), userController.updateUserInfo)


module.exports = router

