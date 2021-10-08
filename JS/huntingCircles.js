import Circle from "./Classes/Circle.js";

//Html Nodes
const body = document.getElementById("body");
const score = document.getElementById("score");

//Start the game after 1 second of page loading
let startGame = setTimeout(() => {

//Variables
let howManyCirclesAlive,circlesArray = [], totalScore = 0, numOfCircles = 0;

//get user input
let howManyCirclesAllowed = parseInt(prompt("Enter the max amount of circles allowed at a single time! (Must be 2 or higher), if you want to leave the game enter anything else")) + 1;


//Check for valid input //might be removed
if (!howManyCirclesAllowed.toString().split("").every((char) => char >= "1" && char <= "9"))
  location.href = "/loadingPage.html";



//Game logic
const startGame = setInterval(() => {
  //Create a new circle
  circlesArray.push(new Circle(body, circlesArray.length, totalScore)); //cant use setinterval to update score, therfore we update it every time we create a new object
  let size = (Math.floor(Math.random() * 35) + 25);

  document.getElementById(circlesArray.length - 1).style.width = size + "px";
  document.getElementById(circlesArray.length - 1).style.height = size + "px";
  document.getElementById(circlesArray.length - 1).style.transform = 'scale(1)';
  document.getElementById(circlesArray.length - 1).style.transform = 'rotateZ(0deg)';


  //Add animation to the circle
  document.getElementById(circlesArray.length - 1).animate(
    [
      // keyframes
      {transform: 'scale(0)',transform:'rotateZ(0deg)'},
      {transform: 'scale(1)',transform:'rotateZ(1800deg)'}
    ],
    {
      // timing options
      duration: 1000 * 0.7,
      iterations: 1,
    }
  );

  //This tracks how many circles are alive (the body contains)
  howManyCirclesAlive = body.getElementsByTagName("div").length - 1;

  //Game rule (check for lose)
  if (howManyCirclesAlive == howManyCirclesAllowed) {

    confirm(`You've lost with a score of ${totalScore}!`);
    body.innerHTML = '';
    location.reload(); //update this
  }
}, 1000 * 0.7);


//This deals with each circle that was clicked on
body.addEventListener("click", (event) => {
  if (event.target.className == "circle") {
    event.target.remove();
    ++totalScore;
  }
});

}, 1000 * 1);
