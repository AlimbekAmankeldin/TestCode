
let upload = document.querySelector(".add_photo");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// let getOne_button = document.querySelector(".get_photo");

// getOne_button.addEventListener('click', () => {
//   let fileName = document.querySelector('.fileName').value;
//   let user_id = parseJwt(localStorage.getItem("token"))["id"];
//   console.log(id);
//   console.log(fileName);
//   axios.get('/api/file/getone', {params:{
//     id:user_id,
//     name:fileName
//   }})
//   .then(function (response) {
//     if(response.data){
//       let images = response.data;
//       console.log("images" + images);
//       let newDiv = document.createElement(div);
//       document.querySelector(body).appendChild(newDiv);
//       let img = document.createElement(img);
//       img.src = 'static/' + images[i] + ".jpg";
//       newDiv.appendChild(img);
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// })


let get_allphoto = document.querySelector(".get_allphoto");
get_allphoto.addEventListener('click', () => {
  let user_id = parseJwt(localStorage.getItem("token"))["id"];
  axios.get('/api/file/getall', {params:{
    id:user_id
  }})
  .then(function (response) {
    if(response.data){
      let images = response.data;
      console.log("images " + images);
      let newDiv = document.createElement('div');
      newDiv.classList.add("photo_div");
      document.querySelector('.photo').appendChild(newDiv);
      for(let i=0; i<images.length; i++){
        let img = document.createElement('img');
        img.src = '/public/' + images[i] + ".jpg";
        newDiv.appendChild(img);
      }
    }
    else {
      alert("нет загруженных файлов")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
})

document.querySelector(".exit").addEventListener('click', () => {
  document.location.href = 'http://localhost:3000';
  localStorage.removeItem("token");
})