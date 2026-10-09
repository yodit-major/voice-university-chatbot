/* =========================================================
   ETHIO-UNI-GUIDE | ACADEMIC PROGRAMS
   Complete JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // -------------------------------------------------------
    // 1. HELPER FUNCTIONS
    // -------------------------------------------------------

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => [
        ...document.querySelectorAll(selector)
    ];

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }

    refreshIcons();

    // -------------------------------------------------------
    // 2. DARK MODE
    // -------------------------------------------------------

    const themeToggle = $("#theme");

    function getSavedTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            // The page still works if storage is unavailable.
        }
    }

    function applyTheme(theme) {
        const selectedTheme =
            theme === "dark" ? "dark" : "light";

        if (selectedTheme === "dark") {
            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );
        } else {
            document.documentElement.removeAttribute(
                "data-theme"
            );
        }

        if (themeToggle) {
            themeToggle.checked = selectedTheme === "dark";
        }

        saveTheme(selectedTheme);
    }

    applyTheme(getSavedTheme() || "light");

    themeToggle?.addEventListener("change", () => {
        applyTheme(
            themeToggle.checked ? "dark" : "light"
        );
    });

    // -------------------------------------------------------
    // 3. MOBILE NAVIGATION
    // -------------------------------------------------------

    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML =
            '<i data-lucide="menu"></i>';

        refreshIcons();
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                navMenu.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            refreshIcons();
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });

        document.addEventListener("click", (event) => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                closeMobileMenu();
            }
        });
    }

    // -------------------------------------------------------
    // 4. UNIVERSITY INFORMATION
    // -------------------------------------------------------

    const universities = {
        aau: {
            name: "Addis Ababa University",
            website: "https://www.aau.edu.et/"
        },

        hawassa: {
            name: "Hawassa University",
            website: "https://www.hu.edu.et/"
        }
    };

    // -------------------------------------------------------
    // 5. ACADEMIC PROGRAM DATA
    // -------------------------------------------------------

    /*
      IMPORTANT:
      These entries are illustrative examples.
      They are not a verified live catalogue of programs.
    */

    const programs = [
        {
            id: 1,
            name: "Mechanical Engineering",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Engineering",
            icon: "cog",
            description:
                "Explore mechanical design, engineering mechanics, manufacturing, and related technical disciplines."
        },

        {
            id: 2,
            name: "Civil Engineering",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Engineering",
            icon: "building-2",
            description:
                "Explore structural design, construction, infrastructure, and civil engineering."
        },

        {
            id: 3,
            name: "Electrical Engineering",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Engineering",
            icon: "zap",
            description:
                "Explore electrical systems, electronics, power, and related engineering disciplines."
        },

        {
            id: 4,
            name: "Computer Science",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Computing",
            icon: "code-2",
            description:
                "Explore programming, algorithms, computing systems, and software development."
        },

        {
            id: 5,
            name: "Physics",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Natural Sciences",
            icon: "atom",
            description:
                "Explore matter, energy, mechanics, and the fundamental principles of physical science."
        },

        {
            id: 6,
            name: "Management",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Business",
            icon: "chart-no-axes-combined",
            description:
                "Explore organizational management, leadership, planning, and business operations."
        },

        {
            id: 7,
            name: "Mechanical Engineering",
            university: "aau",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Engineering",
            icon: "cog",
            description:
                "Explore advanced mechanical engineering study and specialized technical research."
        },

        {
            id: 8,
            name: "Civil Engineering",
            university: "aau",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Engineering",
            icon: "building-2",
            description:
                "Explore advanced civil engineering topics and infrastructure research."
        },

        {
            id: 9,
            name: "Computer Science",
            university: "aau",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Computing",
            icon: "code-2",
            description:
                "Explore advanced computing concepts and specialist areas of computer science."
        },

        {
            id: 10,
            name: "Business Administration",
            university: "aau",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Business",
            icon: "briefcase-business",
            description:
                "Explore business administration, management strategy, and organizational leadership."
        },

        {
            id: 11,
            name: "Mechanical Engineering",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Engineering",
            icon: "cog",
            description:
                "Explore mechanical engineering concepts, technical design, and engineering applications."
        },

        {
            id: 12,
            name: "Civil Engineering",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Engineering",
            icon: "building-2",
            description:
                "Explore infrastructure, construction, structural concepts, and civil engineering applications."
        },

        {
            id: 13,
            name: "Computer Science",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Computing",
            icon: "code-2",
            description:
                "Explore programming, algorithms, software, and computing systems."
        },

        {
            id: 14,
            name: "Plant Science",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Agriculture",
            icon: "sprout",
            description:
                "Explore plant biology, crop production, and agricultural sciences."
        },

        {
            id: 15,
            name: "Nursing",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Health Sciences",
            icon: "heart-pulse",
            description:
                "Explore nursing education, patient care, and related health sciences."
        },

        {
            id: 16,
            name: "Accounting",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Business",
            icon: "calculator",
            description:
                "Explore accounting principles, financial reporting, and business finance."
        },

        {
            id: 17,
            name: "Agricultural Sciences",
            university: "hawassa",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Agriculture",
            icon: "sprout",
            description:
                "Explore advanced agricultural research and specialized agricultural sciences."
        },

        {
            id: 18,
            name: "Business Administration",
            university: "hawassa",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Business",
            icon: "briefcase-business",
            description:
                "Explore management, business strategy, and organizational leadership."
        },

        {
            id: 19,
            name: "Public Health",
            university: "hawassa",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Health Sciences",
            icon: "heart-pulse",
            description:
                "Explore public health, community health, and health research."
        },

        {
            id: 20,
            name: "Computer Science",
            university: "hawassa",
            level: "Postgraduate",
            degree: "Master's Degree",
            field: "Computing",
            icon: "code-2",
            description:
                "Explore advanced computing concepts and specialist areas of computer science."
        },

        {
            id: 21,
            name: "Biology",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Natural Sciences",
            icon: "leaf",
            description:
                "Explore living organisms, ecology, genetics, and biological systems."
        },

        {
            id: 22,
            name: "Sociology",
            university: "aau",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Social Sciences",
            icon: "users",
            description:
                "Explore social institutions, communities, relationships, and social change."
        },

        {
            id: 23,
            name: "History",
            university: "hawassa",
            level: "Undergraduate",
            degree: "Bachelor's Degree",
            field: "Humanities",
            icon: "landmark",
            description:
                "Explore historical events, societies, sources, and interpretations of the past."
        },

        {
            id: 24,
            name: "Public Health",
            university: "aau",
            level: "Doctoral",
            degree: "Doctoral Degree",
            field: "Health Sciences",
            icon: "heart-pulse",
            description:
                "Example doctoral-level research entry. Confirm the exact program and availability with the university."
        }
    ];

    // -------------------------------------------------------
    // 6. DOM ELEMENTS
    // -------------------------------------------------------

    const searchInput = $("#programSearch");
    const clearSearch = $("#clearSearch");

    const universityFilter = $("#universityFilter");
    const degreeFilter = $("#degreeFilter");
    const fieldFilter = $("#fieldFilter");

    const resetButton = $("#resetFilters");
    const emptyReset = $("#emptyReset");

    const programGrid = $("#programGrid");
    const resultsCount = $("#resultsCount");
    const emptyState = $("#emptyState");

    // -------------------------------------------------------
    // 7. HTML ESCAPING
    // -------------------------------------------------------

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (char) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }

    // -------------------------------------------------------
    // 8. FILTER PROGRAMS
    // -------------------------------------------------------

    function filteredPrograms() {
        const query = (
            searchInput?.value || ""
        ).trim().toLowerCase();

        return programs.filter((program) => {
            const university =
                universities[program.university];

            const searchableText = [
                program.name,
                university?.name || "",
                program.degree,
                program.level,
                program.field,
                program.description
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !query || searchableText.includes(query);

            const matchesUniversity =
                !universityFilter ||
                universityFilter.value === "all" ||
                program.university === universityFilter.value;

            const matchesDegree =
                !degreeFilter ||
                degreeFilter.value === "all" ||
                program.level === degreeFilter.value;

            const matchesField =
                !fieldFilter ||
                fieldFilter.value === "all" ||
                program.field === fieldFilter.value;

            return (
                matchesSearch &&
                matchesUniversity &&
                matchesDegree &&
                matchesField
            );
        });
    }

    // -------------------------------------------------------
    // 9. RENDER PROGRAM CARDS
    // -------------------------------------------------------

    function renderPrograms() {
        if (!programGrid) {
            return;
        }

        const matches = filteredPrograms();

        if (resultsCount) {
            resultsCount.textContent =
                `${matches.length} ${matches.length === 1
                    ? "program"
                    : "programs"
                } found`;
        }

        if (clearSearch) {
            clearSearch.hidden = !searchInput?.value;
        }

        if (emptyState) {
            emptyState.hidden = matches.length !== 0;
        }

        programGrid.innerHTML = matches.map((program) => {
            const university =
                universities[program.university];

            const badge =
                program.level === "Undergraduate"
                    ? "Bachelor's"
                    : program.level === "Postgraduate"
                        ? "Master's"
                        : "Doctoral";

            return `
                <article class="program-card">

                    <div class="program-card-top">

                        <span class="program-symbol">
                            <i data-lucide="${escapeHTML(program.icon)}"></i>
                        </span>

                        <span class="degree-badge">
                            ${escapeHTML(badge)}
                        </span>

                    </div>

                    <h3>${escapeHTML(program.name)}</h3>

                    <p class="program-university">

                        <i data-lucide="building-2"></i>

                        <span>
                            ${escapeHTML(university?.name || "University")}
                        </span>

                    </p>

                    <p class="program-description">
                        ${escapeHTML(program.description)}
                    </p>

                    <div class="program-card-bottom">

                        <span class="field-badge">
                            ${escapeHTML(program.field)}
                        </span>

                        <button
                            type="button"
                            class="view-program"
                            data-program-id="${program.id}"
                            aria-label="View details for ${escapeHTML(program.name)}">

                            View details
                            <i data-lucide="arrow-right"></i>

                        </button>

                    </div>

                </article>
            `;
        }).join("");

        refreshIcons();
    }

    // -------------------------------------------------------
    // 10. RESET FILTERS
    // -------------------------------------------------------

    function resetFilters() {
        if (searchInput) {
            searchInput.value = "";
        }

        if (universityFilter) {
            universityFilter.value = "all";
        }

        if (degreeFilter) {
            degreeFilter.value = "all";
        }

        if (fieldFilter) {
            fieldFilter.value = "all";
        }

        renderPrograms();
    }

    // -------------------------------------------------------
    // 11. SEARCH EVENTS
    // -------------------------------------------------------

    searchInput?.addEventListener(
        "input",
        renderPrograms
    );

    // -------------------------------------------------------
    // 12. FILTER EVENTS
    // -------------------------------------------------------

    universityFilter?.addEventListener(
        "change",
        renderPrograms
    );

    degreeFilter?.addEventListener(
        "change",
        renderPrograms
    );

    fieldFilter?.addEventListener(
        "change",
        renderPrograms
    );

    // -------------------------------------------------------
    // 13. CLEAR SEARCH
    // -------------------------------------------------------

    clearSearch?.addEventListener("click", () => {
        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }

        renderPrograms();
    });

    // -------------------------------------------------------
    // 14. RESET BUTTONS
    // -------------------------------------------------------

    resetButton?.addEventListener(
        "click",
        resetFilters
    );

    emptyReset?.addEventListener(
        "click",
        resetFilters
    );

    // -------------------------------------------------------
    // 15. DEGREE-LEVEL CARDS
    // -------------------------------------------------------

    $$(".degree-card[data-level]").forEach((card) => {
        card.addEventListener("click", () => {
            if (!degreeFilter) {
                return;
            }

            degreeFilter.value = card.dataset.level;

            renderPrograms();

            $("#explore-programs")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // -------------------------------------------------------
    // 16. FIELD-OF-STUDY CARDS
    // -------------------------------------------------------

    $$(".field-card[data-field]").forEach((card) => {
        card.addEventListener("click", () => {
            if (!fieldFilter) {
                return;
            }

            fieldFilter.value = card.dataset.field;

            renderPrograms();

            $("#explore-programs")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // -------------------------------------------------------
    // 17. PROGRAM DETAILS MODAL
    // -------------------------------------------------------

    const modal = $("#programModal");
    const modalClose = $("#modalClose");

    const modalDialog = modal?.querySelector(".program-modal");

    const modalUniversity = $("#modalUniversity");
    const modalTitle = $("#modalTitle");
    const modalDescription = $("#modalDescription");

    const modalDegree = $("#modalDegree");
    const modalField = $("#modalField");

    const modalOfficialLink = $("#modalOfficialLink");

    let lastFocusedElement = null;

    function openModal(program) {
        if (!modal || !program) {
            return;
        }

        const university =
            universities[program.university];

        lastFocusedElement = document.activeElement;

        if (modalUniversity) {
            modalUniversity.textContent =
                university?.name || "University";
        }

        if (modalTitle) {
            modalTitle.textContent = program.name;
        }

        if (modalDescription) {
            modalDescription.textContent =
                program.description;
        }

        if (modalDegree) {
            modalDegree.textContent = program.degree;
        }

        if (modalField) {
            modalField.textContent = program.field;
        }

        if (modalOfficialLink) {
            modalOfficialLink.href =
                university?.website || "#";

            modalOfficialLink.target = "_blank";

            modalOfficialLink.rel =
                "noopener noreferrer";
        }

        modal.classList.add("is-open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

        modalClose?.focus();

        refreshIcons();
    }

    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function" &&
            lastFocusedElement.isConnected
        ) {
            lastFocusedElement.focus();
        }
    }

    // Open a program's details.

    programGrid?.addEventListener("click", (event) => {
        const button = event.target.closest(
            "[data-program-id]"
        );

        if (!button) {
            return;
        }

        const programId = Number(
            button.dataset.programId
        );

        const selectedProgram = programs.find(
            (program) => program.id === programId
        );

        openModal(selectedProgram);
    });

    // Close the modal using the close button.

    modalClose?.addEventListener(
        "click",
        closeModal
    );

    // Close the modal by clicking the backdrop.

    modal?.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close the modal with Escape.

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal?.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

    // -------------------------------------------------------
    // 18. AUTOMATIC FOOTER YEAR
    // -------------------------------------------------------

    const year = $("#currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------
    // 19. INITIALIZE PROGRAM DIRECTORY
    // -------------------------------------------------------

    renderPrograms();

});
