// ==========================================
// ELEMENTS
// ==========================================

const timeGrid = document.getElementById("time-grid");

const productivityGrid = document.getElementById("productivity-grid");

const informationGrid = document.getElementById("information-grid");

const themeButton = document.getElementById("theme-toggle");

// ==========================================
// THEME BUTTON
// ==========================================

function updateThemeButton() {

    if (!themeButton) return;

    themeButton.innerHTML =
        getTheme() === "dark"
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

}

themeButton?.addEventListener("click", () => {

    toggleTheme();

    updateThemeButton();

    lucide.createIcons();

});

// ==========================================
// CREATE CARD
// ==========================================

function createCard(widget) {

    return `

        <a href="${widget.link}" class="widget-card">

            <div class="widget-icon">

                <i data-lucide="${widget.icon}"></i>

            </div>

            <h3>${widget.title}</h3>

            <p>${widget.description}</p>

        </a>

    `;

}

// ==========================================
// RENDER WIDGETS
// ==========================================

function renderWidgets() {

    widgets.forEach(widget => {

        const card = createCard(widget);

        switch (widget.category) {

            case "time":

                timeGrid.insertAdjacentHTML(
                    "beforeend",
                    card
                );

                break;

            case "productivity":

                productivityGrid.insertAdjacentHTML(
                    "beforeend",
                    card
                );

                break;

            case "information":

                informationGrid.insertAdjacentHTML(
                    "beforeend",
                    card
                );

                break;

        }

    });

}

// ==========================================
// INITIALIZE
// ==========================================

updateThemeButton();

renderWidgets();

lucide.createIcons();
