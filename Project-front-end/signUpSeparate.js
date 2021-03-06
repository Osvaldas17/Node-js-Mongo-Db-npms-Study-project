
let url = 'http://localhost:3000/api/v1'

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (token) return window.location.href = 'loggedInMainPage.html'
})

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault()

    let userName = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

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

    window.location.href = 'signInSeparate.html'
})