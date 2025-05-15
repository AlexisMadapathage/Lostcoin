import { setupCharacterAnimation, setupCharacterMovement } from './character.js';
document.addEventListener("DOMContentLoaded", () => {

  // Logo animation
  const logo = document.getElementById("logo-bitcoin");
  let position = 0;
  let direction = 1; // 1 = vers le bas, -1 = vers le haut

  function floatLogo() {
    position += direction * 0.4; // Vitesse du mouvement
    logo.style.transform = `translateY(${position}px)`;
    if (position > 15 || position < -15) {
      direction *= -1;
    }
    requestAnimationFrame(floatLogo);
  }
  floatLogo(); // Start the animation

  // Go to game-screen
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");

  startButton.addEventListener("click", () => {

    startScreen.classList.remove("active");
    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");
    gameScreen.classList.add("active");
  });

  // Character animation
  setupCharacterAnimation();
  setupCharacterMovement();


  // Background scroll
  const background = document.getElementById("background");
  let bgPosition = 0;

  function scrollBackground() {
    bgPosition -= 80;
    background.style.left = `${bgPosition}px`;
  }

});  