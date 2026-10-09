// ================================
// LOGOUT
// ================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("adminToken");

        window.location.href = "admin-login.html";

    });

}


// ================================
// SAVE ADMIN PROFILE
// ================================

const saveProfileButton =
    document.getElementById("saveProfileButton");

if (saveProfileButton) {

    saveProfileButton.addEventListener("click", function () {

        const name =
            document.getElementById("adminName").value.trim();

        const email =
            document.getElementById("adminEmail").value.trim();

        if (!name || !email) {

            alert("Please enter the admin name and email.");

            return;
        }

        alert("Profile saved successfully.");

    });

}


// ================================
// SAVE CHATBOT SETTINGS
// ================================

const saveChatbotButton =
    document.getElementById("saveChatbotButton");

if (saveChatbotButton) {

    saveChatbotButton.addEventListener("click", function () {

        const welcomeMessage =
            document.getElementById("welcomeMessage").value.trim();

        const voiceEnabled =
            document.getElementById("voiceToggle").checked;

        console.log("Welcome message:", welcomeMessage);
        console.log("Voice enabled:", voiceEnabled);

        alert("Chatbot settings saved successfully.");

    });

}


// ================================
// CHANGE PASSWORD
// ================================

const changePasswordButton =
    document.getElementById("changePasswordButton");

const settingsMessage =
    document.getElementById("settingsMessage");

if (changePasswordButton) {

    changePasswordButton.addEventListener("click", function () {

        const currentPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (!currentPassword ||
            !newPassword ||
            !confirmPassword) {

            settingsMessage.textContent =
                "Please fill in all password fields.";

            return;
        }


        if (newPassword !== confirmPassword) {

            settingsMessage.textContent =
                "New passwords do not match.";

            return;
        }


        if (newPassword.length < 6) {

            settingsMessage.textContent =
                "New password must be at least 6 characters.";

            return;
        }


        settingsMessage.textContent =
            "Password change will be connected to the backend later.";

    });

}