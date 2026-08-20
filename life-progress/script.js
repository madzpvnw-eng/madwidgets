/* ==========================
   ELEMENTS
========================== */

const birthdayInput = document.getElementById("birthdayInput");
const lifespanInput = document.getElementById("lifespanInput");

const birthdayText = document.getElementById("birthdayText");
const lifespanText = document.getElementById("lifespanText");
const remainingText = document.getElementById("remainingText");

const age = document.getElementById("age");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");

/* ==========================
   STORAGE
========================== */

const LIFE_PROGRESS_STORAGE_KEY = "life-progress";

/* ==========================
   SAVE
========================== */

function saveData() {

    const data = {

        birthday: birthdayInput.value,

        lifespan: Number(lifespanInput.value)

    };

    localStorage.setItem(

        LIFE_PROGRESS_STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* ==========================
   LOAD
========================== */

function loadData() {

    const data = JSON.parse(

        localStorage.getItem(
            LIFE_PROGRESS_STORAGE_KEY
        )

    );

    if (!data) return;

    birthdayInput.value = data.birthday;

    lifespanInput.value = data.lifespan;

}

/* ==========================
   CALCULATE
========================== */

function calculateLifeProgress() {

    if (!birthdayInput.value) return;

    const birth = new Date(birthdayInput.value);

    const now = new Date();

    const lifespan = Number(lifespanInput.value);

    const ageYears =
        (now - birth) /
        (365.25 * 24 * 60 * 60 * 1000);

    const percent =
        Math.min(
            (ageYears / lifespan) * 100,
            100
        );

    const remaining =
        Math.max(
            lifespan - ageYears,
            0
        );

    age.textContent =
        `${ageYears.toFixed(1)} Years Old`;

    progressPercent.textContent =
        `${percent.toFixed(1)}%`;

    progressBar.style.width =
        `${percent}%`;

    birthdayText.textContent =
        birth.toLocaleDateString();

    lifespanText.textContent =
        `${lifespan} Years`;

    remainingText.textContent =
        `${remaining.toFixed(1)} Years`;

}

/* ==========================
   UPDATE
========================== */

function updateWidget() {

    saveData();

    calculateLifeProgress();

}

/* ==========================
   EVENTS
========================== */

saveBtn.addEventListener(

    "click",

    updateWidget

);

editBtn.addEventListener(

    "click",

    () => {

        birthdayInput.focus();

    }

);

birthdayInput.addEventListener(

    "change",

    calculateLifeProgress

);

lifespanInput.addEventListener(

    "input",

    calculateLifeProgress

);

/* ==========================
   INIT
========================== */

loadData();

calculateLifeProgress();

lucide.createIcons();