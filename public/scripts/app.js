let logButton = document.querySelector('.log');
let regButton = document.querySelector('.sign');
let signupDiv = document.querySelector('.signup_div');
let loginDiv = document.querySelector('.login_div');

logButton.addEventListener('click', () => {
    signupDiv.classList.remove('active');
    loginDiv.classList.toggle('active');
})

regButton.addEventListener('click', () => {
    signupDiv.classList.toggle('active');
    loginDiv.classList.remove('active');
})