<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Career Jeopardy</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #111;
      color: #fff;
      text-align: center;
    }
    h1 {
      margin: 20px 0;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
      margin: 20px auto;
      width: 90%;
      max-width: 1000px;
    }
    .category {
      background: navy;
      color: white;
      font-weight: bold;
      padding: 15px;
    }
    .cell {
      background: blue;
      color: yellow;
      font-size: 24px;
      font-weight: bold;
      padding: 40px 0;
      cursor: pointer;
    }
    .cell.used {
      background: #222;
      color: #444;
      cursor: default;
    }
    #popup {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9);
      color: white;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
    }
    #popup button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>Career Jeopardy</h1>
  <div id="board"></div>

  <div id="popup">
    <div id="question"></div>
    <button onclick="showAnswer()">Show Answer</button>
    <div id="answer" style="margin-top:15px; font-weight:bold;"></div>
    <button onclick="closePopup()">Close</button>
  </div>

  <script>
    const categories = ["Majors", "Careers", "Skills", "Internships", "Networking"];
    const questions = {
      "Majors": [
        {q: "What is the most popular major at LSU?", a: "Biological Sciences"},
        {q: "Which major focuses on coding and algorithms?", a: "Computer Science"},
        {q: "Name a major that combines biology and engineering.", a: "Biological Engineering"},
        {q: "Which major at LSU leads to CPA eligibility?", a: "Accounting"},
        {q: "What major studies supply chains and logistics?", a: "Industrial Engineering"}
      ],
      "Careers": [
        {q: "What is a common first job for engineering students?", a: "Internship or Co-op"},
        {q: "Which career field works with bridges and roads?", a: "Civil Engineering"},
        {q: "What career works with financial risk and data?", a: "Actuarial Science"},
        {q: "Who designs user-friendly digital products?", a: "UX Designer"},
        {q: "What career field is expected to grow with renewable energy?", a: "Environmental Engineering"}
      ],
      "Skills": [
        {q: "What is the #1 skill employers look for?", a: "Communication"},
        {q: "Which skill is key to solving coding challenges?", a: "Problem-Solving"},
        {q: "What skill involves analyzing and interpreting numbers?", a: "Data Analysis"},
        {q: "What teamwork skill is valued in group projects?", a: "Collaboration"},
        {q: "Which skill helps when adapting to new software quickly?", a: "Technical Flexibility"}
      ],
      "Internships": [
        {q: "When should students start applying for summer internships?", a: "The previous fall"},
        {q: "What platform does LSU use for job postings?", a: "Handshake"},
        {q: "How many internships does LSU recommend before graduation?", a: "At least 1-2"},
        {q: "What document do you almost always need to apply?", a: "Resume"},
        {q: "What’s a common way to turn an internship into a job?", a: "Networking and strong performance"}
      ],
      "Networking": [
        {q: "What LSU event connects students with employers?", a: "Career Expo"},
        {q: "What’s one way to reach out to alumni?", a: "LinkedIn"},
        {q: "What’s the most effective way to follow up after meeting someone?", a: "Send a thank-you email"},
        {q: "What’s an elevator pitch?", a: "A 30-second professional introduction"},
        {q: "What resource connects students with alumni for conversations?", a: "One Conversation"}
      ]
    };

    const board = document.getElementById("board");
    const popup = document.getElementById("popup");
    const questionBox = document.getElementById("question");
    const answerBox = document.getElementById("answer");

    // Build board
    categories.forEach(cat => {
      const div = document.createElement("div");
      div.className = "category";
      div.innerText = cat;
      board.appendChild(div);
    });

    for (let i = 0; i < 5; i++) {
      categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "cell";
        div.innerText = (i+1)*100;
        div.onclick = () => showQuestion(cat, i, div);
        board.appendChild(div);
      });
    }

    function showQuestion(cat, i, cell) {
      if (cell.classList.contains("used")) return;
      cell.classList.add("used");
      popup.style.display = "flex";
      questionBox.innerText = questions[cat][i].q;
      answerBox.innerText = "";
      answerBox.dataset.answer = questions[cat][i].a;
    }

    function showAnswer() {
      answerBox.innerText = "Answer: " + answerBox.dataset.answer;
    }

    function closePopup() {
      popup.style.display = "none";
    }
  </script>
</body>
</html>
