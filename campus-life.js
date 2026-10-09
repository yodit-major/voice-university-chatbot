/* =========================================================
   ETHIO-UNI-GUIDE
   CAMPUS LIFE JAVASCRIPT
========================================================= */


/* =========================================================
   UNIVERSITY DATA
========================================================= */

const universityData = {

    aau: {

        shortName: "AAU",

        name: "Addis Ababa University",

        city: "Addis Ababa",

        heroTitle:
            "Your university experience is more than lectures.",

        heroDescription:
            "Stay informed about campus life, university activities, accommodation and important announcements.",

        newsLink:
            "https://t.me/AAUNEWS1",

        newsName:
            "AAU News",

        heroImageOne:
            "images/aau-building.jpg",

        heroImageTwo:
            "images/Hawassa.jfif",

        accommodationImage:
            "images/aau-dormitory.jpg",

        accommodationBadge:
            "AAU Accommodation",

        accommodationTitle:
            "Make your campus feel like home.",

        accommodationDescription:
            "For Addis Ababa University students who live in Addis Ababa and Sheger Sub-city, accommodation requires a support letter from your Wereda and submission through the university's online accommodation form.",

        accommodationItemOneTitle:
            "Wereda support letter",

        accommodationItemOneText:
            "Students living in Addis Ababa and Sheger Sub-city need to obtain a support letter from their Wereda.",

        accommodationItemTwoTitle:
            "Online submission",

        accommodationItemTwoText:
            "Submit the required support letter through the university's online accommodation form.",

        accommodationItemThreeTitle:
            "Accommodation process",

        accommodationItemThreeText:
            "Make sure your required documents are ready before completing the online submission."
    },


    hawassa: {

        shortName: "HU",

        name: "Hawassa University",

        city: "Hawassa",

        heroTitle:
            "Experience university life beyond the classroom.",

        heroDescription:
            "Discover Hawassa University campus life, accommodation, student activities, events and important university announcements.",

        newsLink:
            "https://t.me/HUCommunicationsoffice",

        newsName:
            "Hawassa University News",

        heroImageOne:
            "images/Hawassa.jfif",

        heroImageTwo:
            "images/aau-building.jpg",

        accommodationImage:
            "images/hawassa-dormitory.jpg",

        accommodationBadge:
            "Hawassa University Accommodation",

        accommodationTitle:
            "Find your place at Hawassa University.",

        accommodationDescription:
            "Hawassa University provides student accommodation as part of campus life. Students should follow the university's accommodation procedures and announcements for housing information.",

        accommodationItemOneTitle:
            "Student accommodation",

        accommodationItemOneText:
            "Check the university's announcements for information about student housing and accommodation arrangements.",

        accommodationItemTwoTitle:
            "University updates",

        accommodationItemTwoText:
            "Follow the Hawassa University Communication Office for accommodation announcements and important updates.",

        accommodationItemThreeTitle:
            "Stay informed",

        accommodationItemThreeText:
            "Keep your student information and required documents ready when accommodation registration opens."
    }

};


/* =========================================================
   ELEMENTS
========================================================= */

const universityTabs =
    document.querySelectorAll(
        ".university-tab[data-university]"
    );

const universityName =
    document.getElementById("universityName");

const heroTitle =
    document.getElementById("heroTitle");

const heroDescription =
    document.getElementById("heroDescription");

const heroImageOne =
    document.getElementById("heroImageOne");

const heroImageTwo =
    document.getElementById("heroImageTwo");

const accommodationImage =
    document.getElementById("accommodationImage");

const accommodationBadge =
    document.getElementById("accommodationBadge");

const accommodationTitle =
    document.getElementById("accommodationTitle");

const accommodationDescription =
    document.getElementById("accommodationDescription");

const accommodationItemOneTitle =
    document.getElementById("accommodationItemOneTitle");

const accommodationItemOneText =
    document.getElementById("accommodationItemOneText");

const accommodationItemTwoTitle =
    document.getElementById("accommodationItemTwoTitle");

const accommodationItemTwoText =
    document.getElementById("accommodationItemTwoText");

const accommodationItemThreeTitle =
    document.getElementById("accommodationItemThreeTitle");

const accommodationItemThreeText =
    document.getElementById("accommodationItemThreeText");


/* =========================================================
   UPDATE TELEGRAM LINKS
========================================================= */

