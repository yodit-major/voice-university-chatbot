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

        // Remove active from all tabs
        tabs.forEach(function (item) {
            item.classList.remove("active");
        });

        // Hide all content
        tabContents.forEach(function (content) {
            content.classList.remove("active");
        });

        // Activate selected tab
        tab.classList.add("active");

        document
            .getElementById(selectedTab)
            .classList.add("active");


        // Change Add button text
        if (selectedTab === "campuses") {

            addButton.innerHTML =
                '<i data-lucide="plus"></i> Add Campus';

        } else if (selectedTab === "buildings") {

            addButton.innerHTML =
                '<i data-lucide="plus"></i> Add Building';

        } else if (selectedTab === "rooms") {

            addButton.innerHTML =
                '<i data-lucide="plus"></i> Add Room';
        }

        lucide.createIcons();
    });

});


// ========================================
// SEARCH FUNCTION
// ========================================

function setupSearch(inputId, tableId) {

    const searchInput = document.getElementById(inputId);
    const tableBody = document.getElementById(tableId);

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
    "campusSearch",
    "campusTableBody"
);

setupSearch(
    "buildingSearch",
    "buildingTableBody"
);

setupSearch(
    "roomSearch",
    "roomTableBody"
);s