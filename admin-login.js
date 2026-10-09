// =========================
// ADMIN LOGIN
// =========================

const adminLoginForm = document.getElementById("adminLoginForm");
const loginMessage = document.getElementById("loginMessage");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        loginMessage.textContent = "Logging in...";

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            // =========================
            // LOGIN FAILED
            // =========================

            if (!response.ok) {

                loginMessage.textContent =
                    data.message || "Login failed.";

                return;
            }

            // =========================
            // GET TOKEN
            // =========================

            const token = data.token;

            if (!token) {

                loginMessage.textContent =
                    "Login succeeded, but no token was received.";

                return;
            }

            // =========================
            // READ ROLE FROM JWT
            // =========================

            const tokenParts = token.split(".");

            const payload = JSON.parse(
                atob(tokenParts[1])
            );

            console.log("JWT payload:", payload);

            // =========================
            // CHECK ADMIN ROLE
            // =========================

            if (payload.role !== "admin") {

                loginMessage.textContent =
                    "Access denied. Admin account required.";

                return;
            }

            // =========================
            // SAVE TOKEN
            // =========================

            localStorage.setItem(
                "adminToken",
                token
            );

            // =========================
            // LOGIN SUCCESS
            // =========================

            loginMessage.textContent =
                "Login successful!";

            // =========================
            // OPEN ADMIN DASHBOARD
            // =========================

            window.location.href = "http://127.0.0.1:5500/admin-dashboard.html";

        } catch (error) {

            console.error("Login error:", error);

            loginMessage.textContent =
                "Cannot connect to the server.";
        }
    });
}