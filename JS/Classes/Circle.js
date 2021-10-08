export default class Circle {
  constructor(body, circleNumber, totalScore) {
    //---------------------- ACCOUNT & SCOREBOARD LOGIC ---------------------------
     const account = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
     if (totalScore > account.hunterGameHighScore)
     {
         account.hunterGameHighScore = totalScore;
         localStorage.setItem(account.username,JSON.stringify(account));
         sessionStorage.setItem(account.username,JSON.stringify(account));
     }
    score.innerHTML = `Playing as: ${account.username}<br>Total Score : ${totalScore}/${account.hunterGameHighScore}`; //Update the score each time a circle is created
  
    //Add the circle to the DOM and get save it in a variable
    body.innerHTML += `<div class= "circle" id="${circleNumber}" ></div>`;
    let tempCircle = document.getElementById(circleNumber);
    //Random color
    let randomColor = Math.floor(Math.random() * 11) + 1;
    switch (randomColor) {
      case 1:
        tempCircle.style.backgroundImage = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
        break;
      case 2:
        tempCircle.style.backgroundImage = 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)';
        
        break;
      case 3:
        tempCircle.style.backgroundImage = 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)';
        break;
      case 4:
        tempCircle.style.backgroundImage = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
        break;
      case 5:
        tempCircle.style.backgroundImage = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
        break;
      case 6:
        tempCircle.style.backgroundImage = 'linear-gradient(to top, #30cfd0 0%, #330867 100%)';
        break;
      case 7:
        tempCircle.style.backgroundImage = 'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)';
        break;
      case 8:
        tempCircle.style.backgroundImage = 'linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)';
        break;
      case 9:
        tempCircle.style.backgroundImage = 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)';
        break;
      case 10:
        tempCircle.style.backgroundImage = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';
        break;
    }
    //Random position in the page
    //X
    let x = Math.floor(Math.random() * window.innerWidth);
    while (x > window.innerWidth - 70 && x < window.innerWidth + 70)
      x = Math.floor(Math.random() * window.innerWidth);
    //Y
    let y = Math.floor(Math.random() * window.innerHeight);
    while (y > window.innerHeight - 70)
      y = Math.floor(Math.random() * window.innerHeight);

    //This makes sure the circle doesn't cover the scoreboard
    if (score.style.top >= y && score.style.left >= x)
        return;
  
        //Set position
    tempCircle.style.top = y + "px";
    tempCircle.style.left = x + "px";
  }


}
