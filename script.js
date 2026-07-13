let currentUser = "";

function selectUser(name) {
  currentUser = name;
  document.getElementById("userSelect").style.display = "none";
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("username").innerText = "Hi " + name + " 💖";
  loadData();
}

function saveProgress() {
  let score = 0;

  let habits = ["junk","sugar","water","workout","reading","learn"];

  habits.forEach(h => {
    if(document.getElementById(h).checked) score++;
  });

  localStorage.setItem(currentUser + "_score", score);

  let streak = parseInt(localStorage.getItem(currentUser + "_streak")) || 0;
  if(score === 6) streak++;
  else streak = 0;

  localStorage.setItem(currentUser + "_streak", streak);

  document.getElementById("score").innerText = "Score: " + score + "/6";
  document.getElementById("streak").innerText = "🔥 Streak: " + streak;
}

function loadData() {
  let score = localStorage.getItem(currentUser + "_score") || 0;
  let streak = localStorage.getItem(currentUser + "_streak") || 0;

  document.getElementById("score").innerText = "Score: " + score + "/6";
  document.getElementById("streak").innerText = "🔥 Streak: " + streak;
}
