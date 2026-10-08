const searchInput = document.getElementById("campus-search");
const categoryCards = document.querySelectorAll(".category-card");
const placeCards = document.querySelectorAll(".place-card");
const placesGrid = document.getElementById("places-grid");
const noResults = document.getElementById("no-results");
const resultsTitle = document.getElementById("results-title");
const resultCount = document.getElementById("result-count");

const modal = document.getElementById("place-modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLocation = document.getElementById("modal-location");
const modalHours = document.getElementById("modal-hours");

let activeCategory = "all";

const placeData = {
    "Main Library": {
        description: "A quiet space for studying, reading and academic research.",
        location: "Main Campus",
        hours: "8:00 AM – 8:00 PM"
    },

    "Campus Cafeteria": {
        description: "A convenient place for affordable meals and drinks.",
        location: "Main Campus",
        hours: "7:00 AM – 6:00 PM"
    },

    "Campus Transport": {
        description: "Find transport options for getting to and from campus.",
        location: "Main Gate",
        hours: "Daily transport service"
    },

    "Registrar Office": {
        description: "Access important academic and administrative services.",
        location: "Administration Building",
        hours: "8:30 AM – 5:00 PM"
    },

    "Printing & Stationery": {
        description: "Find places for printing, photocopying and essential student supplies.",
        location: "Student Services Area",
        hours: "8:00 AM – 6:00 PM"
    },

    "Campus Clinic": {
        description: "Find basic healthcare and student health support.",
        location: "Student Health Center",
        hours: "8:00 AM – 5:00 PM"
    }
};


function updateResults() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    placeCards.forEach(card => {

        const category = card.dataset.category;
        const text = card.textContent.toLowerCase();

        const matchesCategory =
            activeCategory === "all" ||
            category === activeCategory;

        const matchesSearch =
            searchTerm === "" ||
            text.includes(searchTerm);

        if (matchesCategory && matchesSearch) {

            card.style.display = "flex";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    resultCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "place" : "places"}`;


    if (visibleCount === 0) {

        placesGrid.style.display = "none";
        noResults.classList.add("show");

    } else {

        placesGrid.style.display = "grid";
        noResults.classList.remove("show");

    }


    if (activeCategory === "all") {

        resultsTitle.textContent =
            searchTerm ? "Search Results" : "Popular Places";

    } else {

        const selectedCard =
            document.querySelector(
                `.category-card[data-category="${activeCategory}"]`
            );

        if (selectedCard) {

            const title =
                selectedCard.querySelector("h3").textContent;

            resultsTitle.textContent = title;

        }

    }
}


categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const selectedCategory = card.dataset.category;

        if (activeCategory === selectedCategory) {

            activeCategory = "all";
            card.classList.remove("active");

        } else {

            categoryCards.forEach(item => {
                item.classList.remove("active");
            });

            activeCategory = selectedCategory;
            card.classList.add("active");

        }

        updateResults();

        document.querySelector(".results-header").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


searchInput.addEventListener("input", updateResults);


document.querySelectorAll(".view-button").forEach(button => {

    button.addEventListener("click", () => {

        const placeName = button.dataset.place;
        const data = placeData[placeName];

        if (!data) return;

        modalTitle.textContent = placeName;
        modalDescription.textContent = data.description;
        modalLocation.textContent = data.location;
        modalHours.textContent = data.hours;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

        lucide.createIcons();

    });

});


function closePlaceModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


closeModal.addEventListener("click", closePlaceModal);


document.querySelector(".modal-overlay").addEventListener(
    "click",
    closePlaceModal
);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closePlaceModal();
    }

});


document.querySelector(".modal-map-button").addEventListener(
    "click",
    () => {

        alert("The interactive campus map will be connected here.");

    }
);


document.querySelectorAll(".quick-link").forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const text =
            link.querySelector("span").textContent;

        alert(`${text} will be available here.`);

    });

});


updateResults();