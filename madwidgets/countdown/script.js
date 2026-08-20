/* ==========================
   ELEMENTS
========================== */

const eventInput = document.getElementById("eventName");

const dateInput = document.getElementById("targetDate");

const timeInput = document.getElementById("targetTime");

const applyButton = document.getElementById("applyButton");

const eventTitle = document.getElementById("eventTitle");

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");


/* ==========================
   STATE
========================== */

let countdownDate = null;

let interval = null;


/* ==========================
   HELPERS
========================== */

function pad(value, length = 2) {

    return String(value).padStart(length, "0");

}

function updateDisplay(days, hours, minutes, seconds) {

    daysElement.textContent = pad(days, 3);

    hoursElement.textContent = pad(hours);

    minutesElement.textContent = pad(minutes);

    secondsElement.textContent = pad(seconds);

}


/* ==========================
   RESET
========================== */

function resetCountdown() {

    updateDisplay(0, 0, 0, 0);

}


/* ==========================
   START
========================== */

function startCountdown() {

    clearInterval(interval);

    interval = setInterval(() => {

        const now = new Date().getTime();

        const distance = countdownDate - now;

        if (distance <= 0) {

            clearInterval(interval);

            eventTitle.textContent = "🎉 Time's Up!";

            resetCountdown();

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        updateDisplay(days, hours, minutes, seconds);

    }, 1000);

}


/* ==========================
   APPLY
========================== */

applyButton.addEventListener("click", () => {

    if (!dateInput.value) {

        alert("Please select a date.");

        return;

    }

    if (!timeInput.value) {

        alert("Please select a time.");

        return;

    }

    const eventName = eventInput.value.trim() || "Countdown";

    eventTitle.textContent = eventName;

    countdownDate = new Date(

        `${dateInput.value}T${timeInput.value}`

    ).getTime();

    startCountdown();

});


/* ==========================
   INIT
========================== */

resetCountdown();

lucide.createIcons();
