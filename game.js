//spieler und gegner
var spieler = document.querySelector(".player");

// starting position
spieler.style.bottom = "820vh";
spieler.style.left = "10vw";

//AUDIO
var explosion2 = new Audio("sounds/explosion2.wav");
var flatter = new Audio("sounds/flap2.wav");
var gamoversound = new Audio("sounds/gameo.mp3");
var backgroundmusic = new Audio("sounds/background.wav");

//SCORE
var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

//SCREENSIZE
var spielfeld = document.querySelector(".playground");
var vollbildButton = document.querySelector(".fullscreen");
vollbildButton.addEventListener("click", function () {
  spielfeld.requestFullscreen();
});

//GRAVITY
var a = 0;

//TIMER
var timer = new Timer(30);
var timer1 = new Timer(30);

//GENERATION
var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;

//starship

var timer2 = new Timer(40);
var t = 0;
var body = document.querySelector("body");

function loop() {

  // KEYS & GRAVITY 
  if (keyboard(32)) {
    a = 9 ;
  
  flatter.play()  
  }
  a = a - 0.4;
  spieler.style.bottom = parseInt(spieler.style.bottom) + a + "px";

  //GRAVITY collision with ground is missing
  if (parseInt(spieler.style.bottom)  < -100  || parseInt(spieler.style.bottom)  > 1500) {
    document.querySelector(".gocontainer").style.display = 'flex'
    backgroundmusic.pause()
    gamoversound.play()
    return;
   
  }


  // AUDIO  
  backgroundmusic.play()



  //SCORE
  // the backgroudn moves the player stays at the same position so I will figure this out later
  if (parseInt(spieler.style.bottom) > -800) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  //starships
  t = t + 1;

  if (timer2.ready()) {
    var h = document.createElement("img");

    h.classList.add("starship");
    h.style.bottom = Math.random() * 105 + -5 + "vh";
    h.style.width = Math.random() * 220 + 150 + "px";

    if (parseInt(h.style.width) > 230 && parseInt(h.style.width) < 260) {
      h.src = "graphic/duck.png";
    } else {
      h.src = "graphic/starship.png";
    }

    h.style.right = "-400px";
    spielfeld.appendChild(h);
  }

  var starships = document.querySelectorAll(".starship");
  for (var starship of starships) {
    starship.style.right =
      parseInt(starship.style.right) +  12    + "px";
    if (parseInt(starship.style.right) > 2500 ) {
      starship.parentNode.removeChild(starship);
    }
  }
    // KOLLISION;
  // Kommentar: sobald der Spieler1 mit Gegner1 oder 2 kollidiert, ist das Spiel fertig; schaut nur ob kollision passiert
  if (anyCollision(spieler, starships)) {
    explosion2.play()
    document.querySelector(".gocontainer").style.display = 'flex'
    backgroundmusic.pause()
    gamoversound.play()
    return;
  }

  
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
