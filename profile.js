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


    signupForm.addEventListener("submit", (event) => {

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

        const role = document
            .getElementById("signup-role")
            .value;


        if (!name) {
            setMessage(
                signupMessage,
                "Please enter your full name.",
                "error"
            );
            return;
        }


        if (!role) {
            setMessage(
                signupMessage,
                "Please select your role.",
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


        const existingUser = getStoredUser();

        if (
            existingUser &&
            existingUser.email === email
        ) {
            setMessage(
                signupMessage,
                "An account with this email already exists.",
                "error"
            );
            return;
        }


        const user = {
            name: name,
            email: email,
            password: password,
            role: role
        };


        localStorage.setItem(
            "ethioUniGuideUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "ethioUniGuideLoggedIn",
            "true"
        );


        setMessage(
            signupMessage,
            "Account created successfully!",
            "success"
        );


        setTimeout(() => {
            showProfile(user);
        }, 700);

    });


    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("login-password")
            .value;


        const user = getStoredUser();


        if (!user) {
            setMessage(
                loginMessage,
                "No account found. Please create an account first.",
                "error"
            );
            return;
        }


        if (
            user.email !== email ||
            user.password !== password
        ) {
            setMessage(
                loginMessage,
                "Incorrect email or password.",
                "error"
            );
            return;
        }


        localStorage.setItem(
            "ethioUniGuideLoggedIn",
            "true"
        );


        setMessage(
            loginMessage,
            "Login successful!",
            "success"
        );


        setTimeout(() => {
            showProfile(user);
        }, 500);

    });


    logoutButton.addEventListener("click", () => {

        localStorage.removeItem(
            "ethioUniGuideLoggedIn"
        );

        loginForm.reset();

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