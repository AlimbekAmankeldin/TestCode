let button_login = document.querySelector(".send_log");

// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch (e) {
//     return null;
//   }
// };

button_login.addEventListener('click', () => {
  // document.location.href = 'http://localhost:3000/api/user/check'
    let login = document.querySelector('.login').value;
    let pas = document.querySelector('.passowrd').value;
    if(!login || !pas){
      document.querySelector('.signup-info').style.color = "red";
      document.querySelector('.signup-info').innerHTML = "Заполните все поля";
    }
    else {
      axios.post('/api/user/login', {
        email: login,
        password: pas
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data['token']){
          document.location.href = 'http://localhost:3000/api/user/check';
          localStorage.setItem("token", response.data['token']);
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

