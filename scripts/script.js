import { setupCharacterAnimation, setupCharacterMovement } from './character.js';
import { setupCoinAnimation } from './coin.js';
import { questions } from '../data/question.js';

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo-bitcoin");
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const background = document.getElementById("background");
  const coin = document.getElementById("coin");
  const backgrounds = Array.from({ length: 10 }, (_, i) => `assets/img/G${i + 1}.png`);


  let position = 0;
  let direction = 1;
  let bgOffset = 0;
  let steps = 0;
  let canTriggerPopup = false;
  let readyForNextScene = false;

  // === Float logo ===
  function floatLogo() {
    position += direction * 0.4;
    logo.style.transform = `translateY(${position}px)`;
    if (position > 15 || position < -15) direction *= -1;
    requestAnimationFrame(floatLogo);
  }

  floatLogo();

  // === Start game ===
  startButton.addEventListener("click", () => {
    startScreen.classList.remove("active");
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameScreen.classList.add("active");
  });

  // === Background scroll ===
  document.addEventListener("keydown", (event) => {
    if (!coin.classList.contains("hidden")) return;

    if (event.key === "ArrowRight") {
      bgOffset -= 40;
      steps++;
    } else if (event.key === "ArrowLeft") {
      bgOffset += 40;
      steps++;
    }

    background.style.backgroundPosition = `${bgOffset}px bottom`;

    if (steps === 30) {
      coin.classList.remove("hidden");
      coin.style.display = "block";
      canTriggerPopup = true;
    }
  });

  // === Coin animation ===
  setupCoinAnimation();

  // === Load question by ID ===
  function loadQuestionById(id) {
    return questions.find(q => q.id === id);
  }

  // === Show popup ===
  let currentQuestionIndex = 0;

  function showQuestionPopup(questionId) {
    const popup = document.getElementById("question-popup");
    const questionText = document.getElementById("popup-question-text");
    const answersContainer = document.getElementById("popup-answers");

    const question = loadQuestionById(questionId);
    if (!question) {
      console.error(`No question found for ID ${questionId}`);
      return;
    }

    questionText.textContent = question.question;
    answersContainer.innerHTML = "";

    question.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => handleAnswerClick(option, question));
      answersContainer.appendChild(btn);
    });

    popup.classList.remove("hidden");
    popup.classList.add("active");
  }

  // === Setup character (with callback) ===
  setupCharacterAnimation();
  setupCharacterMovement(() => {
    if (canTriggerPopup) {
      showQuestionPopup(questions[currentQuestionIndex].id);
      canTriggerPopup = false; // avoid to re-open the popup again and again
    }
  });


  function handleAnswerClick(selected, question) {
    const popup = document.getElementById("question-popup");
    const feedbackPopup = document.getElementById("feedback-popup");
    const feedbackMessage = document.getElementById("feedback-message");
    const continueButton = document.getElementById("continue-button");
    const coin = document.getElementById("coin");
    const background = document.getElementById("background");

    const isCorrect = selected === question.answer;

    // Affichage du message
    feedbackMessage.textContent = isCorrect ? "✅ Correct!" : "❌ Wrong answer!";
    feedbackPopup.classList.remove("hidden");
    feedbackPopup.classList.add(isCorrect ? "success" : "error");

    // Désactive les autres réponses
    const answerButtons = document.querySelectorAll("#popup-answers button");
    answerButtons.forEach(btn => btn.disabled = true);

    // Gestion du bouton "Continuer"
    continueButton.onclick = () => {
      feedbackPopup.classList.add("hidden");
      feedbackPopup.classList.remove("success", "error");
      popup.classList.add("hidden");

      if (isCorrect) {
        readyForNextScene = true; // Autorise la transition par déplacement
        coin.classList.add("hidden");
        coin.style.display = "none";
      } else {
        // Mauvaise réponse : retour au début du jeu
        resetToStart();
      }
    };
  }

  function resetToStart() {
    const character = document.getElementById("character");
    const background = document.getElementById("background");
    const coin = document.getElementById("coin");

    // Revenir au début de la scène actuelle (Gx) en fonction de la question en cours
    background.style.backgroundImage = `url('${backgrounds[currentQuestionIndex]}')`;

    // Réinitialiser la position du perso et du fond
    character.style.left = "60px";
    background.style.backgroundPosition = "0px bottom";

    // Masquer la pièce
    coin.classList.add("hidden");
    coin.style.display = "none";

    // Remettre le compteur de pas à 0
    steps = 0;
    bgOffset = 0;
  }

  function prepareNextScene() {
    const character = document.getElementById("character");
    const background = document.getElementById("background");
    const coin = document.getElementById("coin");

    character.style.left = "60px";
    background.style.backgroundPosition = "0px bottom";

    coin.classList.add("hidden");
    coin.style.display = "none";

    steps = 0;
    bgOffset = 0;
  }

  document.addEventListener("keydown", (event) => {
    if (!readyForNextScene) return;

    const character = document.getElementById("character");
    const characterLeft = parseInt(window.getComputedStyle(character).left, 10);

    if (characterLeft > window.innerWidth) {
      currentQuestionIndex++;

      if (currentQuestionIndex < backgrounds.length) {
        background.style.backgroundImage = `url('${backgrounds[currentQuestionIndex]}')`;
      }

      prepareNextScene(); // repositionner le perso à gauche, cacher la pièce
      readyForNextScene = false;
    }
  });


});