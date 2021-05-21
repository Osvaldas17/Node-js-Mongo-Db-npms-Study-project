
let token;
let url = 'http://localhost:3000/api/v1';
let user;

document.querySelector('#sign-out').addEventListener('click',() => {
    logOut()
})
document.querySelector('#publish-btn').addEventListener('click', (e) => {
    e.preventDefault()
    sendArticleToBackEnd()
})

const profileImgCon = document.querySelector('#profile-img-con')
const profileImgDropDownMenu = document.querySelector('#profile-img-drop-down')

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (!token) return window.location.href = 'index.html'

    user = JSON.parse(localStorage.getItem('user'))

    setUpNavBar()
})

profileImgCon.addEventListener('click',() => {
    profileImgDropDownMenu.classList.toggle('d-block')
})

const setUpNavBar = () => {
    console.log(user)
    document.querySelector('#userName').textContent = user.userName
    document.querySelector('#userEmail').textContent = user.email
    if (user.profileImage) document.querySelector('#navProfileImage').src = user.profileImage
    if (user.profileImage) document.querySelector('#ProfileImage').src = user.profileImage
}

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

const sendArticleToBackEnd = async() => {
    let mainArticleImage = document.querySelector('#add-title-image')
    let titleInput = document.querySelector('#title-input').value
    let contentInput = document.querySelector('#content-input').value

    const formData = new FormData()

    formData.append('mainArticleImage', mainArticleImage.files[0])
    formData.append('title', titleInput)
    formData.append('content', contentInput)

    console.log('formData',formData.getAll('title'))
    console.log('formData',formData.getAll('content'))
    console.log('formData',formData.getAll('mainArticleImage'))
    try {
        let response = await fetch(`${url}/article`, {
                method: 'POST',
                headers: {
                    'projectauth': token
                },
                body: formData
            }
        )
        if (response.status != 200) throw await response.json()
    } catch (e) {
        console.log(e)
    }
}