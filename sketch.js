let playable = false;

function setup() {
  createCanvas(624, 624);
}

function draw() {
  if (!playable)
    return;
  background(220);
}

function startGame() {
  playable = true;

  hideMainElements(true);
}

function hideMainElements(display) {
  let normalDisplay = display ? 'hidden' : 'block';
  let oppositeDisplay = display ? 'block' : 'hidden';

  let canvas = document.getElementById('defaultCanvas0');
  let menuItems = document.getElementsByClassName('menu-screen');

  for (let i = 0; i < menuItems.length; i++) {
    console.log(i, menuItems[i]);
    menuItems[i].style.display = 'none';
  }

  canvas.style.display = oppositeDisplay;
}