function updateNewsLinks(data) {

    const links =
        document.querySelectorAll(
            ".university-news-link"
        );

    links.forEach(link => {

        link.href = data.newsLink;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        const textElement =
            link.querySelector(
                ".news-button-text, .news-link-text"
            );

        if (textElement) {

            if (link.classList.contains("primary-button")) {

                textElement.textContent =
                    `${data.newsName} & Announcements`;

            } else {

                textElement.textContent =
                    `More on ${data.newsName}`;

            }

        } else if (link.classList.contains("primary-button")) {

            const icon =
                link.querySelector("svg");

            link.childNodes.forEach(node => {

                if (
                    node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
                ) {

                    node.textContent =
                        ` ${data.newsName} & Announcements `;

                }

            });

            if (!icon) {

                link.textContent =
                    `${data.newsName} & Announcements`;

            }

        } else if (link.classList.contains("view-all")) {

            const icon =
                link.querySelector("svg");

            link.childNodes.forEach(node => {

                if (
                    node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
                ) {

                    node.textContent =
                        ` More on ${data.newsName} `;

                }

            });

            if (!icon) {

                link.textContent =
                    `More on ${data.newsName}`;

            }

        }

    });


    /* Update existing hardcoded Telegram links */

    document
        .querySelectorAll(
            'a[href*="t.me/AAUNEWS1"], a[href*="t.me/HUCommunicationsoffice"]'
        )
        .forEach(link => {

            link.href = data.newsLink;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

        });


    /* Update Telegram section description */

    const telegramDescription =
        document.querySelector(
            ".telegram-section p"
        );

    if (telegramDescription) {

        telegramDescription.textContent =
            `Follow the ${data.newsName} Telegram channel for more university events, announcements and updates.`;

    }


    /* Update Telegram button */

    const telegramButton =
        document.querySelector(
            ".telegram-section .telegram-button"
        );

    if (telegramButton) {

        telegramButton.href =
            data.newsLink;

        telegramButton.target = "_blank";

        telegramButton.rel = "noopener noreferrer";

        const icon =
            telegramButton.querySelector("svg");

        telegramButton.childNodes.forEach(node => {

            if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() !== ""
            ) {

                node.textContent =
                    ` Join ${data.newsName} `;

            }

        });

        if (!icon) {

            telegramButton.textContent =
                `Join ${data.newsName}`;

        }

    }

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function addImageFallback(image, fallback) {

    if (!image) {
        return;
    }

    image.onerror = function () {

        /* Prevent infinite fallback loops */

        if (image.dataset.fallbackUsed === "true") {
            return;
        }

        image.dataset.fallbackUsed = "true";

        image.src = fallback;

    };

}


/* =========================================================
   UPDATE UNIVERSITY
========================================================= */

function updateUniversity(universityKey) {

    const data =
        universityData[universityKey];

    if (!data) {
        return;
    }


    /* Active university tab */

    universityTabs.forEach(tab => {

        const isActive =
            tab.dataset.university === universityKey;

        tab.classList.toggle(
            "active",
            isActive
        );

        tab.setAttribute(
            "aria-selected",
            isActive ? "true" : "false"
        );

    });


    /* University name */

    if (universityName) {

        universityName.textContent =
            data.shortName;

    }


    /* Hero title */

    if (heroTitle) {

        heroTitle.textContent =
            data.heroTitle;

    }


    /* Hero description */

    if (heroDescription) {

        heroDescription.textContent =
            data.heroDescription;

    }


    /* Hero images */

    if (heroImageOne) {

        heroImageOne.dataset.fallbackUsed = "false";

        heroImageOne.src =
            data.heroImageOne;

    }

    if (heroImageTwo) {

        heroImageTwo.src =
            data.heroImageTwo;

    }


    /* Accommodation image */

    if (accommodationImage) {

        accommodationImage.dataset.fallbackUsed = "false";

        accommodationImage.src =
            data.accommodationImage;

        accommodationImage.alt =
            `${data.name} student accommodation`;

        if (universityKey === "hawassa") {

            addImageFallback(
                accommodationImage,
                "images/Hawassa.jfif"
            );

        }

    }


    /* Accommodation badge */

    if (accommodationBadge) {

        accommodationBadge.textContent =
            data.accommodationBadge;

    }


    /* Accommodation title */

    if (accommodationTitle) {

        accommodationTitle.textContent =
            data.accommodationTitle;

    }


    /* Accommodation description */

    if (accommodationDescription) {

        accommodationDescription.textContent =
            data.accommodationDescription;

    }


    /* Accommodation item 1 */

    if (accommodationItemOneTitle) {

        accommodationItemOneTitle.textContent =
            data.accommodationItemOneTitle;

    }

    if (accommodationItemOneText) {

        accommodationItemOneText.textContent =
            data.accommodationItemOneText;

    }


    /* Accommodation item 2 */

    if (accommodationItemTwoTitle) {

        accommodationItemTwoTitle.textContent =
            data.accommodationItemTwoTitle;

    }

    if (accommodationItemTwoText) {

        accommodationItemTwoText.textContent =
            data.accommodationItemTwoText;

    }


    /* Accommodation item 3 */

    if (accommodationItemThreeTitle) {

        accommodationItemThreeTitle.textContent =
            data.accommodationItemThreeTitle;

    }

    if (accommodationItemThreeText) {

        accommodationItemThreeText.textContent =
            data.accommodationItemThreeText;

    }


    /* Update Telegram links */

    updateNewsLinks(data);


    /* Save selected university */

    try {

        localStorage.setItem(
            "selectedUniversity",
            universityKey
        );

    } catch (error) {

        console.warn(
            "Could not save the selected university.",
            error
        );

    }


    /* Refresh Lucide icons */

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   UNIVERSITY TAB CLICK
========================================================= */

universityTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        function () {

            const university =
                this.dataset.university;

            updateUniversity(university);

        }
    );

});


