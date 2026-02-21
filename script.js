let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");



function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") +
    `<span class="ms">.${String(milliseconds).padStart(3, "0")}</span>`
  );
}



function update() {
  elapsedTime = Date.now() - startTime;
  display.innerHTML = formatTime(elapsedTime);
}



startPauseBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(update, 10);
    running = true;
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    clearInterval(timerInterval);
    running = false;
    startPauseBtn.textContent = "Start";
  }
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  lapCount++;
  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;
  lapsList.prepend(li);
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  lapCount = 0;

  display.innerHTML = "00:00:00<span class='ms'>.000</span>";
  lapsList.innerHTML = "";

  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});



themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme =
    html.dataset.theme === "dark" ? "light" : "dark";
});