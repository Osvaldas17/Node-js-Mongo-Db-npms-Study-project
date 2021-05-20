
document.querySelector('#StartWritingBtn').addEventListener('click',(e) => {
    e.preventDefault()
    window.location.href = 'signUpSeparate.html'
})

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (token) return window.location.href = 'loggedInMainPage.html'
})
