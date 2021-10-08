const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');
const errorMessage = document.getElementById('errorMessage');




//Methods
button.addEventListener('click',checkLogin);
//Functions
function checkLogin()
{
if (localStorage.getItem(username.value) == null || JSON.parse(localStorage.getItem(username.value)).password != password.value)
    {
     errorMessage.style.display = "inline";
     return;
    }

  //redirect to page
  location.href = "./account.html";
  sessionStorage.setItem(username.value,localStorage.getItem(username.value));


}

