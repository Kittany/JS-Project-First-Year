sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
//---------------------- NODE ELEMENTS ---------------------------
const body = document.querySelector('body');
const container = document.getElementById('container');
const character = document.getElementById('character');
const surface = document.getElementById('surface');
const dragon = document.getElementById('dragon');
const fade = document.getElementById('fade');
var enemy = document.querySelectorAll('.enemy');
//---------------------- GAME LOGIC ---------------------------
var lastJump = 0; // We start at 0 ms
character.style.left = '7%';
character.style.width = '12%';

//Movement
body.addEventListener('keypress',(event)=>
{
    if (event.code == "Space" && Date.now() - lastJump > 700) // if The date now in ms - the last date in ms > 2 seconds then we can jump again (only 1 jump allowed every 2 seconds)
    { 
     character.className = 'jump';
     setTimeout(() => {
         character.classList = '';
     }, 1000 * 0.7);
     lastJump = Date.now(); //This will return the date in ms right now
    }
})

//ADD NEW ENEMIES BASED ON LEVEL
    var levelZero = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
}, 1000 * (Math.floor(Math.random() * 4) + 2)); //<---- CHANGE THIS TIME BASED ON DIFFICULTY (it's the enemies spawn rate)

    var levelOne;
    var levelTwo;
    var levelThree;
    var levelFour;
    var levelFive;

//---------------------- HUD LOGIC ---------------------------
const scoreboard = document.getElementById('scoreboard');
let score = 0;
const profileDetails = document.getElementById('profileDetails');
const account = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
let img = new Image();
img.id = 'profilePicture';
img.src = account.profilePicture; 
profileDetails.appendChild(img);
profileDetails.innerHTML += account.username;

//Calling the dragon is only allowed every 30 seconds
var lastCall = 0;
const callDragon = document.getElementById('callDragon');
callDragon.addEventListener('click',()=>
{
   if (!gameOver)
   if (Date.now() - lastCall > 1000 * 30)
   {
    var coolDown = 30;
    let timeout = setInterval(() => {
        callDragon.innerHTML = coolDown--;

        if (coolDown == -1)
        {
            clearInterval(timeout);
            callDragon.innerHTML = "Call Dragon";
        }
    }, 1000);
   dragon.className = 'activateDragonAttack';
   setTimeout(() => {
    dragon.className = "";
   }, 1000 * 13);
   lastCall = Date.now();
   }
});

//---------------------- MAIN MENU LOGIC ---------------------------
const playerStats = document.getElementById('playerStats');
img.id = "menuPlayerAvatar";
playerStats.appendChild(img);
playerStats.innerHTML+= `<p id="username">${account.username}</p>`;
playerStats.innerHTML+= `<p>Highest Score <br>${account.heroGameHighScore}</p>`;



