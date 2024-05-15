//./auth/userinfo.email
//./auth/userinfo.profile

// link google cloud https://console.cloud.google.com/apis/credentials?hl=vi&project=testlogin-423304
// https://vinhbao1112.github.io/loginGoogle/
// http://127.0.0.1:5500/loginGoogle/index.html



//%20 in URL giữa 2 url
const CLIENT_ID = "1056991295125-1sqnq6k73cs8mg9cavl8c72hp5db1hca.apps.googleusercontent.com"
const LINK_GET_TOKEN = `
    https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=https://vinhbao1112.github.io/loginGoogle/&client_id=${CLIENT_ID}
`

//LOCAL
// const CLIENT_ID_LOCAL = "1056991295125-56vnan7rhvmigpav8v4hihtn7vljq5l6.apps.googleusercontent.com"
// const LINK_GET_TOKEN = `
//     https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://127.0.0.1:5500/loginGoogle/index.html&client_id=${CLIENT_ID_LOCAL}
// `

document.addEventListener("DOMContentLoaded", ()=>{
    const signBtn = document.querySelector("#sign_btn")
    const logoutBtn = document.querySelector("#logout_btn")
    signBtn.addEventListener("click", ()=>{
        window.location.href = LINK_GET_TOKEN
    })
    logoutBtn.addEventListener("click", ()=>{
        logout()
    })
    renderDefaultUI()
    getUserInfo()
})

const getToken = ()=> {
    const url = new URLSearchParams(window.location.hash.substring(1))
    const token = url.get("access_token")
    return token
}

const renderDefaultUI = () => {
    const avatar = document.getElementById("avatar");
    const info = document.getElementById("info");
    const email = document.getElementById("email");

    avatar.src = "https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_1280.png";
    info.innerText = "Đăng nhập bằng Google";
    email.innerText = "Email người dùng";
}

const getUserInfo = async() => {
    const accessToken = getToken()
    if (accessToken) {
        const signBtn = document.getElementById("sign_btn")
        signBtn.style.display = 'none'

        const logoutBtn = document.getElementById("logout_btn")
        logoutBtn.style.display = 'inline'

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
        const data = await response.json()
        renderUI(data)
        clearURL()
    }
}

let currentUser = ""
const renderUI = (data) => {
    const avatar = document.getElementById("avatar")
    const info = document.getElementById("info")
    const email = document.getElementById("email")

    avatar.src = data.picture
    info.innerText = data.name
    email.innerText = data.email
    // console.log(data)
    currentUser = data.name
    showLoginNotification(data.name)
}

const logout = () => {
    window.location.hash = ''
    renderDefaultUI()

    const signBtn = document.getElementById("sign_btn")
    signBtn.style.display = 'inline'

    const logoutBtn = document.getElementById("logout_btn")
    logoutBtn.style.display = 'none'

    showLogoutNotification(currentUser)
}

const clearURL = () => {
    window.history.pushState({}, document.title, window.location.pathname)
}

const showLoginNotification = (userName) => {
    const notification = document.getElementById("notification")
    notification.innerText = userName + " đã đăng nhập thành công!"
    notification.style.backgroundColor = "#28a745"
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
};

const showLogoutNotification = (userName) => {
    const notification = document.getElementById("notification")
    notification.innerText = userName + " đã đăng xuất"
    notification.style.backgroundColor = "#dc3545"
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}