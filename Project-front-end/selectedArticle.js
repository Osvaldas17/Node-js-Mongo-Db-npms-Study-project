
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
    // getAllComents()
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
    const url_string = window.location.href;
    const url1 = new URL(url_string);
    const id = url1.searchParams.get("id")

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

// const getAllComents = async () => {
//     let response = await fetch(`${url}/comment`, {
//         method: 'GET'
//     })

//     let comments = await response.json()
//     console.log(comments)
//     showComments(comments)
// }

const getArticleComments = async () => {
    let response = await fetch(`${url}/articleComments`, {
        method: 'GET'
    })
    let artComments = await response.json()
    console.log(artComments)
    showComments(artComments)
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
            <div class="article-claps-con">
                <img class="clap-image" src="http://cdn.onlinewebfonts.com/svg/img_484121.png" onclick='clap(this, "${article._id}")' alt="">
                <span class="claps-count">${article.clapCount}</span>

                <div>
                <input placeholder="Leave Comment" class="comment-input" id="commentInput"></input>
            </div>
            <button id="comment-btn" type="submit">Comment</button> 
        </div>`
    let articleContainer = document.querySelector('#article-render-place')
    articleContainer.innerHTML += singleArticle

    


    document.querySelector('#comment-btn').addEventListener('click', (e) => {
    e.preventDefault()
    sendCommentToBackEnd()

    window.location.href = `selectedArticle.html?id=${article._id}`
    }   )  
}


const sendCommentToBackEnd = async() => {


    const commentInput = document.querySelector('#commentInput').value
    console.log(commentInput)

    if (commentInput.trim() !== '') {
        const url_string1 = window.location.href;
        const url11 = new URL(url_string1);
        const id1 = url11.searchParams.get("id")
        

        // const formData = new FormData()
        // formData.append('commentContent', commentInput)
        // formData.append('articleId', id1)

        // console.log('formData', formData.getAll('commentContent'))
        // console.log('formData', formData.getAll('articleId'))
        // console.log('formData', formData.getAll('userId'))

        let body = {
            commentInput,
            id1
        }

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
        } catch (e) {
            console.log(e)
        }
    }
    else {
        alert('Please make sure all fields are entered and atleast one image added')
    }
}


const showComments = (comments) => {
      
    for (let comment of comments) {

        let comCard = `<div class="com-con">
        <div class="profile-pic">
        <img src="${comment.userId && comment.userId.profileImage ? comment.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
    </div>
    <div class="all-comment-content">
        <div class="comment-user">${comment.userId ? comment.userId.userName : 'anonymous'}
        <div class="coment-date">${comment.createdAtComment.slice(2,10)}</div>
        </div>
        <div class="comment-content">${comment.commentContent}</div>
        </div>
    </div>`
    let cardComContainer = document.getElementById('commentsContainer')
    cardComContainer.innerHTML += comCard
    }
}
