const STORAGE_KEY = "madwidgets-theme";
const DEFAULT_THEME = "light";

function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : DEFAULT_THEME;
}

function updateThemeButtons(theme) {
    document.querySelectorAll(".theme-toggle").forEach((button) => {
        const isDark = theme === "dark";
        const icon = isDark ? "sun" : "moon";
        button.innerHTML = window.lucide
            ? `<i data-lucide="${icon}" aria-hidden="true"></i>`
            : (isDark ? "☼" : "☾");
        button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
        button.setAttribute("title", isDark ? "Light theme" : "Dark theme");
    });
    if (window.lucide) window.lucide.createIcons();
}

function setTheme(theme) {
    const safeTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", safeTheme);
    document.documentElement.style.colorScheme = safeTheme;
    localStorage.setItem(STORAGE_KEY, safeTheme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", safeTheme === "dark" ? "#191919" : "#FFFFFF");
    updateThemeButtons(safeTheme);
    return safeTheme;
}

function toggleTheme() {
    return setTheme(getTheme() === "dark" ? "light" : "dark");
}

setTheme(getTheme());
document.addEventListener("DOMContentLoaded", () => {
    updateThemeButtons(getTheme());
    document.querySelectorAll(".theme-toggle").forEach((button) => {
        button.addEventListener("click", toggleTheme);
    });
});
