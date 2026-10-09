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
/* ACADEMIC CALENDAR DROPDOWN */

const calendarMenu = document.querySelector(".calendar-menu");
const calendarButton = document.querySelector(".calendar-menu-btn");

if (calendarMenu && calendarButton) {
    calendarButton.addEventListener("click", function () {
        const isOpen = calendarMenu.classList.toggle("open");

        calendarButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
        if (!calendarMenu.contains(event.target)) {
            calendarMenu.classList.remove("open");
            calendarButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            calendarMenu.classList.remove("open");
            calendarButton.setAttribute("aria-expanded", "false");
            calendarButton.focus();
        }
    });

}

/* UNIVERSITY SWITCHER */

const universityButtons = document.querySelectorAll(".uni-button");
const aauContent = document.getElementById("aauContent");
const hawassaContent = document.getElementById("hawassaContent");

universityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const university = this.dataset.university;

        universityButtons.forEach(function (otherButton) {
            otherButton.classList.remove("active");
        });

        this.classList.add("active");

        if (university === "aau") {
            aauContent.classList.remove("hidden");
            hawassaContent.classList.add("hidden");
        } else if (university === "hawassa") {
            aauContent.classList.add("hidden");
            hawassaContent.classList.remove("hidden");
        }

        const selectedContent = university === "aau"
            ? aauContent
            : hawassaContent;

        selectedContent.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

});

/* LUCIDE ICONS */

if (window.lucide) {
    lucide.createIcons();
}
