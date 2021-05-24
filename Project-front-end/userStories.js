
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
    getMyArticles()
})

const setUpNavBar = () => {
    console.log(user)
    document.querySelector('#userName').textContent = user.userName
    document.querySelector('#userEmail').textContent = user.email
    if (user.profileImage) document.querySelector('#navProfileImage').src = user.profileImage
    if (user.profileImage) document.querySelector('#ProfileImage').src = user.profileImage
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

const showMyArticles = (articles) => {
    for (let article of articles) {
        let myArticles = `<div class="article-container">
                    <div class="article-text">
                        <div class="d-flex align-center">
                            <img class="article-user-image" src="${article.userId && article.userId.profileImage ? article.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
                            <span class="m-l-8">${article.userId ? article.userId.userName : 'anonymous'}</span>
                        </div>
                        <h3>${article.title}</h3>
                        <p>${renderLimitedContent(article.content)}</p>
                        <span class="time-trend">${article.createdAt.slice(2,10)} · ${calcReadTime(article.content.length)} · <span onclick="window.location.reload(); removeArticle(this,'${article._id}')" class="remove-article-btn">Remove article</span></span>
                    </div>
                    <div class="article-image">
                        <img src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
                    </div>
                </div>`
        let articleContainer = document.getElementById('your-stories')
        articleContainer.innerHTML += myArticles
    }
}

const getMyArticles = async () => {
    let response = await fetch(`${url}/myArticles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'projectauth': token
        }
    })

    let articles = await response.json()
    console.log(articles)
    showMyArticles(articles)
}

const removeArticle = (el,id) => {

    let body = {
        _id: id
    }
    fetch(`${url}/deleteArticle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'projectauth': token
        },
        body: JSON.stringify(body)
    })
}
