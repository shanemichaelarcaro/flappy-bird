let playable = false;
let images = {};
let bird;

function setup() {
  createCanvas(312, 624);
  bird = new Bird((width - images.downflap.width) / 2, (height - images.downflap.height) / 2, [images.downflap, images.midflap, images.upflap]);
}

function draw() {
  if (!playable)
    return;

  clear();
  imageMode(CORNER);
  image(images.background, 0, 0, width);
  image(images.base, 0, height - 112);
  bird.rotateRender();
  if (bird.playing) {
    bird.update();
  }
}

function update() {
  console.log('HELLO!');
}

function preload() {
  images.background = loadImage('assets/background.png');
  images.base = loadImage('assets/base.png');
  images.downflap = loadImage('assets/downflap.png');
  images.midflap = loadImage('assets/midflap.png');
  images.upflap = loadImage('assets/upflap.png');
  images.downpipe = loadImage('assets/downpipe.png');
  images.uppipe = loadImage('assets/uppipe.png');
}

function startGame() {
  playable = true;

  hideMainElements(true);
}

function hideMainElements(display) {
  let normalDisplay = display ? 'none' : 'block';
  let oppositeDisplay = display ? 'block' : 'none';

  let canvas = document.getElementById('defaultCanvas0');
  let menuItems = document.getElementsByClassName('menu-screen');

  for (let i = 0; i < menuItems.length; i++) 
    menuItems[i].style.display = normalDisplay;

  canvas.style.display = oppositeDisplay;
}

function keyPressed() {
  if (keyCode === 32) {
    bird.jump();
    bird.playing = true;
  }
}

