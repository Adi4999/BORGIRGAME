"use strict";
let play = true;
let score = 0;
let cross = true;
let audio = new Audio("sounds/game.mp3");
let audbor = new Audio("sounds/borgir.mp3");
let audiogo = new Audio("sounds/gameover.mp3");
audio.play();
document.onkeydown = function (e) {
  if (e.key === "ArrowUp") {
    audbor.play();
    console.log(e.key);

    let dino = document.querySelector(".dino");

    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
  if (e.key == "ArrowRight") {
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }
  if (e.key == "ArrowLeft") {
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};
setInterval(() => {
  let dino = document.querySelector(".dino");
  let gameOver = document.querySelector(".gameOver");
  let obstacle = document.querySelector(".obstacle");

  let dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  let dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );

  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);

  if (offsetX < 93 && offsetY < 52) {
    audiogo.play();
    audio.pause();

    gameOver.textContent = "GAME OVER";
    gameOver.style.fontSize = "44px";

    obstacle.classList.remove("obsAni");

    play = false;
  } else if (offsetX < 73 && cross) {
    score += 1;
    updateScore();
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 500);
    setTimeout(() => {
      let aniDur = parseInt(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

const updateScore = function () {
  if (play) {
    let scoreCount = document.querySelector("#scoreCount");
    scoreCount.textContent = `Your score: ${score}`;
  }
};
