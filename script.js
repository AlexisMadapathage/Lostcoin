const logo = document.getElementById("logo-bitcoin");

let position = 0;
let direction = 1; // 1 = vers le bas, -1 = vers le haut

function floatLogo() {
  position += direction * 0.4; // Vitesse du mouvement
  logo.style.transform = `translateY(${position}px)`;

  // Inverser la direction après un certain seuil
  if (position > 15 || position < -15) {
    direction *= -1;
  }

  requestAnimationFrame(floatLogo); 
}

floatLogo(); // Démarrer l’animation