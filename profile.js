/* =========================================================
   PROFILE PAGE (sign in / create account / profile)
   Theme, mobile menu, calendar dropdown, footer year and icons
   are handled by the shared script.js
========================================================= */

(function () {

    // ---- Settings you may need to change ----
    const API_BASE = "http://localhost:3000";
    const LOGIN_URL = API_BASE + "/api/auth/login";
    const REGISTER_URL = API_BASE + "/api/auth/register"; // confirm this matches your backend

    const TOKEN_KEY = "ethioUniGuideToken";
    const USER_KEY = "ethioUniGuideUser";
    const LOGGED_IN_KEY = "ethioUniGuideLoggedIn";
    const ADMIN_TOKEN_KEY = "adminToken"; // used by the admin dashboard


    // ---- Elements ----
    const card = document.getElementById("profile-card");

    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const profileSection = document.getElementById("profile-section");
    const adminLoginSection = document.getElementById("admin-login-section");

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    const loginMessage = document.getElementById("login-message");
    const signupMessage = document.getElementById("signup-message");

    const loginSubmit = document.getElementById("login-submit");
    const signupSubmit = document.getElementById("signup-submit");

    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileRole = document.getElementById("profile-role");
    const profileTitle = document.getElementById("profile-title");
    const dashboardButton = document.getElementById("dashboard-button");


    // ---- Helpers ----

    function refreshIcons() {

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }

    }

    function setMessage(element, message, type) {

        element.textContent = message;
        element.className = "message" + (type ? " " + type : "");

    }

    function setLoading(button, isLoading, label) {

        button.disabled = isLoading;
        button.setAttribute("aria-busy", String(isLoading));
        button.textContent = isLoading ? label + "..." : label;

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

    function isTokenValid(token) {

        try {

            const payload = decodeJwt(token);

            return !payload.exp || payload.exp * 1000 > Date.now();

        } catch (error) {

            return false;

        }

    }

    function clearSession() {

        [TOKEN_KEY, USER_KEY, LOGGED_IN_KEY, ADMIN_TOKEN_KEY].forEach(function (key) {
            localStorage.removeItem(key);
        });

    }

    function getStoredUser() {

        try {

            const token = localStorage.getItem(TOKEN_KEY);
            const storedUser = localStorage.getItem(USER_KEY);

            if (localStorage.getItem(LOGGED_IN_KEY) !== "true" || !storedUser) {
                return null;
            }

            // An expired token means the person has to sign in again.
            if (token && !isTokenValid(token)) {
                clearSession();
                return null;
            }

            const user = JSON.parse(storedUser);

            if (!user.role) {
                user.role = "student";
            }

            return user;

        } catch (error) {

            return null;

        }

    }


    // ---- Sections ----

    function showLoginSection() {

        loginSection.classList.remove("hidden");
        signupSection.classList.add("hidden");
        profileSection.classList.add("hidden");
        adminLoginSection.classList.remove("hidden");
        card.classList.remove("is-profile");

        loginMessage.textContent = "";
        signupMessage.textContent = "";

    }

    function showSignupSection() {

        loginSection.classList.add("hidden");
        signupSection.classList.remove("hidden");
        profileSection.classList.add("hidden");
        adminLoginSection.classList.remove("hidden");
        card.classList.remove("is-profile");

        loginMessage.textContent = "";
        signupMessage.textContent = "";

    }

    function showProfile(user) {

        loginSection.classList.add("hidden");
        signupSection.classList.add("hidden");
        profileSection.classList.remove("hidden");
        adminLoginSection.classList.add("hidden");
        card.classList.add("is-profile");

        const isAdmin = String(user.role).toLowerCase() === "admin";

        profileName.textContent = user.name;
        profileEmail.textContent = user.email;
        profileRole.textContent = isAdmin ? "Admin" : "Student";
        profileTitle.textContent = `Welcome, ${user.name}!`;

        // Admins get a shortcut to the dashboard.
        dashboardButton.hidden = !isAdmin;

        refreshIcons();

    }


    // ---- Switch between sign in and sign up ----

    document.getElementById("show-signup").addEventListener("click", showSignupSection);
    document.getElementById("show-login").addEventListener("click", showLoginSection);


    // ---- Show / hide password ----

    function setupPasswordToggle(inputId, buttonId) {

        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);

        button.addEventListener("click", function () {

            const show = input.type === "password";

            input.type = show ? "text" : "password";

            button.classList.toggle("is-visible", show);
            button.setAttribute("aria-label", show ? "Hide password" : "Show password");

        });

    }

    setupPasswordToggle("login-password", "login-password-toggle");
    setupPasswordToggle("signup-password", "signup-password-toggle");
    setupPasswordToggle("signup-confirm-password", "signup-confirm-password-toggle");


    // ---- Sign up ----

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        if (!name) {
            setMessage(signupMessage, "Please enter your full name.", "error");
            return;
        }

        if (password.length < 6) {
            setMessage(signupMessage, "Password must be at least 6 characters.", "error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage(signupMessage, "Passwords do not match.", "error");
            return;
        }

        setLoading(signupSubmit, true, "Create Account");
        setMessage(signupMessage, "", "");

        try {

            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, password: password })
            });

            const data = await response.json().catch(function () {
                return {};
            });

            if (!response.ok) {
                setMessage(signupMessage, data.message || "Registration failed.", "error");
                return;
            }

            setMessage(signupMessage, "Account created successfully! Please log in.", "success");

            signupForm.reset();

            setTimeout(function () {
                showLoginSection();
                document.getElementById("login-email").value = email;
                document.getElementById("login-password").focus();
            }, 700);

        } catch (error) {

            setMessage(signupMessage, "Cannot connect to the server. Please try again.", "error");

        } finally {

            setLoading(signupSubmit, false, "Create Account");

        }

    });


    // ---- Sign in ----

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;

        setLoading(loginSubmit, true, "Sign In");
        setMessage(loginMessage, "Logging in...", "");

        try {

            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await response.json().catch(function () {
                return {};
            });

            if (!response.ok) {
                setMessage(loginMessage, data.message || "Incorrect email or password.", "error");
                return;
            }

            if (!data.token) {
                setMessage(loginMessage, "Login failed: no authentication token received.", "error");
                return;
            }

            const payload = decodeJwt(data.token);

            const user = {
                name: (data.user && data.user.name) || payload.name || email.split("@")[0],
                email: payload.email || email,
                role: payload.role || "student"
            };

            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            localStorage.setItem(LOGGED_IN_KEY, "true");

            // Admins can open the dashboard without signing in a second time.
            if (String(user.role).toLowerCase() === "admin") {
                localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
            }

            setMessage(loginMessage, "Login successful!", "success");

            loginForm.reset();

            setTimeout(function () {
                showProfile(user);
            }, 500);

        } catch (error) {

            setMessage(loginMessage, "Cannot connect to the server. Please try again.", "error");

        } finally {

            setLoading(loginSubmit, false, "Sign In");

        }

    });


    // ---- Log out ----

    document.getElementById("logout-button").addEventListener("click", function () {

        clearSession();

        loginForm.reset();
        signupForm.reset();

        showLoginSection();

    });


    // ---- Start ----

    const storedUser = getStoredUser();

    if (storedUser) {
        showProfile(storedUser);
    } else {
        showLoginSection();
    }

})();