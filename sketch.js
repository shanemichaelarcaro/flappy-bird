let playable = false;
const images = {};
let font;
let bird;
let pipeManager;
let tick = 0;

/**
 * Used to create the game board and set initial values.
 */
p5.disableFriendlyErrors = true;
function setup() {
  createCanvas(312, 624);
  bird = new Bird((width - images.downflap.width) / 2, (height - images.downflap.height) / 2, 
  [images.downflap, images.midflap, images.upflap]);
  pipeManager = new PipeManager(images.uppipe, images.downpipe);
  // Limiting frame rate to 60 fps (about)
  frameRate(60);
}

/**
 * Draws and updates varibles. Normally an update method is used to update the state of
 * variables but I have not found a way of implementing this that changes performance.
 */
function draw() {
  if (!playable)
    return;
  
  clear();
  imageMode(CORNER);
  image(images.background, 0, 0, width);
  
  if (bird.playing) {
    bird.update();

    if (!bird.gameOver) {
      pipeManager.update(bird);

      if (pipeManager.pipes.length < 6) {
        tick += 1;
        if (tick % 60 == 0) {
          pipeManager.addPipes();
          tick = 0;
        }
      }
    }
  }
  pipeManager.render();
  bird.rotateRender();

  image(images.base, 0, height - 112);
  stroke(255);
  text(frameRate().toString().substring(0, 2), 10, 20);

  push();
  textFont(font);
  fill(255);
  stroke(0);
  strokeWeight(5);
  textSize(30);
  const fontWidth = textWidth(pipeManager.score / 2);
  text(pipeManager.score / 2, (width - fontWidth) / 2, 100);
  pop();
}

/**
 * Preloads images and fonts into the game
 */
function preload() {
  images.background = loadImage('assets/background.png');
  images.base = loadImage('assets/base.png');
  images.downflap = loadImage('assets/downflap.png');
  images.midflap = loadImage('assets/midflap.png');
  images.upflap = loadImage('assets/upflap.png');
  images.downpipe = loadImage('assets/downpipe.png');
  images.uppipe = loadImage('assets/uppipe.png');

  font = loadFont('04B_19__.TTF');
}

/**
 * Starts the game
 */
function startGame() {
  playable = true;

  hideMainElements(true);
}

/**
 * Toggles screen elements. Used mainly when the player starts the game by pressing
 * the start button.
 * @param {boolean} display used to either show or hide screen elements
 */
function hideMainElements(display) {
  const normalDisplay = display ? 'none' : 'block';
  const oppositeDisplay = display ? 'block' : 'none';

  const canvas = document.getElementById('defaultCanvas0');
  const menuItems = document.getElementsByClassName('menu-screen');

  for (let i = 0; i < menuItems.length; i++) 
    menuItems[i].style.display = normalDisplay;

  canvas.style.display = oppositeDisplay;
}

/**
 * Checks for which key is being pressed.
 */
function keyPressed() {
  if (keyCode === 32) {
    if (!bird.gameOver)
      bird.jump();
    bird.playing = true;
  }
}
