let images = [];
let images2 = [];
let currentImageIndex = 0;
let nextImageIndex = 1;
let fade = 0;
let fadeSpeed = 0.005;
let transitioning = false;
let tree;
let person1;
let person2;
let squares = [];
let squares2 = [];
const maxSquares = 5;
let lastSquareAddedFrame = 0;
let sound;
let blank = 0;

function preload() {
  sound = loadSound("Program.wav");
  tree = loadImage("Tree.png");
  images[0] = loadImage("Skies-04.png");
  images[1] = loadImage("Skies-01.png");
  images[2] = loadImage("Skies-03.png");
  images[3] = loadImage("Skies-02.png");
  person1 = loadImage("People-01.png");
  person2 = loadImage("People-13.png");
  images2[0] = loadImage("SkyObjects-01.png");
  images2[1] = loadImage("SkyObjects-01.png");
  images2[2] = loadImage("SkyObjects-02.png");
  images2[3] = loadImage("SkyObjects-02.png");
}

function setup() {
  createCanvas(800, 600);

  setInterval(changeImage, 10000);

  sound.loop();
}

function draw() {
  imageMode(CORNER);

  tint(255, 255 * (1 - fade));
  image(images[currentImageIndex], 0, 0, width, height);

  tint(255, 255 * fade);
  image(images[nextImageIndex], 0, 0, width, height);

  tint(255, 255 * (1 - fade));
  image(images2[currentImageIndex], 0, 0, 200, 200);

  tint(255, 255 * fade);
  image(images2[nextImageIndex], 0, 0, 200, 200);

  if (transitioning) {
    fade += fadeSpeed;
    if (fade >= 1) {
      fade = 0;
      transitioning = false;
      currentImageIndex = nextImageIndex;
    }
  }

  noStroke();
  fill(141, 182, 0, 98);
  rect(0, 450, width, 200);

  tint(255, 220);
  image(tree, 375, 125, tree.width / 1.15, tree.height / 1.15);

  tint(255, 220);
  image(person1, 300, 317, tree.width / 2, tree.height / 2);

  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];

    square.x += square.speedX;
    square.y += square.speedY;

    if (square.y > 350) {
      square.alpha -= 2;
    }

    noStroke();
    fill(255, 164, 219, square.alpha);
    rect(square.x, square.y, square.size, square.size);

    if (square.alpha <= 0) {
      squares.splice(i, 1);
    }
  }

  let elapsedTime = (frameCount - lastSquareAddedFrame) / frameRate();

  if (elapsedTime >= 0.5 && squares.length < maxSquares) {
    for (let i = 0; i < 3; i++) {
      let square = {
        x: random(random(550, 600), random(300, 500)),
        y: random(200, 300),
        size: 10,
        speedX: -1,
        speedY: 1,
        alpha: 220,
      };
      squares.push(square);
    }
  }
  for (let i = squares2.length - 1; i >= 0; i--) {
    let square2 = squares2[i];

    square2.x += square2.speedX;
    square2.y += square2.speedY;

    if (square2.y > 350) {
      square2.alpha -= 2;
    }

    noStroke();
    fill(255, 204, 236, square2.alpha);
    rect(square2.x, square2.y, square2.size, square2.size);

    if (square2.alpha <= 0) {
      squares2.splice(i, 1);
    }
  }

  if (elapsedTime >= 0.5 && squares2.length < maxSquares) {
    for (let i = 0; i < 3; i++) {
      let square2 = {
        x: random(500, 600),
        y: random(200, 300),
        size: 10,
        speedX: -1,
        speedY: 1,
        alpha: 220,
      };
      squares2.push(square2);
    }
  }

  tint(255, blank);
  image(person2, 230, 307, tree.width / 2, tree.height / 2);

  fill(255);
  textFont("Courier New", 14);
  textAlign(CENTER, CENTER);
  text(
    "First letter of seven for waiting\nFirst letter of five meaning to always be by your side\nFirst letter of four that is an deep bond and affection",
    390,
    500
  );
}

function keyTyped() {
  if (key === "l") {
    while (blank < 220) {
      blank = blank + fadeSpeed;

      if (blank === 220) {
        blank = blank;
      }
    }
  }
}
function changeImage() {
  nextImageIndex = (currentImageIndex + 1) % images.length;
  transitioning = true;
}
