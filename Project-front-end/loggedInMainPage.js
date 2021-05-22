
let token;
let url = 'http://localhost:3000/api/v1';
let user;

document.querySelector('#sign-out').addEventListener('click',() => {
    logOut()
})

const searchWindow = document.querySelector('#search-window')
const searchWindowIcon = document.querySelector('#search-window-icon')
const profileImgCon = document.querySelector('#profile-img-con')
const profileImgDropDownMenu = document.querySelector('#profile-img-drop-down')

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (!token) return window.location.href = 'index.html'

    user = JSON.parse(localStorage.getItem('user'))

    setUpNavBar()
    getOneArticle()
    getFourRandomArticles()
})

// const getAllArticles = async () => {
//     let response = await fetch(`${url}/article`, {
//         method: 'GET'
//     })
//
//     let articles = await response.json()
//     console.log(articles)
// }

const getOneArticle = async () => {
    let response = await fetch(`${url}/getOneArticle`, {
        method: 'GET'
    })

    let article = await response.json()
    console.log('oneArticle',article)
    showOneLatestArticle(article)
}

const getFourRandomArticles = async () => {
    let response = await fetch(`${url}/getFourRandomArticles`, {
        method: 'GET'
    })

    let articles = await response.json()
    console.log('fourArticles',articles)
    showFourRandomArticles(articles)
}

const showOneLatestArticle = (articles) => {
    for (let article of articles) {
        let oneLatestArticle = `<a href="">
                        <img class="main-article-image" src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
                    </a>
                    <div class="user-info-under-article mt-16">
                        <img class="user-img-under-article" src="${article.userId && article.userId.profileImage ? article.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
                        <p class="user-text-under-article">${article.userId ? article.userId.userName : 'anonymous'}</p>
                    </div>
                    <div>
                        <h2 class="main-article-h2">${article.title}</h2>
                    </div>
                    <div>
                        <p class="main-article-text">${renderLimitedContent(article.content)}</p>
                    </div>
                    <div class="read-time-con mt-16">
                        <a href="">Read more</a>
                        <span class="dot-between">.</span>
                        <span>${calcReadTime(article.content.length)}</span>
                        <i class="fas fa-sun"></i>
                    </div>`
        let articleContainer = document.getElementById('oneLatestArticle')
        articleContainer.innerHTML += oneLatestArticle
    }
}

const showFourRandomArticles = (articles) => {
    for (let article of articles) {
        let fourRandomArticles = `<div class="small-article-con">
                        <div class="flex-grow-1 small-article-sub-con">
                            <div class="user-info-under-article">
                                <img class="user-img-under-article" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
                                <p class="user-text-under-article">${article.userId ? article.userId.userName : 'anonymous'}</p>
                            </div>
                            <div>
                                <h2 class="small-article-h2">
                                    ${article.title}
                                </h2>
                            </div>
                            <div class="read-time-con mt-8">
                                <a href="">${article.createdAt.slice(2,10)}</a>
                                <span class="dot-between">.</span>
                                <span>${calcReadTime(article.content.length)}</span>
                                <i class="fas fa-sun"></i>
                            </div>
                        </div>
                        <img class="small-article-img" src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
                    </div>`
        let articleContainer = document.getElementById('fourRandomArticles')
        articleContainer.innerHTML += fourRandomArticles
    }
}

function renderLimitedContent(x) {
    x = x.split(' ').slice(0, 15)
    x = x.join(' ')
    return x + '...'
}

function calcReadTime(x) {
    x = x / 300
    let y = Math.ceil(x)
    return y + ' min read'
}

const setUpNavBar = () => {
    console.log(user)
    document.querySelector('#userName').textContent = user.userName
    document.querySelector('#userEmail').textContent = user.email
    if (user.profileImage) document.querySelector('#navProfileImage').src = user.profileImage
    if (user.profileImage) document.querySelector('#ProfileImage').src = user.profileImage
}

searchWindowIcon.addEventListener('click', () => {
    searchWindow.classList.toggle('d-block')
})
profileImgCon.addEventListener('click',() => {
    profileImgDropDownMenu.classList.toggle('d-block')
})

const logOut = () => {

    fetch(`${url}/user/logOut`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'projectauth': token
        }
    })

    localStorage.removeItem('projectauth')
    localStorage.removeItem('user')


    window.location.href = 'index.html'
}