// Variables
const myProfile = document.getElementById("myProfile");
const logout = document.getElementById("logout");
const firstDiv = document.getElementById("firstDiv");
const secondDiv = document.getElementById("secondDiv");

// Events
myProfile.addEventListener('click', () => {
  location.href = "/account.html";
});

logout.addEventListener('click',()=>{
    sessionStorage.clear();
    location.href = "/index.html";
})

firstDiv.addEventListener('click', () => {
  location.href = "/heroGame.html";
});

secondDiv.addEventListener('click', () => {
  location.href = "/huntingCircles.html";
})