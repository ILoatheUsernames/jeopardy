// ---------- ROUND 1 DATA ----------
const categories = ["Majors","Careers","Skills","Internships","Networking"];
const values = [100,200,300,400,500];

const QA = {
  "Majors": [
    {q:"What’s the most common major for pre-med at LSU?", a:"Biological Sciences"},
    {q:"Which major focuses on coding & algorithms?", a:"Computer Science"},
    {q:"Name a major that combines biology & engineering.", a:"Biological Engineering"},
    {q:"Which major studies supply chains & optimization?", a:"Industrial Engineering"},
    {q:"Which tool compares LSU majors to career options?", a:"What Can I Do With This Major?"}
  ],
  "Careers": [
    {q:"What document is often required with a résumé?", a:"Cover letter"},
    {q:"Common first role for new engineers?", a:"Associate Engineer / Intern / Co-op"},
    {q:"Resource for salary & outlook?", a:"O*NET and First Destination Survey"},
    {q:"LSU event connecting students with employers?", a:"Career Expo"},
    {q:"Two ways to gain experience besides internships?", a:"Volunteering; Undergraduate research"}
  ],
  "Skills": [
    {q:"Name a transferable skill.", a:"Communication / Leadership / Problem-solving"},
    {q:"What file format should a resume be in?", a:".pdf"},
    {q:"Hard vs. soft skills?", a:"Hard = technical/certicfications; Soft = interpersonal"},
    {q:"LSU resource to practice interviews?", a:"Mock Interview Program/appointment"},
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
    {q:"Best way to start a LinkedIn profile?", a:"Pro headshot + clear headline"},
    {q:"LSU event to practice networking?", a:"ENR, CID, Expo, CPW"},
    {q:"What’s a technical interview?", a:"Meeting to learn about prospect's technical ability"},
    {q:"Who else is in your network?", a:"Professors, peers, alumni, family, mentors"},
    {q:"Define the hidden job market.", a:"Jobs found via networking, not postings"}
  ]
};
// ---------- ELEMENTS ----------
const board = document.getElementById("board");
const controls = document.getElementById("controls");

// modal
const modal = document.getElementById("modal");
const modalCat = document.getElementById("modalCat");
const modalQ = document.getElementById("modalQ");
const modalA = document.getElementById("modalA");
const revealBtn = document.getElementById("revealBtn");
const backBtn = document.getElementById("backBtn");

// ---------- STATE ----------
let tilesRemaining = 25; // 5x5
let lastTile = null;     // DOM node for tile we opened

// ---------- RENDER ----------
function renderBoard(){
  board.innerHTML = "";

  // headers
  categories.forEach(cat=>{
    const h = document.createElement("div");
    h.className = "cat";
    h.textContent = cat;
    board.appendChild(h);
  });

  // 5 rows of values
  for(let r=0;r<5;r++){
    categories.forEach(cat=>{
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = `$${values[r]}`;
      tile.dataset.cat = cat;
      tile.dataset.row = r;
      tile.addEventListener("click", ()=>openQA(tile));
      board.appendChild(tile);
    });
  }
}

// ---------- MODAL FLOW ----------
function openQA(tile){
  if (tile.classList.contains("used")) return;

  lastTile = tile;
  const cat = tile.dataset.cat;
  const row = Number(tile.dataset.row);
  const {q,a} = QA[cat][row];

  modalCat.textContent = `${cat} — Round 1`;
  modalQ.textContent = `${q} (worth ${values[row]})`;
  modalA.textContent = "Answer: " + a;
  modalA.classList.add("hidden");

  modal.classList.add("show"); // center & show
}

revealBtn.addEventListener("click", ()=>{
  modalA.classList.remove("hidden");
});

backBtn.addEventListener("click", ()=>{
  modal.classList.remove("show");

  // mark tile used
  if (lastTile && !lastTile.classList.contains("used")){
    lastTile.classList.add("used");
    tilesRemaining--;
    lastTile = null;
  }

  // if board finished, show advance button (placeholder)
  if (tilesRemaining === 0){
    controls.innerHTML = `
      <button class="btn primary" id="nextBtn">
        Board 1 Complete — Advance to Round 2
      </button>`;
    document.getElementById("nextBtn").onclick = ()=>{
      alert("Round 2 coming next — once Round 1 is perfect, I’ll wire the rest.");
    };
  }
});

// ---------- INIT ----------
renderBoard();
