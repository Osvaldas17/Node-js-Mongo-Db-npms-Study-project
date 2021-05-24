
let token;
const url = 'http://localhost:3000/api/v1';
let user;

const searchWindow = document.querySelector('#search-window')
const searchWindowIcon = document.querySelector('#search-window-icon')
const profileImgCon = document.querySelector('#profile-img-con')
const profileImgDropDownMenu = document.querySelector('#profile-img-drop-down')

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')
    if (!token) return window.location.href = 'index.html'
    user = JSON.parse(localStorage.getItem('user'))

    setUpNavBar()
    getSelectedArticle()
})

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

const getSelectedArticle = async () => {
    let url_string = window.location.href;
    let url1 = new URL(url_string);
    let id = url1.searchParams.get("id")

    let body = {
        id
    }
    let response = await fetch(`${url}/getSelectedArticle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    let article = await response.json()

    renderArticle(article)
}

document.querySelector('#sign-out').addEventListener('click',() => {
    logOut()
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

const renderArticle = (article) => {
    let singleArticle = `<div class="main-content-wrapper">
            <h1 class="article-title">${article.title}</h1>
            <div class="profile-info">
                <div class="article-header">
                    <div>
                        <img class="user-article-image" src="${article.userId && article.userId.profileImage ? article.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
                    </div>
                    <div class="con1">
                        <div class="username-over-article">
                            <span>${article.userId ? article.userId.userName : 'anonymous'}</span>
                        </div>
                        <div class="read-time-con">
                            <span>${article.createdAt.slice(2,10)}</span>
                            <span class="">·</span>
                            <span>${calcReadTime(article.content.length)}</span>
                            <i class="fas fa-sun"></i>
                        </div>
                    </div>
                </div>
                <div class="bookmark">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>
            <div>
                <img class="main-article-img" src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
            </div>
            <div class="article-text">
                <p>${article.content}</p>
            </div>
        </div>`
    let articleContainer = document.querySelector('#article-render-place')
    articleContainer.innerHTML += singleArticle
}