import { questions } from '../data/question.js';

let animationInterval = null;

export function setupCharacterAnimation() {
  const hero = document.getElementById("character");
  let frame = 0;

  function startAnimation() {
    if (animationInterval) return;
    animationInterval = setInterval(() => {
      const paddedFrame = frame.toString().padStart(3, "0");
      hero.src = `assets/img/run/run_${paddedFrame}.png`;
      frame++;
      if (frame > 42) frame = 0;
    }, 10);
  }

  function stopAnimation() {
    clearInterval(animationInterval);
    animationInterval = null;
    hero.src = "assets/img/run/run_015.png";
  }

  document.addEventListener("keydown", (event) => {
    if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
      startAnimation();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
      stopAnimation();
    }
  });
}

export function setupCharacterMovement(onCoinTouchCallback) {
  const hero = document.getElementById("character");

  document.addEventListener("keydown", (event) => {
    let left = parseInt(window.getComputedStyle(hero).left, 10);
    const speed = 100;

    if (event.key === "ArrowRight") {
      hero.style.left = `${left + speed}px`;
    } else if (event.key === "ArrowLeft") {
      hero.style.left = `${left - speed}px`;
    }

    const coin = document.getElementById("coin");
    if (!coin.classList.contains("hidden") && checkCollision(hero, coin)) {
      console.log("COLLISION!");
      if (onCoinTouchCallback) onCoinTouchCallback();
    }
  });
}

function checkCollision(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}