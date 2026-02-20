let order = [];
let playerOrder = [];
let level = 0;
let isPlaying = false;

const centerDisplay = document.getElementById("centerDisplay");

const colors = {
  green: document.querySelector(".green"),
  red: document.querySelector(".red"),
  yellow: document.querySelector(".yellow"),
  blue: document.querySelector(".blue"),
};

const shuffleOrder = () => {
  const randomColor = Object.keys(colors)[Math.floor(Math.random() * 4)];
  order.push(randomColor);
};

const lightUp = (color) => {
  colors[color].classList.add("selected");
  setTimeout(() => {
    colors[color].classList.remove("selected");
  }, 400);
};

const playSequence = () => {
  isPlaying = false;

  order.forEach((color, index) => {
    setTimeout(
      () => {
        lightUp(color);
      },
      600 * (index + 1),
    );
  });

  setTimeout(
    () => {
      isPlaying = true;
    },
    600 * order.length + 500,
  );
};

const checkOrder = () => {
  for (let i = 0; i < playerOrder.length; i++) {
    if (playerOrder[i] !== order[i]) {
      gameOver();
      return;
    }
  }

  if (playerOrder.length === order.length) {
    playerOrder = [];
    nextLevel();
  }
};

const clickColor = (event) => {
  if (!isPlaying) return;

  const clickedColor = event.target.dataset.color;
  playerOrder.push(clickedColor);
  lightUp(clickedColor);
  checkOrder();
};

const nextLevel = () => {
  level++;
  centerDisplay.textContent = `Level ${level}`;
  shuffleOrder();
  setTimeout(() => {
    playSequence();
  }, 1000);
};

const startGame = () => {
  order = [];
  playerOrder = [];
  level = 0;
  centerDisplay.textContent = "Level 1";
  nextLevel();
};

const gameOver = () => {
  centerDisplay.textContent = `Game Over! Score: ${level !== 0 ? level - 1 : 0} points.`;
  isPlaying = false;
  order = [];
  playerOrder = [];
  level = 0;

  setTimeout(() => {
    centerDisplay.textContent = "START";
  }, 2000);
};

Object.values(colors).forEach((color) => {
  color.addEventListener("click", clickColor);
});

centerDisplay.addEventListener("click", () => {
  if (!isPlaying && level === 0) {
    startGame();
  }
});
