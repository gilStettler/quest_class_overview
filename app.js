const quizData = [
  {
    question: "Welche Rolle spielst du am liebsten?",
    options: [
      { text: "Frontlinie & Schutz", classes: ["Fighter", "Invoker"] },
      { text: "Unterstützung & Kontrolle", classes: ["Doctor", "Wizard"] },
      { text: "Heimlich & taktisch", classes: ["Spy", "Magician"] },
      { text: "Flexibel & naturverbunden", classes: ["Ranger", "Naturalist"] }
    ]
  },
  {
    question: "Wie gehst du Probleme an?",
    options: [
      { text: "Direkt und entschlossen", classes: ["Fighter"] },
      { text: "Mit Planung und Geduld", classes: ["Spy", "Ranger"] },
      { text: "Kreativ und unkonventionell", classes: ["Magician", "Naturalist"] },
      { text: "Analytisch und bedacht", classes: ["Doctor", "Wizard"] }
    ]
  },
  {
    question: "Wie wichtig ist Magie für dich?",
    options: [
      { text: "Zentraler Bestandteil", classes: ["Wizard", "Magician"] },
      { text: "Thematisch / spirituell", classes: ["Invoker", "Naturalist"] },
      { text: "Nur unterstützend", classes: ["Doctor"] },
      { text: "Gar nicht", classes: ["Fighter", "Spy", "Ranger"] }
    ]
  },
  {
    question: "Was reizt dich am meisten?",
    options: [
      { text: "Kampf & Action", classes: ["Fighter", "Invoker"] },
      { text: "Erkundung & Reisen", classes: ["Ranger"] },
      { text: "Intrigen & Geheimnisse", classes: ["Spy"] },
      { text: "Wissen & Macht", classes: ["Wizard", "Doctor"] }
    ]
  },
  {
    question: "Wie spielst du deinen Charakter?",
    options: [
      { text: "Mutig und entschlossen", classes: ["Fighter", "Invoker"] },
      { text: "Beobachtend und vorsichtig", classes: ["Spy", "Doctor"] },
      { text: "Verspielt und kreativ", classes: ["Magician"] },
      { text: "Instinktiv und frei", classes: ["Naturalist", "Ranger"] }
    ]
  }
];

const container = document.getElementById("quiz-container");
const startBtn = document.getElementById("startQuiz");

let current = 0;
let scores = {};

startBtn.onclick = startQuiz;

function startQuiz() {
  scores = {};
  current = 0;
  startBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const q = quizData[current];
  container.innerHTML = `
    <div class="quiz-question">
      <h3>${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((o, i) =>
          `<button onclick="answer(${i})">${o.text}</button>`
        ).join("")}
      </div>
    </div>
  `;
}

function answer(index) {
  const selected = quizData[current].options[index];
  selected.classes.forEach(c => {
    scores[c] = (scores[c] || 0) + 1;
  });

  current++;
  if (current < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(e => e[0]);

  container.innerHTML = `
    <div class="result">
      <h3>Empfohlene Klasse: ${sorted[0]}</h3>
      <p>Weitere passende Optionen:</p>
      <ul>
        <li>${sorted[1] || "-"}</li>
        <li>${sorted[2] || "-"}</li>
      </ul>
    </div>
  `;

  startBtn.style.display = "block";
  startBtn.textContent = "Quiz erneut starten";
}
