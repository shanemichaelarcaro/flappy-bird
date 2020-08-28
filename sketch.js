let playable = false;
const images = {};
let font;
let bird;
let pipeManager;
let end;
let tick = 0;
let resetButton;
let menu = false;

/**
 * Used to create the game board and set initial values.
 */
p5.disableFriendlyErrors = true;
function setup() {
  createCanvas(312, 624);
  bird = new Bird((width - images.downflap.width) / 2, (height - images.downflap.height) / 2, 
  [images.downflap, images.midflap, images.upflap]);
  pipeManager = new PipeManager(images.uppipe, images.downpipe);
  end = new End([images.bronze, images.silver, images.gold, images.platinum, images.over, images.board, images.new]);
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

  if (!bird.gameOver) {
    const fontWeight = textWidth(pipeManager.score / 2);
    renderText(pipeManager.score / 2, (width - fontWeight) / 2, 100, 30, 5);
  }
  else {
    end.render(pipeManager.score / 2);
    end.update();

    // Only run this code when button is undefined (runs it once)
    if (resetButton == undefined) {
      resetButton = createImg('assets/start.png');
      resetButton.position(495, 500);
      resetButton.size(100, 100);
      resetButton.mousePressed(resetGame);
    }
    const fontWeight = textWidth(pipeManager.highscore / 2);
    renderText(pipeManager.highscore / 2, end.x + 179 + fontWeight / 2, 310, 20, 5);

    // If new highscore is detected render new
    if (pipeManager.newHighscore)
      image(images.new, end.x + 140, 295, 32, 14);
  }
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


  images.bronze = loadImage('assets/bronze.png');
  images.silver = loadImage('assets/silver.png');
  images.gold = loadImage('assets/gold.png');
  images.platinum = loadImage('assets/platinum.png');
  images.over = loadImage('assets/over.png');
  images.board = loadImage('assets/board.png');
  images.new = loadImage('assets/new.png');
  images.start = loadImage('assets/start.png');


  font = loadFont('04B_19__.TTF');
}

/**
 * 
 * @param {String} string text to be renderd 
 * @param {integer} x the x location of the text
 * @param {integer} y the y location of the text
 * @param {integer} size the size of the text
 * @param {integer} weight the stroke weight of the text
 */
function renderText(string, x, y, size, weight) {
  push();
  textFont(font);
  fill(255);
  stroke(0);
  strokeWeight(weight);
  textSize(size);
  text(string, x, y);
  pop();
}

/**
 * Starts the game
 */
function startGame() {
  playable = true;
  hideMainElements(true);
}

/**
 * Resets the game
 */
function resetGame() {
  bird.x = (width - images.downflap.width) / 2;
  bird.y = (height - images.downflap.height) / 2;
  bird.time = 0;
  bird.gameOver = false;
  bird.playing = false;
  bird.angle = 0;
  end.x = -97;
  resetButton.remove();
  resetButton = undefined;
  pipeManager.score = 0;
  pipeManager.pipes.splice(0, pipeManager.pipes.length);
  pipeManager.newHighscore = false;
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
  menu = true;
}

/**
 * Checks for which key is being pressed.
 */
function keyPressed() {
  if (keyCode === 32) {
    if (menu) {
      if (!bird.gameOver)
        bird.jump();
    bird.playing = true;
  }
    }
    
}