//---------------------- UPDATE ---------------------------
//CHECK FOR UPDATES
var gameOver = false;
var update = setInterval(() => {
    //Score settings 
    if (!gameOver)
    scoreboard.innerText = score++ + '/' + account.heroGameHighScore;
    if (score > account.heroGameHighScore)
    {
        account.heroGameHighScore = score;
        localStorage.setItem(account.username,JSON.stringify(account));
        sessionStorage.setItem(account.username,JSON.stringify(account));
    }

   //Ranking settings
   var rankedPlayer = [];
   const playerHolder = document.getElementById('playerHolder');
   playerHolder.innerHTML = ""
   for(let i = 0; i < localStorage.length ; i++)
   {
     if(JSON.parse(localStorage.getItem(localStorage.key(i))).username != undefined)
     rankedPlayer.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
   }
   
   //Sort the array based on the highest score of each object.
   rankedPlayer.sort((a,b) => (a.heroGameHighScore < b.heroGameHighScore)? 1:-1);

   for(let i = 0; i < rankedPlayer.length;i++)
   {
   playerHolder.innerHTML+= `<p>Username: ${rankedPlayer[i].username}<br>Highest Score: ${rankedPlayer[i].heroGameHighScore}</p>`; //FIX THIS
   }
   
     
    //Gameplay settings 
     if (score == 100)
     {
        clearInterval(levelZero);
        levelOne = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
         }, 1000 * (Math.floor(Math.random() * 3) + 1.8)); 

         //fade and background settings
        fade.style.display = 'flex';
        surface.style.animationDuration = '6s';
        setTimeout(() => {
            fade.style.display = 'none';
        }, 1000);
     }
     else if (score == 200)
     {
        clearInterval(levelOne);
        levelTwo = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
         }, 1000 * (Math.floor(Math.random() * 1.8) + 1.5)); 


         //fade and background settings
        fade.style.display = 'flex';
        surface.style.animationDuration = '5s';
        setTimeout(() => {
            fade.style.display = 'none';
        }, 1000);
     }
    else if (score == 300)
    {
        clearInterval(levelTwo);
        levelThree = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
         }, 1000 * (Math.floor(Math.random() * 1.5) + 1.2)); 

         //fade and background settings
         fade.style.display = 'flex';
         surface.style.animationDuration = '4s';
         setTimeout(() => {
            fade.style.display = 'none';
        }, 1000);
    }
    else if (score == 400)
    {
        clearInterval(levelThree);
        levelFour = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
         }, 1000 * (Math.floor(Math.random() * 1.2) + 0.8)); 

         //fade and background settings
         fade.style.display = 'flex';
         surface.style.animationDuration = '3s';
         setTimeout(() => {
            fade.style.display = 'none';
        }, 1000);
    }
    else if (score == 500)
    {
        clearInterval(levelFour);
        levelFive = setInterval(() => {
        let newEnemy = enemy[0].cloneNode(true);
        newEnemy.style.right = `${-1 * (Math.floor(Math.random() * 2) + 1) - 10 }%`;
        container.append(newEnemy);
         }, 1000 * (Math.floor(Math.random() * 0.8) + 0.75)); 

         //fade and background settings
         fade.style.display = 'flex';
         surface.style.animationDuration = '2s';
         setTimeout(() => {
            fade.style.display = 'none';
        }, 1000);
    }

    //Check for lose
  enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
      let enemyRight = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
      let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
      let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue("right"));
      let enemyBottom = parseInt(window.getComputedStyle(enemy).getPropertyValue("bottom"));
      let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
      let dragonRight = parseInt(window.getComputedStyle(dragon).getPropertyValue("right"));
      let dragonBottom = parseInt(window.getComputedStyle(dragon).getPropertyValue("bottom"));

       //Hero to enemies relation
      if (enemyRight >= characterRight  && enemyLeft > 25 && characterBottom <= enemyBottom) //19 (7% left + 12% width + extra space for smoothness) is the left pos of the character
       {
        //Bool game is over for other actions
        gameOver = true;
        surface.style.animationPlayState = "paused"
        enemy.style.animationPlayState = "paused"
        dragon.style.animationPlayState = "paused"
        clearInterval(levelZero);
        clearInterval(levelOne);
        clearInterval(levelTwo);
        clearInterval(levelThree);
        clearInterval(levelFour);
        clearInterval(levelFive);
        //fade
         fade.style.display = 'flex';  
         setTimeout(() => {
         fade.style.display = 'none';
         }, 1000);
         //Show control panel
        const gamePanel = document.getElementById('gamePanel');
        gamePanel.style.display = "flex";
        document.getElementById('deathMessage').innerText += ' ' + score;
        clearInterval(update);
       }
       //Dragon to enemies relation
       else if (dragonRight <= enemyRight && dragonBottom <= enemyBottom)
       {
           enemy.remove();
       }
      //This will get rid of the enemies that passed without hitting
      else if (enemyLeft < 0 && enemies.length != 1)
             enemy.remove();
}
)}, 100);

const playAgain = document.getElementById('playAgain');
const leave = document.getElementById('leave');

playAgain.addEventListener('click',()=> {location.reload()});
leave.addEventListener('click',()=> {location.href = "./loadingPage.html"});







