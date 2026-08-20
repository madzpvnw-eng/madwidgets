/* ==========================
   ELEMENTS
========================== */

const locationEl = document.getElementById("location");
const dateEl = document.getElementById("date");
const nextPrayerEl = document.getElementById("nextPrayer");

const prayers = {
    Fajr: document.querySelector("#fajr strong"),
    Dhuhr: document.querySelector("#dhuhr strong"),
    Asr: document.querySelector("#asr strong"),
    Maghrib: document.querySelector("#maghrib strong"),
    Isha: document.querySelector("#isha strong")
};

/* ==========================
   GET LOCATION
========================== */

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getCity(lat, lon);
    getPrayerTimes(lat, lon);

}

function error() {

    locationEl.textContent = "Location not available";

}

/* ==========================
   GET CITY
========================== */

async function getCity(lat, lon) {

    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const data = await res.json();

    const city =
        data.address.city ||
        data.address.town ||
        data.address.county ||
        data.address.state;

    const country = data.address.country;

    locationEl.textContent = `${city}, ${country}`;

}

/* ==========================
   PRAYER API
========================== */

async function getPrayerTimes(lat, lon) {

    const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`
    );

    const data = await res.json();

    const timings = data.data.timings;

    prayers.Fajr.textContent = timings.Fajr;
    prayers.Dhuhr.textContent = timings.Dhuhr;
    prayers.Asr.textContent = timings.Asr;
    prayers.Maghrib.textContent = timings.Maghrib;
    prayers.Isha.textContent = timings.Isha;

    dateEl.textContent = data.data.date.readable;

    highlightNextPrayer(timings);

}

/* ==========================
   NEXT PRAYER
========================== */

function highlightNextPrayer(timings) {

    const prayerOrder = [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"
    ];

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    document
        .querySelectorAll(".prayer-item")
        .forEach(item => item.classList.remove("active"));

    for (const prayer of prayerOrder) {

        const [hour, minute] = timings[prayer]
            .split(":")
            .map(Number);

        const prayerMinutes =
            hour * 60 + minute;

        if (currentMinutes < prayerMinutes) {

            nextPrayerEl.textContent =
                `${prayer} • ${timings[prayer]}`;

            document
                .getElementById(prayer.toLowerCase())
                .classList.add("active");

            return;

        }

    }

    nextPrayerEl.textContent =
        `Fajr • ${timings.Fajr}`;

    document
        .getElementById("fajr")
        .classList.add("active");

}

/* ==========================
   ICONS
========================== */

lucide.createIcons();