const logoutNav = document.querySelector('.logout');
const profile = document.querySelector('.profile');
const home = document.querySelector('.home');
const myCart = document.querySelector('.myCart');


home.addEventListener("click", () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'landingpage.html';
        changePassContainer.classList.add('hide');
    }
    else {
        window.location.href = 'index.html';
    }
})

logoutNav.addEventListener("click", () => {
    window.location.href = "login.html";
    localStorage.removeItem('currentUser');
    changePassContainer.classList.add('hide');
})

profile.addEventListener("click", () => {
    window.location.href = "profile.html";
    changePassContainer.classList.add('hide');
})

myCart.addEventListener('click', () => {
    window.location.href = 'mycart.html';
    changePassContainer.classList.add('hide');
})

const changePassContainer = document.querySelector('.changePassword');
const changePass = document.querySelector('.changePass');
changePass.addEventListener('click',()=>{
    changePassContainer.classList.remove('hide');
})

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const myName = document.querySelector('.name');
const myEmail = document.querySelector('.email');
console.log(currentUser);

myName.innerHTML = currentUser.name;
myEmail.innerHTML = currentUser.email;


const users = JSON.parse(window.localStorage.getItem('users'));

const oldPassword = document.querySelector('#oldPassword');
const oldPasswordWarning = document.querySelector('#oldPasswordHelp');
const newPassword = document.querySelector('#newPassword');
const newPasswordWarning = document.querySelector('#newPasswordHelp');
const confirmNewPassword = document.querySelector('#confirmNewPassword');
const confirmNewPasswordWarning = document.querySelector('#confirmNewPasswordHelp');
const change = document.querySelector('#change');
const logout = document.querySelector('#logout');
const notification = document.querySelector('.notification');


change.addEventListener('click',(e) =>{
    e.preventDefault();
    if(oldPassword.value !== currentUser.password){
        oldPasswordWarning.innerHTML = 'Entered password is not same as Current Password!';
        notification.innerHTML = '';
        return false;
    }
    else{
        oldPasswordWarning.innerHTML = '';
    }
    //password validation
    //1 Uppercase
    if(!newPassword.value.match(/[A-Z]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    //lowercase
    if(!newPassword.value.match(/[a-z]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(!newPassword.value.match(/[0-9]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(!newPassword.value.match(/[!/@/#/$/%/^/&/*/</>/_/]/)){
        newPasswordWarning.innerHTML = 'Password should contain one upper case, one lowercase, one number, and one symbol!';
        notification.innerHTML = '';
        return false;
    }
    if(newPassword.value===currentUser.password){
        newPasswordWarning.innerHTML = 'New password should not be same as your old password!';
        notification.innerHTML = '';
        return false;
    }
    else{
        newPasswordWarning.innerHTML = '';
    }

    if(newPassword.value !== confirmNewPassword.value){
        confirmNewPasswordWarning.innerHTML = "New password and Confirm Password should be the same!";
        notification.innerHTML = '';
        return false;
    }
    else{
        confirmNewPasswordWarning.innerHTML = "";
        notification.innerHTML = 'Password changed successfully!!';
        currentUser.password = confirmNewPassword.value;
        oldPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
        users.map(data=>{
            console.log(data.password)
            if(oldPassword.value === data.password){
                data.password = confirmNewPassword.value;
            }
        })
        window.localStorage.setItem('users', JSON.stringify(users));
    }
    
})
logout.addEventListener('click', ()=>{
    window.localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
})
