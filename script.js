// =========================
// DARK MODE
// =========================
const themeToggle = document.getElementById("theme");
const savedTheme = localStorage.getItem("theme");

// Restore saved theme or respect system preference
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
    localStorage.setItem("theme", this.checked ? "dark" : "light");
});

// =========================
// NAVIGATION
// =========================
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// =========================
// SEARCH
// =========================
const searchButton = document.getElementById("searchButton");
const welcomeSearch = document.getElementById("welcomeSearch");
const navSearchButton = document.getElementById("navSearchButton");

function performSearch() {
    const searchValue = welcomeSearch.value.trim();
    if (!searchValue) {
        welcomeSearch.focus();
        return;
    }
    alert("Searching for: " + searchValue);
}

searchButton.addEventListener("click", performSearch);

welcomeSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});



// =========================
// AI ASSISTANT
// =========================

const assistantButton = document.getElementById("assistantButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

// Open chat
if (assistantButton) {

    assistantButton.addEventListener("click", function () {
        chatWindow.classList.add("open");
        chatInput.focus();
    });

}

// Close chat
if (closeChat) {

    closeChat.addEventListener("click", function () {
        chatWindow.classList.remove("open");
    });

}

// Add message to chat
function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add(
        type === "user" ? "user-message" : "bot-message"
    );

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
async function sendChatMessage() {

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    chatInput.value = "";

    addMessage("Thinking...", "bot");

    try {

        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to get response");
        }

        // Remove "Thinking..."
        const messages = chatMessages.querySelectorAll(".bot-message");
        const thinkingMessage = messages[messages.length - 1];

        if (thinkingMessage && thinkingMessage.textContent === "Thinking...") {
            thinkingMessage.remove();
        }

        addMessage(data.answer, "bot");

    } catch (error) {

        console.error(error);

        const messages = chatMessages.querySelectorAll(".bot-message");
        const thinkingMessage = messages[messages.length - 1];

        if (thinkingMessage && thinkingMessage.textContent === "Thinking...") {
            thinkingMessage.remove();
        }

        addMessage(
            "Sorry, I couldn't connect to the AI assistant.",
            "bot"
        );
    }
}

// Send button
if (sendMessage) {

    sendMessage.addEventListener("click", sendChatMessage);

}

// Enter key
if (chatInput) {

    chatInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            sendChatMessage();
        }

    });

}