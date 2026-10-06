// =========================
// DARK MODE
// =========================
const themeToggle = document.getElementById("theme");
const savedTheme = localStorage.getItem("theme");

// Restore saved theme or respect system preference
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
    localStorage.setItem("theme", this.checked ? "dark" : "light");
});

// =========================
// NAVIGATION
// =========================
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// =========================
// SEARCH
// =========================
const searchButton = document.getElementById("searchButton");
const welcomeSearch = document.getElementById("welcomeSearch");
const navSearchButton = document.getElementById("navSearchButton");

function performSearch() {
    const searchValue = welcomeSearch.value.trim();
    if (!searchValue) {
        welcomeSearch.focus();
        return;
    }
    alert("Searching for: " + searchValue);
}

searchButton.addEventListener("click", performSearch);

welcomeSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});

navSearchButton.addEventListener("click", function () {
    welcomeSearch.focus();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================
// AI ASSISTANT
// =========================
const assistantButton = document.getElementById("assistantButton");
if (assistantButton) {
    assistantButton.addEventListener("click", function () {
        alert("AI Assistant coming soon!");
    });
}

// =========================
// LUCIDE ICONS
// =========================
if (typeof lucide !== "undefined") {
    lucide.createIcons();
}