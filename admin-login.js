// =========================
// ADMIN LOGIN
// =========================

(function () {

    // ---- Settings you may need to change ----
    // Leave API_BASE empty when the website and the API share one address.
    // If your API runs elsewhere, e.g. "http://localhost:3000", put it here.
    const API_BASE = "";
    const LOGIN_URL = API_BASE + "/api/auth/login";

    // Where to go after a successful login (relative to this page).
    const DASHBOARD_URL = "admin-dashboard.html";

    const TOKEN_KEY = "adminToken";


    // ---- Elements ----
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    const form = document.getElementById("adminLoginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.getElementById("loginButton");
    const loginButtonText = document.getElementById("loginButtonText");
    const loginMessage = document.getElementById("loginMessage");

    const sessionNotice = document.getElementById("sessionNotice");
    const continueLink = document.getElementById("continueLink");
    const signOutButton = document.getElementById("signOutButton");


    // =========================
    // DARK / LIGHT MODE
    // =========================

    function updateThemeLabel() {

        const isDark = root.getAttribute("data-theme") === "dark";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

    }

    themeToggle.addEventListener("click", function () {

        const isDark = root.getAttribute("data-theme") === "dark";

        if (isDark) {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", "dark");
        }

        try {
            localStorage.setItem("theme", isDark ? "light" : "dark");
        } catch (error) {
            // The theme still changes if storage is unavailable.
        }

        updateThemeLabel();

    });

    updateThemeLabel();


    // =========================
    // HELPERS
    // =========================

    function setMessage(text, type) {

        loginMessage.textContent = text;
        loginMessage.className = "login-message" + (type ? " " + type : "");

    }

    function setLoading(isLoading) {

        loginButton.disabled = isLoading;
        loginButton.setAttribute("aria-busy", String(isLoading));
        loginButtonText.textContent = isLoading ? "Logging in..." : "Login";

    }

    // Decode the payload of a JWT (handles base64url and UTF-8).
    function decodeJwt(token) {

        const part = String(token).split(".")[1];

        if (!part) {
            throw new Error("Invalid token");
        }

        let base64 = part.replace(/-/g, "+").replace(/_/g, "/");

        while (base64.length % 4) {
            base64 += "=";
        }

        const bytes = Uint8Array.from(atob(base64), function (char) {
            return char.charCodeAt(0);
        });

        return JSON.parse(new TextDecoder().decode(bytes));

    }

    function isAdminToken(token) {

        try {

            const payload = decodeJwt(token);

            const notExpired = !payload.exp || payload.exp * 1000 > Date.now();

            return notExpired && String(payload.role).toLowerCase() === "admin";

        } catch (error) {

            return false;

        }

    }

    function getSavedToken() {

        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (error) {
            return null;
        }

    }


    // =========================
    // ALREADY SIGNED IN
    // =========================

    continueLink.href = DASHBOARD_URL;

    const savedToken = getSavedToken();

    if (savedToken && isAdminToken(savedToken)) {
        sessionNotice.hidden = false;
    }

    signOutButton.addEventListener("click", function () {

        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            // Nothing to remove if storage is unavailable.
        }

        sessionNotice.hidden = true;

    });


    // =========================
    // SHOW / HIDE PASSWORD
    // =========================

    togglePassword.addEventListener("click", function () {

        const show = passwordInput.type === "password";

        passwordInput.type = show ? "text" : "password";

        togglePassword.classList.toggle("is-visible", show);
        togglePassword.setAttribute("aria-label", show ? "Hide password" : "Show password");

    });


    // =========================
    // LOGIN
    // =========================

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            setMessage("Please enter your email and password.", "error");
            (email ? passwordInput : emailInput).focus();
            return;
        }

        setLoading(true);
        setMessage("Logging in...", "info");

        try {

            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            // The server may answer with something that is not JSON (e.g. a 404 page).
            const data = await response.json().catch(function () {
                return {};
            });

            // LOGIN FAILED

            if (!response.ok) {

                if (response.status === 404 || response.status === 405) {
                    setMessage("Login service not found. Check that the server is running.", "error");
                } else {
                    setMessage(data.message || "Login failed.", "error");
                }

                return;

            }

            // GET TOKEN

            const token = data.token;

            if (!token) {
                setMessage("Login succeeded, but no token was received.", "error");
                return;
            }

            // CHECK ADMIN ROLE
            // (This only decides what the page shows. The server must also
            //  check the role on every admin request.)

            if (!isAdminToken(token)) {
                setMessage("Access denied. Admin account required.", "error");
                return;
            }

            // SAVE TOKEN + OPEN DASHBOARD

            localStorage.setItem(TOKEN_KEY, token);

            setMessage("Login successful! Opening dashboard...", "success");

            setTimeout(function () {
                window.location.href = DASHBOARD_URL;
            }, 500);

        } catch (error) {

            setMessage("Cannot connect to the server.", "error");

        } finally {

            // Keep the button disabled while we are redirecting.
            if (!loginMessage.classList.contains("success")) {
                setLoading(false);
            }

        }

    });


    // =========================
    // ICONS
    // =========================

    window.addEventListener("DOMContentLoaded", function () {

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }

    });

})();