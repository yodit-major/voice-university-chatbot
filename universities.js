// ========================================
// UNIVERSITIES PAGE
// Theme, mobile menu, calendar dropdown, footer year and icons
// are handled by the shared script.js
// ========================================

const universities = [
    {
        name: "Addis Ababa University",
        city: "Addis Ababa",
        type: "Public",
        icon: "🏛️",
        description:
            "One of Ethiopia's leading universities, offering a wide range of academic programs, research opportunities and student resources.",
        website: "https://www.aau.edu.et/"
    },
    {
        name: "Hawassa University",
        city: "Hawassa",
        type: "Public",
        icon: "🏛️",
        description:
            "A comprehensive public university in Hawassa, offering diverse academic programs and opportunities across multiple fields.",
        website: "https://www.hu.edu.et/"
    }
];


const grid = document.getElementById("universities-grid");

const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");

const modalIcon = document.getElementById("modal-icon");
const modalName = document.getElementById("modal-name");
const modalType = document.getElementById("modal-type");
const modalCity = document.getElementById("modal-city");
const modalDescription = document.getElementById("modal-description");
const modalTypeInfo = document.getElementById("modal-type-info");
const modalLocationInfo = document.getElementById("modal-location-info");
const modalButton = document.getElementById("modal-button");

let lastFocused = null;


function refreshIcons() {

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

}


function renderUniversities() {

    grid.innerHTML = "";

    universities.forEach(university => {

        const card = document.createElement("article");

        card.className = "university-card";

        card.innerHTML = `
            <div class="card-top">

                <div class="university-icon">
                    ${university.icon}
                </div>

                <span class="university-type">
                    ${university.type}
                </span>

            </div>

            <h3>
                ${university.name}
            </h3>

            <p class="university-description">
                ${university.description}
            </p>

            <div class="university-location">

                <i data-lucide="map-pin"></i>

                <span>
                    ${university.city}
                </span>

            </div>

            <button
                class="explore-btn"
                data-name="${university.name}"
            >
                View Profile

                <i data-lucide="arrow-right"></i>
            </button>
        `;

        grid.appendChild(card);
    });

    refreshIcons();

    document.querySelectorAll(".explore-btn").forEach(button => {

        button.addEventListener("click", () => {
            openUniversity(button.dataset.name, button);
        });

    });

}


function openUniversity(name, trigger) {

    const university = universities.find(
        item => item.name === name
    );

    if (!university) {
        return;
    }

    modalIcon.textContent = university.icon;

    modalName.textContent = university.name;

    modalType.textContent =
        `${university.type} UNIVERSITY`;

    modalCity.textContent =
        university.city;

    modalDescription.textContent =
        university.description;

    modalTypeInfo.textContent =
        university.type;

    modalLocationInfo.textContent =
        university.city;

    modalButton.onclick = () => {

        window.open(
            university.website,
            "_blank",
            "noopener,noreferrer"
        );

    };

    lastFocused = trigger || document.activeElement;

    modalOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

    modalClose.focus();

    refreshIcons();
}


function closeUniversity() {

    modalOverlay.classList.remove("show");

    document.body.style.overflow = "";

    if (lastFocused) {
        lastFocused.focus();
    }

}


modalClose.addEventListener("click", closeUniversity);


modalOverlay.addEventListener("click", event => {

    if (event.target === modalOverlay) {
        closeUniversity();
    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape" && modalOverlay.classList.contains("show")) {
        closeUniversity();
    }

});


/* INITIALIZE */

renderUniversities();