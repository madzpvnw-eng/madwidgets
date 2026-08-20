let current = new Date();

function render() {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.getElementById("month").textContent =
        months[current.getMonth()] +
        " " +
        current.getFullYear();

    const days = document.getElementById("days");

    days.innerHTML = "";

    const first = new Date(
        current.getFullYear(),
        current.getMonth(),
        1
    ).getDay();

    const total = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0
    ).getDate();

    for (let i = 0; i < first; i++) {

        days.innerHTML += "<div></div>";

    }

    const today = new Date();

    for (let i = 1; i <= total; i++) {

        const div = document.createElement("div");

        div.className = "day";

        div.textContent = i;

        if (

            i === today.getDate() &&

            current.getMonth() === today.getMonth() &&

            current.getFullYear() === today.getFullYear()

        ) {

            div.classList.add("today");

        }

        days.appendChild(div);

    }

}

render();

document.getElementById("prev").onclick = () => {

    current.setMonth(
        current.getMonth() - 1
    );

    render();

};

document.getElementById("next").onclick = () => {

    current.setMonth(
        current.getMonth() + 1
    );

    render();

};