// ==========================================
// THEME
// ==========================================

const STORAGE_KEY = "theme";

// ==========================================
// GET THEME
// ==========================================

function getTheme() {

    return localStorage.getItem(STORAGE_KEY) || "light";

}

// ==========================================
// SET THEME
// ==========================================

function setTheme(theme) {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        STORAGE_KEY,
        theme
    );

}

// ==========================================
// TOGGLE THEME
// ==========================================

function toggleTheme() {

    const currentTheme = getTheme();

    const newTheme =
        currentTheme === "light"
            ? "dark"
            : "light";

    setTheme(newTheme);

    return newTheme;

}

// ==========================================
// INITIALIZE
// ==========================================

setTheme(getTheme());