document.addEventListener("DOMContentLoaded", () => {

    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const profileSection = document.getElementById("profile-section");

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");

    const logoutButton = document.getElementById("logout-button");

    const loginMessage = document.getElementById("login-message");
    const signupMessage = document.getElementById("signup-message");

    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileRole = document.getElementById("profile-role");
    const profileTitle = document.getElementById("profile-title");


    function showLoginSection() {
        loginSection.classList.remove("hidden");
        signupSection.classList.add("hidden");
        profileSection.classList.add("hidden");

        loginMessage.textContent = "";
        signupMessage.textContent = "";
    }


    function showSignupSection() {
        loginSection.classList.add("hidden");
        signupSection.classList.remove("hidden");
        profileSection.classList.add("hidden");

        loginMessage.textContent = "";
        signupMessage.textContent = "";
    }


    function showProfile(user) {
        loginSection.classList.add("hidden");
        signupSection.classList.add("hidden");
        profileSection.classList.remove("hidden");

        profileName.textContent = user.name;
        profileEmail.textContent = user.email;

        const role = user.role || "student";

        profileRole.textContent =
            role === "admin" ? "Admin" : "Student";

        profileTitle.textContent = `Welcome, ${user.name}!`;

        lucide.createIcons();
    }


    function getStoredUser() {
        const storedUser = localStorage.getItem("ethioUniGuideUser");

        if (!storedUser) {
            return null;
        }

        try {
            const user = JSON.parse(storedUser);

            if (!user.role) {
                user.role = "student";
            }

            return user;

        } catch (error) {
            return null;
        }
    }


    function setMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`;
    }


    function togglePassword(inputId, buttonId) {

        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);

        if (input.type === "password") {

            input.type = "text";

            button.innerHTML = `
                <i data-lucide="eye-off"></i>
            `;

            button.setAttribute("aria-label", "Hide password");

        } else {

            input.type = "password";

            button.innerHTML = `
                <i data-lucide="eye"></i>
            `;

            button.setAttribute("aria-label", "Show password");
        }

        lucide.createIcons();
    }


    showSignup.addEventListener("click", () => {
        showSignupSection();
    });


    showLogin.addEventListener("click", () => {
        showLoginSection();
    });


    document
        .getElementById("login-password-toggle")
        .addEventListener("click", () => {
            togglePassword(
                "login-password",
                "login-password-toggle"
            );
        });


    document
        .getElementById("signup-password-toggle")
        .addEventListener("click", () => {
            togglePassword(
                "signup-password",
                "signup-password-toggle"
            );
        });


    document
        .getElementById("signup-confirm-password-toggle")
        .addEventListener("click", () => {
            togglePassword(
                "signup-confirm-password",
                "signup-confirm-password-toggle"
            );
        });


    signupForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document
            .getElementById("signup-name")
            .value
            .trim();

        const email = document
            .getElementById("signup-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("signup-password")
            .value;

        const confirmPassword = document
            .getElementById("signup-confirm-password")
            .value;

        


        if (!name) {
            setMessage(
                signupMessage,
                "Please enter your full name.",
                "error"
            );
            return;
        }


        

        if (password.length < 6) {
            setMessage(
                signupMessage,
                "Password must be at least 6 characters.",
                "error"
            );
            return;
        }


        if (password !== confirmPassword) {
            setMessage(
                signupMessage,
                "Passwords do not match.",
                "error"
            );
            return;
        }


                try {
            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    signupMessage,
                    data.message || "Registration failed.",
                    "error"
                );
                return;
            }

            setMessage(
                signupMessage,
                "Account created successfully! Please log in.",
                "success"
            );

            signupForm.reset();

            setTimeout(() => {
                showLoginSection();
                document.getElementById("login-email").value = email;
            }, 700);

        } catch (error) {
            console.error("Signup error:", error);

            setMessage(
                signupMessage,
                "Cannot connect to the server. Please try again.",
                "error"
            );
        }
    });


        loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("login-password")
            .value;

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
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    loginMessage,
                    data.message || "Incorrect email or password.",
                    "error"
                );
                return;
            }

            if (!data.token) {
                setMessage(
                    loginMessage,
                    "Login failed: no authentication token received.",
                    "error"
                );
                return;
            }

            const tokenPayload = JSON.parse(
                atob(data.token.split(".")[1])
            );

            const user = {
                name: tokenPayload.name,
                email: tokenPayload.email || email,
                role: tokenPayload.role
            };

            localStorage.setItem("ethioUniGuideToken", data.token);
            localStorage.setItem(
                "ethioUniGuideUser",
                JSON.stringify(user)
            );
            localStorage.setItem("ethioUniGuideLoggedIn", "true");

            setMessage(
                loginMessage,
                "Login successful!",
                "success"
            );

            setTimeout(() => {
                showProfile(user);
            }, 500);

        } catch (error) {
            console.error("Login error:", error);

            setMessage(
                loginMessage,
                "Cannot connect to the server. Please try again.",
                "error"
            );
        }
    });

    logoutButton.addEventListener("click", () => {
    localStorage.removeItem("ethioUniGuideLoggedIn");
    localStorage.removeItem("ethioUniGuideUser");
    localStorage.removeItem("ethioUniGuideToken");

    loginForm.reset();
    signupForm.reset();

    showLoginSection();
});
    const storedUser = getStoredUser();

    const isLoggedIn =
        localStorage.getItem("ethioUniGuideLoggedIn") === "true";


    if (storedUser && isLoggedIn) {
        showProfile(storedUser);
    } else {
        showLoginSection();
    }


    lucide.createIcons();

});