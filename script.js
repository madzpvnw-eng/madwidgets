const grid = document.getElementById("widget-grid");
const searchInput = document.getElementById("widget-search");
const count = document.getElementById("widget-count");
const emptyState = document.getElementById("empty-state");
let activeCategory = "all";
function refreshIcons() {
    if (window.lucide) lucide.createIcons();
}

function previewMarkup(widget) {
    switch (widget.preview) {
        case "clock":
            return `<div class="preview-clock"><strong>10:32</strong><span>Wednesday · 20 August 2026</span></div>`;
        case "analog":
            return `<div class="preview-analog"><span class="hand hour"></span><span class="hand minute"></span><span class="pin"></span></div>`;
        case "countdown":
            return `<div class="preview-countdown"><b>12</b><b>08</b><b>41</b></div>`;
        case "stopwatch":
            return `<div class="preview-stopwatch"><strong>00:24.18</strong><span>STOPWATCH</span></div>`;
        case "flip":
            return `<div class="preview-flip"><b>10</b><b>32</b></div>`;
        case "pomodoro":
            return `<div class="preview-ring"><strong>24:18</strong></div>`;
        case "progress":
            return `<div class="preview-progress"><strong>2026 progress</strong><div><i></i></div><span>68%</span></div>`;
        case "streak":
            return `<div class="preview-streak"><strong>07</strong><span>day streak</span></div>`;
        case "calendar":
            return `<div class="preview-calendar"><strong>August 2026</strong><div class="mini-days">M T W T F S S</div><div class="mini-grid">3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 <b>20</b> 21 22</div></div>`;
        case "weather":
            return `<div class="preview-weather"><strong>27°</strong><span>Partly cloudy</span></div>`;
        case "quote":
            return `<div class="preview-quote">“Make it simple, but significant.”<small>Daily Quote</small></div>`;
        case "world":
            return `<div class="preview-world"><div><strong>Jakarta</strong><span>10:32</span></div><div><strong>Tokyo</strong><span>12:32</span></div><div><strong>London</strong><span>03:32</span></div></div>`;
        case "day":
            return `<div class="preview-day"><strong>10:32</strong><div><i></i></div><span>43% of day</span></div>`;
        case "habit":
            return `<div class="preview-habit"><strong>5 / 7</strong><span>days complete</span></div>`;
        case "water":
            return `<div class="preview-water"><strong>6 / 8</strong><span>glasses</span></div>`;
        case "notes":
            return `<div class="preview-notes"><i data-lucide="sticky-note"></i><span>Quick idea...</span></div>`;
        case "words":
            return `<div class="preview-words"><strong>248</strong><span>words</span></div>`;
        case "case":
            return `<div class="preview-case"><b>Title Case</b><span>UPPER · lower</span></div>`;
        case "age":
            return `<div class="preview-age"><strong>21</strong><span>years old</span></div>`;
        case "date":
            return `<div class="preview-date"><strong>42 days</strong><span>between dates</span></div>`;
        case "timezone":
            return `<div class="preview-world"><div><strong>Jakarta</strong><span>10:32</span></div><div><strong>Tokyo</strong><span>12:32</span></div><div><strong>London</strong><span>03:32</span></div></div>`;
        default:
            return `<div class="preview-generic"><i data-lucide="${widget.icon}"></i></div>`;
    }
}

function createCard(widget) {
    return `
        <a href="${widget.link}" class="widget-card" data-name="${widget.title.toLowerCase()} ${widget.description.toLowerCase()}" data-category="${widget.category}">
            <div class="preview">${previewMarkup(widget)}</div>
            <div class="card-info">
                <div class="card-title-row">
                    <h3>${widget.title}</h3>
                    <span class="tag">${widget.label}</span>
                </div>
                <p>${widget.description}</p>
                <span class="open">Open widget <span>→</span></span>
            </div>
        </a>
    `;
}

function renderWidgets() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = widgets.filter(widget => {
        const categoryMatch = activeCategory === "all" || widget.category === activeCategory;
        const queryMatch = !query || `${widget.title} ${widget.description} ${widget.label}`.toLowerCase().includes(query);
        return categoryMatch && queryMatch;
    });

    grid.innerHTML = filtered.map(createCard).join("");
    count.textContent = `${filtered.length} widget${filtered.length === 1 ? "" : "s"}`;
    emptyState.hidden = filtered.length !== 0;
    if (window.lucide) lucide.createIcons();
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        activeCategory = button.dataset.category;
        renderWidgets();
    });
});

searchInput.addEventListener("input", renderWidgets);

document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== searchInput) {
        event.preventDefault();
        searchInput.focus();
    }
});

// Theme is managed centrally by assets/js/theme.js.
setTheme(getTheme());
renderWidgets();
