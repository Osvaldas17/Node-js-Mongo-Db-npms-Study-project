const regWin = document.querySelector('.main-container')

// regiter
document.querySelector('#getStarted').addEventListener('click', () => {
    document.querySelector('.register-window').classList.toggle('active')
    document.querySelector('.white-back').classList.toggle('active3')
})

document.querySelector('#exitBtn').addEventListener('click', () => {
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