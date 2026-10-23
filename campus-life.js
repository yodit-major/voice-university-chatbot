/* =========================================================
   ETHIO-UNI-GUIDE - CAMPUS LIFE
   Theme, mobile menu, calendar dropdown, footer year and icons
   are handled by the shared script.js
========================================================= */


/* UNIVERSITY DATA */

const universityData = {

    aau: {
        shortName: "AAU",
        name: "Addis Ababa University",
        city: "Addis Ababa",
        heroTitle: "Your university experience is more than lectures.",
        heroDescription:
            "Stay informed about campus life, university activities, accommodation and important announcements.",
        newsLink: "https://t.me/AAUNEWS1",
        newsName: "AAU News",
        heroImageOne: "images/aau-building.jpg",
        heroImageTwo: "images/Hawassa.jfif",
        accommodationImage: "images/aau-dorm.jfif",
        accommodationBadge: "AAU Accommodation",
        accommodationTitle: "Make your campus feel like home.",
        accommodationDescription:
            "For Addis Ababa University students who live in Addis Ababa and Sheger Sub-city, accommodation requires a support letter from your Wereda and submission through the university's online accommodation form.",
        accommodationItemOneTitle: "Wereda support letter",
        accommodationItemOneText:
            "Students living in Addis Ababa and Sheger Sub-city need to obtain a support letter from their Wereda.",
        accommodationItemTwoTitle: "Online submission",
        accommodationItemTwoText:
            "Submit the required support letter through the university's online accommodation form.",
        accommodationItemThreeTitle: "Accommodation process",
        accommodationItemThreeText:
            "Make sure your required documents are ready before completing the online submission."
    },

    hawassa: {
        shortName: "HU",
        name: "Hawassa University",
        city: "Hawassa",
        heroTitle: "Experience university life beyond the classroom.",
        heroDescription:
            "Discover Hawassa University campus life, accommodation, student activities, events and important university announcements.",
        newsLink: "https://t.me/HUCommunicationsoffice",
        newsName: "Hawassa University News",
        heroImageOne: "images/Hawassa.jfif",
        heroImageTwo: "images/aau-building.jpg",
        accommodationImage: "images/hawassa-dormitory.jpg",
        accommodationBadge: "Hawassa University Accommodation",
        accommodationTitle: "Find your place at Hawassa University.",
        accommodationDescription:
            "Hawassa University provides student accommodation as part of campus life. Students should follow the university's accommodation procedures and announcements for housing information.",
        accommodationItemOneTitle: "Student accommodation",
        accommodationItemOneText:
            "Check the university's announcements for information about student housing and accommodation arrangements.",
        accommodationItemTwoTitle: "University updates",
        accommodationItemTwoText:
            "Follow the Hawassa University Communication Office for accommodation announcements and important updates.",
        accommodationItemThreeTitle: "Stay informed",
        accommodationItemThreeText:
            "Keep your student information and required documents ready when accommodation registration opens."
    }

};


/* ELEMENTS */

const $ = id => document.getElementById(id);

const universityTabs = document.querySelectorAll(".university-tab[data-university]");

const heroImageOne = $("heroImageOne");
const heroImageTwo = $("heroImageTwo");
const accommodationImage = $("accommodationImage");

const eventsGrid = $("eventsGrid");
const eventsEmpty = $("eventsEmpty");
const toast = $("toast");

// Plain-text elements that change with the selected university.
const textFields = {
    universityName: "shortName",
    heroTitle: "heroTitle",
    heroDescription: "heroDescription",
    accommodationBadge: "accommodationBadge",
    accommodationTitle: "accommodationTitle",
    accommodationDescription: "accommodationDescription",
    accommodationItemOneTitle: "accommodationItemOneTitle",
    accommodationItemOneText: "accommodationItemOneText",
    accommodationItemTwoTitle: "accommodationItemTwoTitle",
    accommodationItemTwoText: "accommodationItemTwoText",
    accommodationItemThreeTitle: "accommodationItemThreeTitle",
    accommodationItemThreeText: "accommodationItemThreeText"
};

const newsLabels = {
    announcements: name => `${name} & Announcements`,
    more: name => `More on ${name}`,
    join: name => `Join ${name}`
};


/* HELPERS */

function refreshIcons() {

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

}

// Show an image, and fall back to another one if it fails to load.
function setImage(image, src, alt, fallback) {

    if (!image) {
        return;
    }

    image.onerror = function () {
        image.onerror = null;
        if (fallback) {
            image.src = fallback;
        }
    };

    image.src = src;

    if (alt) {
        image.alt = alt;
    }

}

let toastTimer;

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}


/* NEWS LINKS (Telegram) */

function updateNewsLinks(data) {

    document.querySelectorAll(".university-news-link").forEach(link => {

        link.href = data.newsLink;

        const text = link.querySelector(".news-link-text");
        const label = newsLabels[link.dataset.news];

        if (text && label) {
            text.textContent = label(data.newsName);
        }

    });

    const description = $("newsDescription");

    if (description) {
        description.textContent =
            `Follow the ${data.newsName} Telegram channel for more university events, announcements and updates.`;
    }

}


/* UPDATE UNIVERSITY */

function updateUniversity(key) {

    const data = universityData[key];

    if (!data) {
        return;
    }

    // Active tab
    universityTabs.forEach(tab => {

        const isActive = tab.dataset.university === key;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));

    });

    // Text content
    Object.entries(textFields).forEach(([id, field]) => {

        const element = $(id);

        if (element) {
            element.textContent = data[field];
        }

    });

    // Images
    setImage(heroImageOne, data.heroImageOne, `${data.name} campus`, "images/Hawassa.jfif");
    setImage(heroImageTwo, data.heroImageTwo, "University campus");
    setImage(
        accommodationImage,
        data.accommodationImage,
        `${data.name} student accommodation`,
        "images/hawassa-dorm.jpg"
    );

    // Events on this page belong to AAU only
    const showEvents = key === "aau";

    eventsGrid.hidden = !showEvents;
    eventsEmpty.hidden = showEvents;
    $("eventsEmptyName").textContent = data.name;

    updateNewsLinks(data);

    try {
        localStorage.setItem("selectedUniversity", key);
    } catch (error) {
        // The page still works if localStorage is unavailable.
    }

    refreshIcons();

}


/* TAB CLICKS */

universityTabs.forEach(tab => {

    tab.addEventListener("click", () => {
        updateUniversity(tab.dataset.university);
    });

});

const comingSoonButton = document.querySelector(".university-tab.coming-soon");

if (comingSoonButton) {

    comingSoonButton.addEventListener("click", () => {
        showToast("More universities are coming soon to Ethio-Uni-Guide.");
    });

}


/* INITIAL UNIVERSITY */

let savedUniversity = null;

try {
    savedUniversity = localStorage.getItem("selectedUniversity");
} catch (error) {
    // Ignore: fall back to AAU.
}

updateUniversity(universityData[savedUniversity] ? savedUniversity : "aau");