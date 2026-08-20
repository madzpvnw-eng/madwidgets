/* ==========================
   STORAGE
========================== */

const STREAK_TRACKER_STORAGE_KEY = "madwidgets-streak-tracker";

/* ==========================
   ELEMENTS
========================== */

const habitInput = document.getElementById("habitName");
const streakCount = document.getElementById("streakCount");
const progressFill = document.getElementById("progressFill");
const lastCheck = document.getElementById("lastCheck");
const checkBtn = document.getElementById("checkInBtn");

/* ==========================
   DATA
========================== */

let data = JSON.parse(
    localStorage.getItem(STREAK_TRACKER_STORAGE_KEY)
);

if (!data) {

    data = {

        habit: "",

        streak: 0,

        lastCheck: ""

    };

}

/* ==========================
   SAVE
========================== */

function saveData() {

    localStorage.setItem(

        STREAK_TRACKER_STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* ==========================
   UPDATE UI
========================== */

function updateUI() {

    habitInput.value = data.habit;

    streakCount.textContent = `${data.streak} Day${data.streak === 1 ? "" : "s"}`;

    lastCheck.textContent = data.lastCheck || "Never";

    const percent = Math.min(

        (data.streak / 30) * 100,

        100

    );

    progressFill.style.width = `${percent}%`;

}

/* ==========================
   CHECK STREAK
========================== */

function checkStreak() {

    if (!data.lastCheck) return;

    const today = new Date();

    const last = new Date(data.lastCheck);

    today.setHours(0, 0, 0, 0);

    last.setHours(0, 0, 0, 0);

    const diff = Math.floor(

        (today - last) / 86400000

    );

    if (diff > 1) {

        data.streak = 0;

        saveData();

    }

}

/* ==========================
   CHECK IN
========================== */

checkBtn.addEventListener("click", () => {

    const today = new Date()

        .toISOString()

        .split("T")[0];

    if (data.lastCheck === today) {

        alert("You have already checked in today.");

        return;

    }

    data.streak++;

    data.lastCheck = today;

    saveData();

    updateUI();

});

/* ==========================
   HABIT INPUT
========================== */

habitInput.addEventListener("input", () => {

    data.habit = habitInput.value.trim();

    saveData();

});

/* ==========================
   INIT
========================== */

checkStreak();

updateUI();

lucide.createIcons();