/* ==========================
   ELEMENTS
========================== */

const hourTop = document.getElementById("hourTop");
const hourBottom = document.getElementById("hourBottom");

const minuteTop = document.getElementById("minuteTop");
const minuteBottom = document.getElementById("minuteBottom");

const day = document.getElementById("day");
const date = document.getElementById("date");


/* ==========================
   UPDATE CLOCK
========================== */

function updateClock(){

    const now = new Date();

    const hours = String(now.getHours()).padStart(2,"0");

    const minutes = String(now.getMinutes()).padStart(2,"0");

    hourTop.textContent = hours;
    hourBottom.textContent = hours;

    minuteTop.textContent = minutes;
    minuteBottom.textContent = minutes;

    day.textContent = now.toLocaleDateString(

        "en-US",

        {

            weekday:"long"

        }

    );

    date.textContent = now.toLocaleDateString(

        "en-US",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    );

}


/* ==========================
   INIT
========================== */

updateClock();

setInterval(

    updateClock,

    1000

);

lucide.createIcons();