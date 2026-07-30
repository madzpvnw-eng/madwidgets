/* ==========================
   ELEMENTS
========================== */

const titleInput = document.getElementById("titleInput");

const currentInput = document.getElementById("currentInput");

const targetInput = document.getElementById("targetInput");

const progressTitle = document.getElementById("progressTitle");

const currentValue = document.getElementById("currentValue");

const targetValue = document.getElementById("targetValue");

const progressBar = document.getElementById("progressBar");

const progressPercent = document.getElementById("progressPercent");

const saveBtn = document.getElementById("saveBtn");

const resetBtn = document.getElementById("resetBtn");


/* ==========================
   STORAGE
========================== */

const PROGRESS_BAR_STORAGE_KEY = "progress-bar";


/* ==========================
   SAVE
========================== */

function saveData(){

    const data = {

        title: titleInput.value,

        current: Number(currentInput.value),

        target: Number(targetInput.value)

    };

    localStorage.setItem(

        PROGRESS_BAR_STORAGE_KEY,

        JSON.stringify(data)

    );

}


/* ==========================
   LOAD
========================== */

function loadData(){

    const data = JSON.parse(

        localStorage.getItem(

            PROGRESS_BAR_STORAGE_KEY

        )

    );

    if(!data) return;

    titleInput.value = data.title;

    currentInput.value = data.current;

    targetInput.value = data.target;

}


/* ==========================
   UPDATE
========================== */

function updateProgress(){

    const title =

        titleInput.value.trim() ||

        "My Progress";

    const current =

        Number(currentInput.value);

    const target =

        Math.max(

            Number(targetInput.value),

            1

        );

    const percent =

        Math.min(

            (current / target) * 100,

            100

        );

    progressTitle.textContent =

        title;

    currentValue.textContent =

        current;

    targetValue.textContent =

        target;

    progressPercent.textContent =

        `${percent.toFixed(1)}%`;

    progressBar.style.width =

        `${percent}%`;

}


/* ==========================
   EVENTS
========================== */

saveBtn.addEventListener(

    "click",

    () => {

        saveData();

        updateProgress();

    }

);


resetBtn.addEventListener(

    "click",

    () => {

        titleInput.value = "";

        currentInput.value = 0;

        targetInput.value = 100;

        localStorage.removeItem(

            PROGRESS_BAR_STORAGE_KEY

        );

        updateProgress();

    }

);


titleInput.addEventListener(

    "input",

    updateProgress

);

currentInput.addEventListener(

    "input",

    updateProgress

);

targetInput.addEventListener(

    "input",

    updateProgress

);


/* ==========================
   INIT
========================== */

loadData();

updateProgress();

lucide.createIcons();