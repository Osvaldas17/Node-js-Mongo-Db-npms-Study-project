const regWin = document.querySelector('.main-container')

// regiter
document.querySelector('#getStarted').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')

})

document.querySelector('#exitBtn').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')
})

// login
document.querySelector('#logIn').addEventListener('click', (e) => {
    document.querySelector('.login-window').classList.toggle('active2')

})

document.querySelector('#exitBtn-login').addEventListener('click', () => {
    document.querySelector('.login-window').classList.toggle('active2')
})