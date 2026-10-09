const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-login.html";
    });
}