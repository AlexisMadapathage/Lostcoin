// character.js

// Gère l'animation de course du personnage
export function setupCharacterAnimation() {
  const hero = document.getElementById("character");
  let frame = 0;

  setInterval(() => {
    const paddedFrame = frame.toString().padStart(3, "0");
    hero.src = `assets/img/run/run_${paddedFrame}.png`;
    frame++;
    if (frame > 42) frame = 0;
  }, 30);
}

// Gère les déplacements du personnage avec les flèches gauche/droite
export function setupCharacterMovement() {
  const hero = document.getElementById("character");

  document.addEventListener("keydown", (event) => {
    let left = parseInt(window.getComputedStyle(hero).left, 10);

const speed = 100; 

    if (event.key === "ArrowRight") {
      hero.style.left = `${left + speed}px`;
    } else if (event.key === "ArrowLeft") {
      hero.style.left = `${left - speed}px`;
    }
  });
}