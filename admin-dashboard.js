const adminToken = localStorage.getItem("adminToken");

if (!adminToken) {
    window.location.href = "admin-login.html";
}

try {
    const tokenParts = adminToken.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));

    if (payload.role !== "admin") {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-login.html";
    }
} catch (error) {
    localStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
}


const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-login.html";
    });
}