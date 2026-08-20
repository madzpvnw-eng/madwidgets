/* ==========================
   ELEMENTS
========================== */

const display = document.getElementById("display");

const status = document.getElementById("status");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");


/* ==========================
   VARIABLES
========================== */

let stopwatchInterval = null;

let startTime = 0;

let elapsedTime = 0;

let isRunning = false;


/* ==========================
   FORMAT
========================== */

function formatTime(time){

    const hours = Math.floor(time / 3600000);

    const minutes = Math.floor((time % 3600000) / 60000);

    const seconds = Math.floor((time % 60000) / 1000);

    const centiseconds = Math.floor((time % 1000) / 10);

    return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}.${String(centiseconds).padStart(2,"0")}`;

}


/* ==========================
   UPDATE DISPLAY
========================== */

function updateDisplay(){

    const currentTime = performance.now();

    const time = elapsedTime + (currentTime - startTime);

    display.textContent = formatTime(time);

}


/* ==========================
   START
========================== */

function startStopwatch(){

    if(isRunning) return;

    isRunning = true;

    startTime = performance.now();

    stopwatchInterval = setInterval(

        updateDisplay,

        10

    );

    status.textContent = "Running";

}


/* ==========================
   PAUSE
========================== */

function pauseStopwatch(){

    if(!isRunning) return;

    elapsedTime += performance.now() - startTime;

    clearInterval(stopwatchInterval);

    isRunning = false;

    status.textContent = "Paused";

}


/* ==========================
   RESET
========================== */

function resetStopwatch(){

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    isRunning = false;

    startTime = 0;

    elapsedTime = 0;

    display.textContent = "00:00:00.00";

    status.textContent = "Ready";

}


/* ==========================
   EVENTS
========================== */

startBtn.addEventListener(

    "click",

    startStopwatch

);

pauseBtn.addEventListener(

    "click",

    pauseStopwatch

);

resetBtn.addEventListener(

    "click",

    resetStopwatch

);


/* ==========================
   INIT
========================== */

display.textContent = "00:00:00.00";

status.textContent = "Ready";

lucide.createIcons();