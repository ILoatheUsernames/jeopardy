// ---- ROUND DATA ------------------------------------------------------------
const rounds = [
  {
    key: "jeopardy",
    label: "Round 1",
    categories: ["Majors","Careers","Skills","Internships","Networking"],
    values: [100,200,300,400,500],
    questions: {
      "Majors": [
        {q:"What’s the most common major for pre-med at LSU?", a:"Biological Sciences"},
        {q:"Which major focuses on coding & algorithms?", a:"Computer Science"},
        {q:"Name a major that combines biology & engineering.", a:"Biological Engineering"},
        {q:"Which major studies supply chains & optimization?", a:"Industrial Engineering"},
        {q:"Which tool compares LSU majors to career options?", a:"MyMajors / What Can I Do With This Major?"}
      ],
      "Careers": [
        {q:"What document is often required with a résumé?", a:"Cover letter"},
        {q:"Common first role for new engineers?", a:"Associate Engineer / Intern / Co-op"},
        {q:"Resource for salary & outlook?", a:"O*NET or BLS"},
        {q:"LSU event connecting students with employers?", a:"Career Expo"},
        {q:"Two ways to gain experience besides internships?", a:"Volunteering; Undergraduate research"}
      ],
      "Skills": [
        {q:"Name a transferable skill.", a:"Communication / Leadership / Problem-solving"},
        {q:"Software widely used for résumés?", a:"Microsoft Word"},
        {q:"Hard vs. soft skills?", a:"Hard = technical; Soft = interpersonal"},
        {q:"LSU resource to practice interviews?", a:"Mock Interview Program"},
        {q:"STAR method is used for…", a:"Structuring interview answers"}
      ],
      "Internships": [
        {q:"Can freshmen get internships? (T/F)", a:"True"},
        {q:"Platform LSU uses for postings?", a:"Handshake"},
        {q:"Best time to apply for summer internships?", a:"Previous fall"},
        {q:"Paid DC opportunity program?", a:"LSU DC Internship Program"},
        {q:"One key difference between internship & co-op?", a:"Co-op is longer/full-time & alternates with classes"}
      ],
      "Networking": [
        {q:"Best way to start a LinkedIn profile?", a:"Pro photo + clear headline"},
        {q:"LSU event to practice networking?", a:"Networking Receptions"},
        {q:"What’s an informational interview?", a:"Meeting to learn about someone’s career"},
        {q:"Who else is in your network?", a:"Professors, peers, alumni, family, mentors"},
        {q:"Define the hidden job market.", a:"Jobs found via networking, not postings"}
      ]
    }
  },
  {
    key: "double",
    label: "Round 2",
    // Same categories; double values
    categories: ["Majors","Careers","Skills","Internships","Networking"],
    values: [200,400,600,800,1000],
    questions: {} // we’ll reuse Round 1 questions text for the demo
  },
  {
    key: "lightning",
    label: "Lightning #1",
    lightningPoints: [5,10,15], // whiteboard answers
    questions: [
      {q:"Which LSU office helps explore majors & careers?", a:"Olinde Career Center"},
      {q:"CAD stands for…", a:"Computer-Aided Design"},
      {q:"Ohm’s Law formula?", a:"V = I × R"}
    ]
  },
  {
    key: "lightning2",
    label: "Final Lightning",
    lightningPoints: [10,15,20,25,30],
    questions: [
      {q:"Which branch designs machinery and thermal systems?", a:"Mechanical Engineering"},
      {q:"Haber process synthesizes…", a:"Ammonia (NH3)"},
      {q:"Property: resistance to permanent deformation?", a:"Hardness"},
      {q:"Smallest unit of data in computing?", a:"Bit"},
      {q:"Principle behind wing lift?", a:"Bernoulli’s Principle"}
    ]
  },
  {
    key: "final",
    label: "Final Round",
    finalQ: { q:"Write one specific step you’ll take this week toward your career goals.", a:"(Subjective—award points at host’s discretion.)" }
  }
];

// For Round 2, re-use text from Round 1 (so you don’t have to retype)
rounds[1].questions = JSON.parse(JSON.stringify(rounds[0].questions));

// ---- STATE -----------------------------------------------------------------
let roundIndex = 0;
let score = 0;
let tilesRemaining = 0;
let lastClickedTile = null;

// ---- ELEMENTS --------------------------------------------------------------
const board = document.getElementById("game-board");
const controls = document.getElementById("controls");
const scoreEl = document.getElementById("score");
const roundLabel = document.getElementById("roundLabel");
const modal = document.getElementById("modal");
const modalCat = document.getElementById("modal-category");
const qText = document.getElementById("question-text");
const aText = document.getElementById("answer-text");
const revealBtn = document.getElementById("revealBtn");
const backBtn = document.getElementById("backBtn");

