/* =========================================================
   ADMISSION PAGE
   Theme, mobile menu, calendar dropdown, footer year and icons
   are handled by the shared script.js
========================================================= */

(function () {

    /* UNIVERSITY SWITCHER */

    const universityButtons = document.querySelectorAll(".uni-button");
    const aauContent = document.getElementById("aauContent");
    const hawassaContent = document.getElementById("hawassaContent");

    universityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const university = this.dataset.university;

            universityButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active");
                otherButton.setAttribute("aria-pressed", "false");
            });

            this.classList.add("active");
            this.setAttribute("aria-pressed", "true");

            aauContent.classList.toggle("hidden", university !== "aau");
            hawassaContent.classList.toggle("hidden", university !== "hawassa");

            const selectedContent = university === "aau"
                ? aauContent
                : hawassaContent;

            selectedContent.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

})();