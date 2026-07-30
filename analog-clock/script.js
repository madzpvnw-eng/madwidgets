// ========================================
// MADWIDGETS - ANALOG CLOCK
// Version : 0.2
// ========================================

console.log("MadWidgets JS Loaded");

// ========================================
// ELEMENT
// ========================================

const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const dateElement = document.getElementById("date");
const locationName = document.getElementById("location-name");

// ========================================
// HELPER
// ========================================

function pad(number) {
    return String(number).padStart(2, "0");
}

// ========================================
// DIGITAL & ANALOG CLOCK
// ========================================

function updateClock() {

    const now = new Date();

    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Digital Clock
    hours.textContent = pad(h);
    minutes.textContent = pad(m);
    seconds.textContent = pad(s);

    // Analog Clock
    const hourDeg = (h % 12) * 30 + (m * 0.5);
    const minuteDeg = (m * 6) + (s * 0.1);
    const secondDeg = s * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

}

// ========================================
// DATE
// ========================================

function updateDate() {

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}

// ========================================
// LOCATION
// ========================================

async function getLocation() {

    if (!navigator.geolocation) {
        locationName.textContent = "Browser tidak mendukung lokasi";
        return;
    }

    locationName.textContent = "Meminta izin lokasi...";

    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
                );

                const data = await response.json();

                const city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    data.address.county;

                const country = data.address.country;

                locationName.textContent = `${city}, ${country}`;

            } catch (err) {

                console.error(err);
                locationName.textContent = "Gagal mengambil lokasi";

            }

        },

        function(error) {

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    locationName.textContent = "Izin lokasi ditolak";
                    break;

                case error.POSITION_UNAVAILABLE:
                    locationName.textContent = "Lokasi tidak tersedia";
                    break;

                case error.TIMEOUT:
                    locationName.textContent = "Permintaan timeout";
                    break;

                default:
                    locationName.textContent = "Gagal mengambil lokasi";

            }

        }

    );

}

// ========================================
// START
// ========================================

updateClock();
updateDate();
getLocation();

setInterval(updateClock, 1000);
