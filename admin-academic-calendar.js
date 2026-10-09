const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-login.html";
    });
}


// SEARCH

const calendarSearch = document.getElementById("calendarSearch");
const calendarTableBody = document.getElementById("calendarTableBody");

if (calendarSearch) {

    calendarSearch.addEventListener("input", function () {

        const searchValue =
            calendarSearch.value.toLowerCase();

        const rows =
            calendarTableBody.querySelectorAll("tr");

        rows.forEach(function (row) {

            const rowText =
                row.textContent.toLowerCase();

            if (rowText.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}


// ADD BUTTON

const addCalendarButton =
    document.getElementById("addCalendarButton");

if (addCalendarButton) {

    addCalendarButton.addEventListener("click", function () {

        alert("Add Academic Calendar Event form will be connected later.");

    });

}