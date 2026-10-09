// DARK 
// MODE
// =========================

const themeToggle = document.getElementById("theme");
const savedTheme = localStorage.getItem("theme");

if (
    savedTheme === "dark" ||
    (
        !savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )
) {
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
    localStorage.setItem(
        "theme",
        this.checked ? "dark" : "light"
    );
});


// =========================
// NAVIGATION
// =========================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// =========================
// SEARCH
// =========================

const searchButton = document.getElementById("searchButton");
const welcomeSearch = document.getElementById("welcomeSearch");

function performSearch() {

    const searchValue = welcomeSearch.value.trim();

    if (!searchValue) {
        welcomeSearch.focus();
        return;
    }

    alert("Searching for: " + searchValue);
}

if (searchButton) {
    searchButton.addEventListener("click", performSearch);
}

if (welcomeSearch) {

    welcomeSearch.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            performSearch();
        }

    });

}


// =========================
// LUCIDE ICONS
// =========================

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}