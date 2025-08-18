const rounds = {
  jeopardy: {
    name: "Jeopardy",
    multiplier: 1,
    questions: [
      { question: "Capital of France?", answer: "paris", value: 200 },
      { question: "2 + 2?", answer: "4", value: 400 },
      { question: "Water freezes at ___ °C?", answer: "0", value: 600 },
      { question: "First US president?", answer: "george washington", value: 800 },
      { question: "Square root of 81?", answer: "9", value: 1000 },
    ],
  },
  double: {
    name: "Double Jeopardy",
    multiplier: 2,
    questions: [
      { question: "Largest ocean?", answer: "pacific", value: 400 },
      { question: "3 × 3 × 3?", answer: "27", value: 800 },
      { question: "H2O is known as?", answer: "water", value: 1200 },
      { question: "Who wrote Hamlet?", answer: "shakespeare", value: 1600 },
      { question: "Speed of light ~ ___ km/s?", answer: "300000", value: 2000 },
    ],
  },
  lightning: {
    name: "Lightning Round",
    multiplier: 1,
    questions: [
      { question: "5 × 6?", answer: "30", value: 500 },
      { question: "Opposite of hot?", answer: "cold", value: 500 },
      { question: "Sun rises in the ___?", answer: "east", value: 500 },
      { question: "7 days = ___ week(s)?", answer: "1", value: 500 },
      { question: "Planet known as Red Planet?", answer: "mars", value: 500 },
    ],
  },
  final: {
    name: "Final Jeopardy",
    questions: [
      { question: "What year did man first walk on the moon?", answer: "1969" },
    ],
  },
};

let currentRound = "jeopardy";
let score = 0;

const board = document.getElementById("game-board");
const controls = document.getElementById("controls");
const scoreEl = document.getElementById("score");
const modal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-answer");

let activeQuestion = null;

function renderBoard() {
  board.innerHTML = "";
  controls.innerHTML = "";

  const round = rounds[currentRound];
  round.questions.forEach((q, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = `$${q.value * (round.multiplier || 1)}`;
    tile.onclick = () => openQuestion(i);
    board.appendChild(tile);
  });
}

function openQuestion(index) {
  const round = rounds[currentRound];
  activeQuestion = round.questions[index];
  questionText.textContent = activeQuestion.question;
  modal.classList.remove("hidden");
}

submitBtn.addEventListener("click", () => {
  const userAns = answerInput.value.trim().toLowerCase();
  if (userAns === activeQuestion.answer) {
    score += activeQuestion.value * (rounds[currentRound].multiplier || 1);
  } else {
    score -= activeQuestion.value * (rounds[currentRound].multiplier || 1);
  }
  scoreEl.textContent = score;
  modal.classList.add("hidden");
  answerInput.value = "";
  activeQuestion = null;

  // Check if all questions are done
  if (document.querySelectorAll(".tile").length === 0) {
    nextRound();
  }
});

function nextRound() {
  if (currentRound === "jeopardy") {
    currentRound = "double";
    controls.innerHTML = `<button onclick="renderBoard()">Advance to Double Jeopardy</button>`;
  } else if (currentRound === "double") {
    currentRound = "lightning";
    controls.innerHTML = `<button onclick="renderBoard()">Advance to Lightning Round</button>`;
  } else if (currentRound === "lightning") {
    currentRound = "final";
    startFinalJeopardy();
  } else {
    controls.innerHTML = `<h2>Game Over! Final Score: $${score}</h2>`;
  }
}

function startFinalJeopardy() {
  board.innerHTML = "";
  const q = rounds.final.questions[0];
  questionText.textContent = q.question;
  modal.classList.remove("hidden");

  submitBtn.onclick = () => {
    const userAns = answerInput.value.trim().toLowerCase();
    if (userAns === q.answer) {
      score += 2000; // fixed wager for demo
    } else {
      score -= 2000;
    }
    scoreEl.textContent = score;
    modal.classList.add("hidden");
    controls.innerHTML = `<h2>Game Over! Final Score: $${score}</h2>`;
  };
}

// Initialize first board
renderBoard();