// ---- RENDERERS -------------------------------------------------------------
function renderRound(){
  const r = rounds[roundIndex];
  roundLabel.textContent = `· ${r.label}`;
  controls.innerHTML = "";
  aText.classList.add("hidden");
  aText.textContent = "";

  // Lightning / Final handled separately
  if (r.key.startsWith("lightning")) return renderLightning(r);
  if (r.key === "final") return renderFinal(r);

  // Jeopardy/Double boards
  board.innerHTML = "";
  tilesRemaining = 25;

  // headers
  r.categories.forEach(cat=>{
    const h = document.createElement("div");
    h.className = "category";
    h.textContent = cat;
    board.appendChild(h);
  });

  // 5 rows of values
  for(let row=0; row<5; row++){
    r.categories.forEach(cat=>{
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.cat = cat;
      tile.dataset.row = row;
      tile.textContent = `$${r.values[row]}`;
      tile.addEventListener("click", ()=>openQuestion(tile));
      board.appendChild(tile);
    });
  }
}

function renderLightning(r){
  board.innerHTML = "";
  tilesRemaining = r.questions.length;

  // Single row of blank tiles; points shown on question screen
  r.questions.forEach((_, idx)=>{
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = ""; // keep blank
    tile.dataset.lightIndex = idx;
    tile.addEventListener("click", ()=>openLightning(tile));
    board.appendChild(tile);
  });
}

function renderFinal(r){
  board.innerHTML = "";
  controls.innerHTML = `<button id="playFinal">Play Final Round</button>`;
  document.getElementById("playFinal").onclick = ()=>{
    modal.classList.remove("hidden");
    modalCat.textContent = r.label;
    qText.textContent = r.finalQ.q;
    aText.textContent = "Answer: " + r.finalQ.a;
    aText.classList.add("hidden");
  };
}

// ---- QUESTION HANDLERS -----------------------------------------------------
function openQuestion(tile){
  if (tile.classList.contains("used")) return;

  const r = rounds[roundIndex];
  const cat = tile.dataset.cat;
  const row = parseInt(tile.dataset.row,10);

  const qa = r.questions[cat][row];
  lastClickedTile = tile;

  modalCat.textContent = `${cat} — ${r.label}`;
  qText.textContent = qa.q + `  (worth ${r.values[row]})`;
  aText.textContent = "Answer: " + qa.a;
  aText.classList.add("hidden");

  modal.classList.remove("hidden");
}

function openLightning(tile){
  if (tile.classList.contains("used")) return;

  const r = rounds[roundIndex];
  const idx = parseInt(tile.dataset.lightIndex,10);
  const qa = r.questions[idx];

  lastClickedTile = tile;

  modalCat.textContent = r.label;
  qText.textContent = qa.q + `  (worth ${r.lightningPoints[idx]} pts)`;
  aText.textContent = "Answer: " + qa.a;
  aText.classList.add("hidden");

  modal.classList.remove("hidden");
}

// Reveal + Back
revealBtn.onclick = ()=> aText.classList.remove("hidden");

backBtn.onclick = ()=>{
  modal.classList.add("hidden");
  // mark used
  if (lastClickedTile && !lastClickedTile.classList.contains("used")){
    lastClickedTile.classList.add("used");
    tilesRemaining--;
    lastClickedTile = null;
  }
  maybeAdvance();
};

// ---- PROGRESSION -----------------------------------------------------------
function maybeAdvance(){
  if (tilesRemaining > 0) return;

  if (rounds[roundIndex].key === "jeopardy"){
    controls.innerHTML = `<button id="advBtn">Advance to Round 2</button>`;
    document.getElementById("advBtn").onclick = ()=>{ roundIndex++; renderRound(); };
  } else if (rounds[roundIndex].key === "double"){
    controls.innerHTML = `<button id="advBtn">Advance to Lightning #1</button>`;
    document.getElementById("advBtn").onclick = ()=>{ roundIndex++; renderRound(); };
  } else if (rounds[roundIndex].key === "lightning"){
    controls.innerHTML = `<button id="advBtn">Advance to Final Lightning</button>`;
    document.getElementById("advBtn").onclick = ()=>{ roundIndex++; renderRound(); };
  } else if (rounds[roundIndex].key === "lightning2"){
    controls.innerHTML = `<button id="advBtn">Go to Final Round</button>`;
    document.getElementById("advBtn").onclick = ()=>{ roundIndex++; renderRound(); };
  } else if (rounds[roundIndex].key === "final"){
    controls.innerHTML = `<h2>All done! Announce the winner 🎉</h2>`;
  }
}

// (Optional) manual score tweaks for hosts using +/- keys
document.addEventListener("keydown",(e)=>{
  if (e.key === "+"){ score += 100; }
  if (e.key === "-"){ score -= 100; }
  scoreEl.textContent = `$${score}`;
});

// ---- START -----------------------------------------------------------------
renderRound();
