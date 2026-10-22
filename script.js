// ========================================
// ETHIO-UNI-GUIDE - MAIN JAVASCRIPT
// ========================================


// ========================================
// ELEMENTS
// ========================================

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const menuButton = document.getElementById("menuButton");
const navbarLinks = document.getElementById("navbarLinks");

const calendarMenu = document.getElementById("calendarMenu");
const calendarMenuButton = document.getElementById("calendarMenuButton");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("welcomeSearch");

const yearElement = document.getElementById("year");


// ========================================
// THEME: LIGHT AND DARK MODE
// ========================================

function setTheme(theme) {

    const selectedTheme = theme === "dark" ? "dark" : "light";

    if (selectedTheme === "dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }

    try {
        localStorage.setItem("theme", selectedTheme);
    } catch (error) {
        // The theme still works if localStorage is unavailable.
    }

    if (themeToggle) {

        const label = selectedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode";

        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("title", label);
    }
}


// Initialize the theme button.

if (themeToggle) {

    setTheme(
        root.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light"
    );

    themeToggle.addEventListener("click", function () {

        const isDark =
            root.getAttribute("data-theme") === "dark";

        setTheme(isDark ? "light" : "dark");

    });

}


// ========================================
// MOBILE NAVIGATION MENU
// ========================================

function setMenu(open) {

    if (!menuButton || !navbarLinks) {
        return;
    }

    navbarLinks.classList.toggle("open", open);

    menuButton.classList.toggle("is-open", open);

    menuButton.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuButton.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
    );
}


// Open and close the mobile menu.

if (menuButton && navbarLinks) {

    menuButton.addEventListener("click", function () {

        const isOpen =
            navbarLinks.classList.contains("open");

        setMenu(!isOpen);

    });


    // Close the menu when a navigation link is clicked.

    navbarLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            setMenu(false);
        });

    });


    // Close the menu when Escape is pressed.

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            setMenu(false);
            closeCalendarMenu();
        }

    });


    // Close the menu when clicking outside.

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navbarLinks.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            navbarLinks.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {
            setMenu(false);
        }

    });


    // Close the mobile menu on larger screens.

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
            setMenu(false);
        }

    });

}


// ========================================
// ACADEMIC CALENDAR DROPDOWN
// ========================================

function closeCalendarMenu() {

    if (!calendarMenu || !calendarMenuButton) {
        return;
    }

    calendarMenu.classList.remove("dropdown-open");

    calendarMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


if (calendarMenu && calendarMenuButton) {

    // Open and close the dropdown.

    calendarMenuButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            calendarMenu.classList.contains("dropdown-open");

        calendarMenu.classList.toggle(
            "dropdown-open",
            !isOpen
        );

        calendarMenuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    });


    // Close the dropdown when a calendar link is selected.

    calendarMenu
        .querySelectorAll(".calendar-menu-list a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeCalendarMenu
            );

        });


    // Close the dropdown when clicking outside.

    document.addEventListener("click", function (event) {

        if (!calendarMenu.contains(event.target)) {
            closeCalendarMenu();
        }

    });

}


// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function performSearch(query) {

    const value = String(query || "").trim();

    // Do not search if the input is empty.

    if (!value) {

        if (searchInput) {
            searchInput.focus();
        }

        return;
    }

    // Redirect to the universities page with the search query.

    const searchURL =
        "universities.html?q=" + encodeURIComponent(value);

    window.location.href = searchURL;
}


// Handle search form submission.

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        performSearch(searchInput.value);

    });

}


// Handle popular search buttons.

document
    .querySelectorAll(".chip[data-query]")
    .forEach(function (chip) {

        chip.addEventListener("click", function () {

            const query = chip.dataset.query;

            if (query) {
                performSearch(query);
            }

        });

    });


// ========================================
// FOOTER YEAR
// ========================================

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// ========================================
// LUCIDE ICONS
// ========================================

function initializeIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons === "function"
    ) {

        window.lucide.createIcons();

    }

}


// Initialize icons after the page loads.

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeIcons
    );

} else {

    initializeIcons();

}


// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement =
            document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ========================================
// ACCESSIBILITY: REDUCE ANIMATIONS
// ========================================

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}