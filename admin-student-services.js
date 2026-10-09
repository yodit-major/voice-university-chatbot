const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("adminToken");

        window.location.href = "admin-login.html";

    });

}


// ========================================
// SEARCH SERVICES
// ========================================

const searchInput =
    document.getElementById("serviceSearch");

const tableBody =
    document.getElementById("serviceTableBody");


if (searchInput && tableBody) {

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