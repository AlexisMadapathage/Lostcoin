export function setupCoinAnimation() {
  const coin = document.getElementById("coin");
  let frame = 0;

  setInterval(() => {
    const padded = (frame + 1).toString().padStart(2, "0");
    coin.src = `assets/img/coin/coin_${padded}.png`;
    frame = (frame + 1) % 10;
  }, 40);
}