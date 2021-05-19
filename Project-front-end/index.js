
const signInGreen = document.querySelector('#sign-in-green')
const signUpGreen = document.querySelector('#sign-up-green')

let url = 'http://localhost:3000/api/v1'

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
        localStorage.setItem('todo-user',await JSON.stringify( await response.json()))
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
})