
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
    getArticleComments()
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
    console.log(id)

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
                    <i onclick="${bookmarkArticle(article._id)}" class="far fa-bookmark bookmark-btn"></i>
                </div>
            </div>
            <div>
                <img class="main-article-img" src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
            </div>
            <div class="article-text">
                <p>${article.content}</p>
            </div>
            <div class="h-30px">
                <img class="clap-image" src="http://cdn.onlinewebfonts.com/svg/img_484121.png" onclick='clap(this, "${article._id}")' alt="">
                <span class="claps-count">${article.clapCount}</span>
            </div>
        </div>`

    let articleContainer = document.querySelector('#article-render-place')
    articleContainer.innerHTML += singleArticle
}


const bookmarkArticle = (id) => {
    let body = {
        _id: id
    }
    fetch(`${url}/bookmarkArticle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'projectauth': token
        },
        body: JSON.stringify(body)
    })
}

//////////////////

const clap = async (el, id) => {


    let count = el.nextElementSibling.innerHTML

    el.nextElementSibling.innerHTML = parseInt(count) + 1

    let body = {
        clapId: id
    }

    fetch(`${url}/article/clap`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'projectauth': token
        },
        body: JSON.stringify(body)
    })
}

const getArticleComments = async () => {
    const url_string2 = window.location.href;
    const url22 = new URL(url_string2);
    const id2 = url22.searchParams.get("id")

    let body = {
        id2
    }

    try {
        let response = await fetch(`${url}/articleComments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        let articleComments = await response.json()

        showComments(articleComments)
        console.log('comments', articleComments)
        if (response.status != 200) throw await response.json()
        } catch (e) {
        console.log(e)
}
}

document.querySelector('#comment-btn').addEventListener('click',() => {
    sendCommentToBackEnd()
})

const sendCommentToBackEnd = async() => {


    const commentInput = document.querySelector('#commentInput').value

    if (commentInput.trim() !== '') {
        const url_string1 = window.location.href;
        const url11 = new URL(url_string1);
        const id1 = url11.searchParams.get("id")

        let body = {
            commentInput,
            id1
        }
        console.log(body)

        try {
            let response = await fetch(`${url}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'projectauth': token
                    },
                    body: JSON.stringify(body)
                }
            )
            if (response.status != 200) throw await response.json()

            let path = window.location.href
            window.location.href = path

        } catch (e) {
            console.log(e)
        }
    }
    else {
        alert('field is empty')
    }
}

const showComments = (comments) => {
    for (let comment of comments) {
        let commentRender = `<div class="comment-window">
                    <div class="comment-profile-info">
                        <img class="profile-pic" src="${comment.userId && comment.userId.profileImage ? comment.userId.profileImage : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}" alt="">
                        <div class="comment-user">
                            <div>
                                <span>${comment.userId.userName}</span>
                                <span class="comment-date">${comment.createdAtComment.slice(0, 10)}</span>
                            </div>
                            <div>
                                <button onclick="deleteComment(this,'${comment._id}','${user._id}','${comment.userId._id}')" class="delete-comment">X</button>
                            </div>
                        </div>
                    </div>
                        <p class="comment-content">${comment.commentContent}</p>
                </div>`

        let commentSpace = document.querySelector('#comment-space')
        commentSpace.innerHTML += commentRender

    }
}

const deleteComment = (el,id,currentUser,commentUser) => {

    if (currentUser === commentUser) {
        let body = {
            _id: id
        }
        fetch(`${url}/deleteComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectauth': token
            },
            body: JSON.stringify(body)
        })
        let path = window.location.href
        window.location.href = path
    } else {
        alert('you cant delete other people comments')
    }
}

