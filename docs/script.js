body {
  font-family: Arial, Helvetica, sans-serif;
  background: #0b1c58;
  color: white;
  margin: 0;
  padding: 0;
  text-align: center;
}

header {
  padding: 20px;
  background: #04103d;
  border-bottom: 3px solid gold;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  color: gold;
  text-shadow: 2px 2px #000;
}

#scoreboard {
  margin-top: 10px;
  font-size: 1.2rem;
}

#game-board {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-width: 1000px;
  margin: 30px auto;
}

.tile {
  background: #123499;
  border: 2px solid #000;
  padding: 20px;
  color: gold;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 2px 2px 6px #000;
  transition: background 0.3s;
}

.tile:hover {
  background: #1f4cc4;
}

#controls {
  margin-top: 30px;
}

button {
  background: gold;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
}

button:hover {
  background: #ffd700;
}

#question-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.hidden {
  display: none;
}
