

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('projectauth')

    if (!token) return window.location.href = 'index.html'

    user = JSON.parse(localStorage.getItem('user'))
    setUpNavBar()
    setUpUserInfo()
})

let token;
let url = 'http://localhost:3000/api/v1';
let user;
const profileImgCon = document.querySelector('#profile-img-con')
const profileImgDropDownMenu = document.querySelector('#profile-img-drop-down')

document.querySelector('#sign-out').addEventListener('click',() => {
    logOut()
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


    window.location.href = 'index.html'
}

const setUpNavBar = () => {
    console.log(user)
    document.querySelector('#userName').textContent = user.userName
    document.querySelector('#userEmail').textContent = user.email
    if (user.profileImage) document.querySelector('#navProfileImage').src = user.profileImage
    if (user.profileImage) document.querySelector('#ProfileImage').src = user.profileImage
}

const setUpUserInfo = () => {
    let userInfo = `<h2 class="heading">About you</h2>

        <section class="name border-bot">
          <h3>Name</h3>
          <div class="flex">
            <p class="name-surname">${user.userName}</p>
            <div class="edit-btn light">Edit</div>
          </div>
          
          <p class="note">
            Your name appears on your Profile page, as your byline, and in your
            responses. It is a required field.
          </p>
        </section>

        <section class="name border-bot">
          <h3>Bio</h3>
          <div class="flex">
            <p class="">Add your bio</p>
            <div class="edit-btn light">Edit</div>
          </div>
          <p class="note">
            Your bio appears on your Profile and next to your stories. Max 160
            characters.
          </p>
        </section>

        <section class="name border-bot">
          <h3>Photo</h3>
          <div class="flex">
            <p class="">Photo</p>
            <div class="d-flex">
              <label for="upload-picture">
                <div  class="edit-btn light">Upload picture</div>
                <input id="upload-picture" class="display-none" type="file">
              </label>
               <div onclick="updateProfilePicture()" class="edit-btn light">Save picture</div>
            </div>
          </div>
          <div class="flex-two">
            <p class="note">
              Your photo appears on your Profile page and with your stories
              across Medium.<br /><br />
              Recommended size: Square, at least 1000 pixels per side. File
              type: JPG, PNG or GIF.
            </p>
            <img src="${user.profileImage ? user.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}" alt="Profile picture" class="profile-pic" />
          </div>
        </section>
        <section class="name border-bot">
          <div class="flex">
            <h3>Username & URL</h3>
            <div class="edit-btn light">Edit</div>
          </div>
          <div class="flex-two">
            <div>
              <p class="bold margin-btm">Username</p>
              <p class="bold">Profile URL</p>
            </div>
            <div class="margin-lft">
              <p class="regular username margin-btm">${user.userName}</p>
              <p class="regular url">myurl</p>
            </div>
          </div>
        </section>
        <section class="name border-bot">
          <div class="flex">
            <h3>Custom domain</h3>
            <div class="upgrade-btn light">Upgrade</div>
          </div>
          <p class="note">
            Upgrade your account to point a custom domain, like yourdomain.com
            or blog.yourdomain.com, to your profile.
          </p>
        </section>
        <section class="name border-bot">
            <div class="flex">
              <h3>Email settings</h3>
              <div class="edit-btn light">Edit</div>
            </div>
            <p class="bold margin-btm">Your email</p>
            <p class="regular">${user.email}</p>
            </p>
          </section>
            <section class="name border-bot">
            <div class="flex">
              <h3>Security</h3>
              
            </div>
            <div class="flex-three">
            <p class="bold margin-btm">Sign out of all other sessions</p>
            <div onclick="logOut()" class="signout-btn light">Sign Out</div>
        </div>
            <p class="regular">${user.email}</p>
            </p>
          </section>
          <section class="name border-bot">
            <div class="flex">
              <h3>Delete account</h3>
              <div class="upgrade-btn light">Delete</div>
            </div>
            <p class="regular margin-btm">Permanently delete your account and all of your content.</p>
     
          </section>`
    let userInfoContainer = document.querySelector('#user-info-container')
    userInfoContainer.innerHTML += userInfo
}

const updateProfilePicture = async() => {
    let profileImgElement = document.querySelector('#upload-picture')

    const formData = new FormData()

    formData.append('avatar', profileImgElement.files[0])

    try {
        let response = await fetch(`${url}/user/updateUserInfo`, {
            method: 'POST',
            headers: {
                'projectauth': token
            },
            body: formData
        })
        if (response.status != 200) throw await response.json()
        user = await response.json()
        localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
        console.log(e)
    }
    window.location.reload()
}