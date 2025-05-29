export function setupCoinAnimation() {
  const coin = document.getElementById("coin");
  let frame = 0;

  setInterval(() => {
    const padded = (frame + 1).toString().padStart(2, "0");
    coin.src = `assets/img/coin/coin_${padded}.png`;
    frame = (frame + 1) % 10;
  }, 40);
}

// let position = 0;
// let direction = 1;

// setInterval(() => {
//   position += direction * 0.5;
//   if (position > 10 || position < 0) direction *= -1;
//   coin.style.transform = `translateY(${-position}px)`;
// }, 30);