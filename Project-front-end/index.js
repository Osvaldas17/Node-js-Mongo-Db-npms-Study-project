
const signInGreen = document.querySelector('#sign-in-green')
const signUpGreen = document.querySelector('#sign-up-green')
const writePage = document.querySelector('#goToWritePage')

let url = 'http://localhost:3000/api/v1'

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (token) return window.location.href = 'loggedInMainPage.html'
<<<<<<< HEAD
=======

    getTrendingArticlesMain()
    getAllArticlesMain()
>>>>>>> Vilmanto
})

// register
document.querySelector('#getStarted').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')
    document.querySelector('.white-back').classList.toggle('active3')
})

document.querySelector('#exitBtn').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')
    document.querySelector('.white-back').classList.toggle('active3')
})

signUpGreen.addEventListener('click',() => {
    document.querySelector('.login-window').classList.toggle('active2')
    document.querySelector('.register-window').classList.toggle('active')
})
document.querySelector('#getStartedHead').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')
    document.querySelector('.white-back').classList.toggle('active3')
})

// login
document.querySelector('#logIn').addEventListener('click', (e) => {
    document.querySelector('.login-window').classList.toggle('active2')
    document.querySelector('.white-back').classList.toggle('active3')
})

document.querySelector('#exitBtn-login').addEventListener('click', () => {
    document.querySelector('.login-window').classList.toggle('active2')
    document.querySelector('.white-back').classList.toggle('active3')
})

signInGreen.addEventListener('click',() => {
    document.querySelector('.login-window').classList.toggle('active2')
    document.querySelector('.register-window').classList.toggle('active')
})

// go to write page

writePage.addEventListener('click',() => {
    window.location.href = 'write.html'
})

// Sign in

document.getElementById('sign-in-btn').addEventListener('click', async (e) => {
    e.preventDefault()

    let email = document.getElementById('signIn-email').value
    let password = document.getElementById('signIn-password').value

    if (!email || !password) return alert('Enter email and password')

    let body = {
        email,
        password
    }
    try {
        let response = await fetch(`${url}/user/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.status != 200) throw await response.json()
        let token = response.headers.get('projectauth')
        localStorage.setItem('projectauth', token)
        localStorage.setItem('user',await JSON.stringify( await response.json()))
        window.location.href = 'loggedInMainPage.html'
    } catch (e) {
        alert(e.message)
    }

})

// Sign up

document.getElementById('sign-up-btn').addEventListener('click', async (event) => {
    event.preventDefault()

    let userName = document.getElementById('sign-up-username').value
    let email = document.getElementById('sign-up-email').value
    let password = document.getElementById('sign-up-password').value

    if (!email || !password) return alert('Fill in form')

    let body = {
        userName,
        email,
        password
    }

    let response = await fetch(`${url}/user/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    console.log(response)
    if (response.status != 200) return alert('Something went wrong')
    let data = await response.json()

    console.log(data)

    document.querySelector('.login-window').classList.toggle('active2')
    document.querySelector('.register-window').classList.toggle('active')
<<<<<<< HEAD
})
=======
})

// Render articles in main page

const showSixTrendingArticlesInMain = (articles) => {
    for (let article of articles) {
        let sixTrendingArticles = `<div class="trend-con">
                    <div class="trend-number">
                        <span>${articles.indexOf(article) + 1}</span>
                    </div>
                    <div class="trend-content">
                        <div class="d-flex align-center">
                            <img class="article-user-image" src="${article.userId && article.userId.profileImage ? article.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
                            <span class="m-l-8">${article.userId ? article.userId.userName : 'anonymous'}</span>
                        </div>
                        <div>
                            <h3>${article.title}</h3>
                            <span class="time-trend">${article.createdAt.slice(2,10)} · ${calcReadTimeInMain(article.content.length)}</span>
                        </div>
                    </div>
                </div>`
        let articleContainer = document.getElementById('top-trendsMain')
        articleContainer.innerHTML += sixTrendingArticles
    }
}


function renderLimitedContentInMain(x) {
    x = x.split(' ').slice(0, 15)
    x = x.join(' ')
    return x + '...'
}

function calcReadTimeInMain(x) {
    x = x / 300
    let y = Math.ceil(x)
    return y + ' min read'
}

const getTrendingArticlesMain = async () => {
    let response = await fetch(`${url}/getTrendingArticles`, {
        method: 'GET'
    })

    let articles = await response.json()
    console.log('6 trending articles',articles)
    showSixTrendingArticlesInMain(articles)
}

const getAllArticlesMain = async () => {
    let response = await fetch(`${url}/article`, {
        method: 'GET'
    })

    let articles = await response.json()
    showAllArticlesMain(articles)
}

const showAllArticlesMain = (articles) => {
    for (let article of articles) {
        let allArticles = `<div class="article-container">
                    <div class="article-text">
                        <div class="d-flex align-center">
                            <img class="article-user-image" src="${article.userId && article.userId.profileImage ? article.userId.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}" alt="">
                            <span class="m-l-8">${article.userId ? article.userId.userName : 'anonymous'}</span>
                        </div>
                        <h3 id="artiTittle">${article.title}</h3>
                        <p>${renderLimitedContentInMain(article.content)}</p>
                        <span class="time-trend">${article.createdAt.slice(2,10)} · ${calcReadTimeInMain(article.content.length)}</span>
                    </div>
                    <div class="article-image">
                        <img src="${article.mainArticleImage ? article.mainArticleImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="">
                    </div>
                </div>`
        let articleContainer = document.getElementById('all-article-zone')
        articleContainer.innerHTML += allArticles

        document.querySelector('#artiTittle').addEventListener('click', () => {
            document.querySelector('.register-window').classList.toggle('active')
            document.querySelector('.white-back').classList.toggle('active3')
        })
    }
}


>>>>>>> Vilmanto
