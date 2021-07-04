
let button_reg = document.querySelector(".send_reg");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

button_reg.addEventListener('click', () => {
  // document.location.href = 'http://localhost:3000/api/user/check'
    let login = document.querySelector('.reg-login').value;
    let pas = document.querySelector('.reg-passowrd').value;
    let repeat_pas = document.querySelector('.repeat-pas').value;
    if(!login || !pas || !repeat_pas){
      document.querySelector('.signup-info').style.color = "red";
      document.querySelector('.signup-info').innerHTML = "Заполните все поля";
    }
    else if(pas!==repeat_pas){
      document.querySelector('.signup-info').style.color = "red";
      document.querySelector('.signup-info').innerHTML = "Пароли не совпадают";
    }
    else {
      axios.post('/api/user/signup', {
        email: login,
        password: pas
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data['jwebToken']){
          document.querySelector('.signup-info').style.color = "green";
          document.querySelector('.signup-info').innerHTML = "Вы успешно зарегистрировались, нажмите Вход";
          localStorage.setItem("token", response.data['jwebToken']);
        }
        else {
          document.querySelector('.signup-info').style.color = "red";
          document.querySelector('.signup-info').innerHTML = response.data;
        }
        // console.log(response.data['jwebToken']);
        // console.log(parseJwt(response.data['jwebToken']));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
})

