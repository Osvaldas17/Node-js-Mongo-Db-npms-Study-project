
let token;
let url = 'http://localhost:3000/api/v1';
let user;


const searchWindow = document.querySelector('#search-window')
const searchWindowIcon = document.querySelector('#search-window-icon')
const profileImgCon = document.querySelector('#profile-img-con')
const profileImgDropDownMenu = document.querySelector('#profile-img-drop-down')


// window.addEventListener('DOMContentLoaded', () => {
//     token = localStorage.getItem('projectauth')
//
//     if (!token) return window.location.href = ''
//
//     user = JSON.parse(localStorage.getItem('user'))
//
//     setUpNavBar()
// })

const setUpNavBar = () => {
    document.querySelector('#userName').textContent = user.username
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


    window.location.href = ''
}