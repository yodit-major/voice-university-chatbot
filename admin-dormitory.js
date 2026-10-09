const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("adminToken");

        window.location.href = "admin-login.html";

    });
}


// ========================================
// TABS
// ========================================

const tabs = document.querySelectorAll(".management-tab");
const tabContents = document.querySelectorAll(".tab-content");
const addButton = document.getElementById("addButton");

tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        const selectedTab = tab.dataset.tab;

        tabs.forEach(function (item) {
            item.classList.remove("active");
        });

        tabContents.forEach(function (content) {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        document
            .getElementById(selectedTab)
            .classList.add("active");


        if (selectedTab === "dormitories") {

            addButton.innerHTML =
                '<i data-lucide="plus"></i> Add Dormitory';

        } else if (selectedTab === "facilities") {

            addButton.innerHTML =
                '<i data-lucide="plus"></i> Add Facility';

        }

        lucide.createIcons();

    });

});


// ========================================
// SEARCH
// ========================================

function setupSearch(inputId, tableId) {

    const searchInput =
        document.getElementById(inputId);

    const tableBody =
        document.getElementById(tableId);

    if (!searchInput || !tableBody) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const searchValue =
            searchInput.value.toLowerCase();

        const rows =
            tableBody.querySelectorAll("tr");

        rows.forEach(function (row) {

            const text =
                row.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}


setupSearch(
    "dormitorySearch",
    "dormitoryTableBody"
);

setupSearch(
    "facilitySearch",
    "facilityTableBody"
);