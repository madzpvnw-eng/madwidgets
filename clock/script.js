// ==========================================
// ELEMENTS
// ==========================================

const timeElement = document.getElementById("time");

const dateElement = document.getElementById("date");

const themeButton = document.getElementById("theme-toggle");

// ==========================================
// CLOCK
// ==========================================

function updateClock() {

    const now = new Date();

    timeElement.textContent = now.toLocaleTimeString(
        "en-GB",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }
    );

    dateElement.textContent = now.toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}

// ==========================================
// INITIALIZE
// ==========================================

updateClock();

setInterval(updateClock, 1000);