/* ==========================
   ELEMENTS
========================== */

const timer = document.getElementById("timer");

const minutesText = document.getElementById("minutes");

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");


/* ==========================
   STATE
========================== */

let focusMinutes = 25;

let totalSeconds = focusMinutes * 60;

let interval = null;

let running = false;


/* ==========================
   DISPLAY
========================== */

function updateTimer() {

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function updateMinutes() {

    minutesText.textContent = `${focusMinutes} min`;

}


/* ==========================
   START
========================== */

function startTimer() {

    if (running) return;

    running = true;

    interval = setInterval(() => {

        if (totalSeconds > 0) {

            totalSeconds--;

            updateTimer();

        } else {

            clearInterval(interval);

            running = false;

        }

    }, 1000);

}


/* ==========================
   PAUSE
========================== */

function pauseTimer() {

    clearInterval(interval);

    running = false;

}


/* ==========================
   RESET
========================== */

function resetTimer() {

    pauseTimer();

    totalSeconds = focusMinutes * 60;

    updateTimer();

}


/* ==========================
   DURATION
========================== */

minusBtn.addEventListener("click", () => {

    if (running) return;

    if (focusMinutes > 5) {

        focusMinutes -= 5;

        totalSeconds = focusMinutes * 60;

        updateMinutes();

        updateTimer();

    }

});

plusBtn.addEventListener("click", () => {

    if (running) return;

    if (focusMinutes < 120) {

        focusMinutes += 5;

        totalSeconds = focusMinutes * 60;

        updateMinutes();

        updateTimer();

    }

});


/* ==========================
   BUTTONS
========================== */

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);


/* ==========================
   INIT
========================== */

updateMinutes();

updateTimer();

lucide.createIcons();