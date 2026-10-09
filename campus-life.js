lucide.createIcons();


/* UNIVERSITY DATA */

const universityData = {

    aau: {
        shortName: "AAU",
        name: "Addis Ababa University",
        title: "Your university experience is more than lectures.",
        description:
            "Find your community, discover events, explore campus spaces, and make the most of your student years."
    },

    hawassa: {
        shortName: "Hawassa University",
        name: "Hawassa University",
        title: "Discover life beyond the classroom.",
        description:
            "Explore student communities, campus activities, accommodation, events and everyday university life at Hawassa University."
    }

};


/* UNIVERSITY SWITCHING */

const universityTabs = document.querySelectorAll(".university-tab");

const universityName = document.getElementById("universityName");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");


universityTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const university = tab.dataset.university;

        if (!university) {
            return;
        }


        const data = universityData[university];

        if (!data) {
            return;
        }


        universityTabs.forEach(item => {
            item.classList.remove("active");
        });


        tab.classList.add("active");


        universityName.textContent = data.shortName;

        heroTitle.textContent = data.title;

        heroDescription.textContent = data.description;

    });

});


/* MORE UNIVERSITIES */

const comingSoon = document.querySelector(".coming-soon");

if (comingSoon) {

    comingSoon.addEventListener("click", () => {

        const comingSection = document.querySelector(".coming-section");

        if (comingSection) {

            comingSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* SEARCH BUTTON */

const searchButton = document.querySelector(".nav-search-button");

if (searchButton) {

    searchButton.addEventListener("click", () => {

        const searchPage = "search.html";

        window.location.href = searchPage;

    });

}


/* =========================
   DARK / LIGHT MODE
   SAME LOGIC AS INDEX
========================= */

const themeToggle = document.getElementById("theme");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    themeToggle.checked = true;

} else {

    themeToggle.checked = false;

}


themeToggle.addEventListener("change", () => {

    if (themeToggle.checked) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

});


/* ICONS */

lucide.createIcons();