/* =========================================================
   MORE UNIVERSITIES BUTTON
========================================================= */

const comingSoonButton =
    document.querySelector(
        ".university-tab.coming-soon"
    );

if (comingSoonButton) {

    comingSoonButton.addEventListener(
        "click",
        function () {

            alert(
                "More universities are coming soon to Ethio-Uni-Guide."
            );

        }
    );

}


/* =========================================================
   DARK / LIGHT MODE
   Supports html[data-theme="dark"],
   body[data-theme="dark"], and body.dark
========================================================= */

const themeToggle =
    document.getElementById("theme");


/* Apply the selected theme */

function applyTheme(theme) {

    const isDark = theme === "dark";

    const currentTheme = isDark ? "dark" : "light";


    /* Update the HTML element */

    document.documentElement.setAttribute(
        "data-theme",
        currentTheme
    );


    /* Update the BODY element for compatibility with CSS */

    if (document.body) {

        document.body.setAttribute(
            "data-theme",
            currentTheme
        );

        document.body.classList.toggle(
            "dark",
            isDark
        );

    }


    /* Synchronize the toggle switch */

    if (themeToggle) {

        themeToggle.checked = isDark;

        themeToggle.setAttribute(
            "aria-checked",
            String(isDark)
        );

    }


    /* Save the theme preference */

    try {

        localStorage.setItem(
            "theme",
            currentTheme
        );

    } catch (error) {

        console.warn(
            "Theme preference could not be saved.",
            error
        );

    }

}


/* Initialize the theme */

function initializeTheme() {

    let savedTheme = null;

    try {

        savedTheme =
            localStorage.getItem("theme");

    } catch (error) {

        console.warn(
            "Saved theme could not be read.",
            error
        );

    }


    /* Use the saved theme if available */

    if (
        savedTheme === "dark" ||
        savedTheme === "light"
    ) {

        applyTheme(savedTheme);

    } else {

        /* Otherwise use the browser's preferred theme */

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        applyTheme(
            prefersDark ? "dark" : "light"
        );

    }


    /* Listen for changes to the toggle */

    if (themeToggle) {

        themeToggle.addEventListener(
            "change",
            function () {

                applyTheme(
                    this.checked ? "dark" : "light"
                );

            }
        );

    } else {

        console.warn(
            'Theme toggle not found. Check that your HTML contains an input with id="theme".'
        );

    }

}


/* Run after the HTML document is ready */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTheme
    );

} else {

    initializeTheme();

}


/* =========================================================
   IMAGE FALLBACKS FOR HERO
========================================================= */

if (heroImageOne) {

    heroImageOne.addEventListener(
        "error",
        function () {

            if (
                this.dataset.fallbackUsed === "true"
            ) {
                return;
            }

            this.dataset.fallbackUsed = "true";

            this.src =
                "images/Hawassa.jfif";

        }
    );

}


/* =========================================================
   INITIAL UNIVERSITY
========================================================= */

let savedUniversity = null;

try {

    savedUniversity =
        localStorage.getItem("selectedUniversity");

} catch (error) {

    console.warn(
        "Could not retrieve the saved university.",
        error
    );

}


if (
    savedUniversity &&
    universityData[savedUniversity]
) {

    updateUniversity(savedUniversity);

} else {

    updateUniversity("aau");

}


/* =========================================================
   LUCIDE ICONS
========================================================= */

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}