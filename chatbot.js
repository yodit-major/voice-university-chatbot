const chatMessages = document.getElementById("chat-messages");

const chatInput = document.getElementById("chat-input");

const sendButton = document.getElementById("send-button");

const voiceButton = document.getElementById("voice-button");

const voiceStatus = document.getElementById("voice-status");

const suggestions = document.getElementById("suggestions");

const themeToggle = document.getElementById("theme");

const voiceLanguage = document.getElementById("voiceLanguage");

let isWaiting = false;

let isListening = false;

let voiceAgent = null;

let voxideUnsubscribe = null;



/* AVATAR */

const avatarButton =
    document.getElementById(
        "avatarButton"
    );

const avatarMenu =
    document.getElementById(
        "avatarMenu"
    );

const closeAvatarMenu =
    document.getElementById(
        "closeAvatarMenu"
    );

const avatarPreview =
    document.getElementById(
        "avatarPreview"
    );

const userAvatar =
    document.getElementById(
        "userAvatar"
    );

const avatarUpload =
    document.getElementById(
        "avatarUpload"
    );

const saveAvatar =
    document.getElementById(
        "saveAvatar"
    );

const avatarOptions =
    document.querySelectorAll(
        ".avatar-option"
    );

let selectedAvatar =
    localStorage.getItem(
        "userAvatar"
    );

if (!selectedAvatar) {
    selectedAvatar =
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Tyobista";
}

userAvatar.src =
    selectedAvatar;

avatarPreview.src =
    selectedAvatar;

function updateBotAvatars() {

    document
        .querySelectorAll(".bot-avatar-image")
        .forEach(function (image) {

            image.src = selectedAvatar;

        });

}



/* THEME */

const savedTheme = localStorage.getItem("theme");

if (
    savedTheme === "dark" ||
    (
        !savedTheme &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    )
) {

    themeToggle.checked = true;

}

themeToggle.addEventListener(
    "change",
    function () {

        localStorage.setItem(
            "theme",
            this.checked ? "dark" : "light"
        );

    }
);



/* TIME */

function getTime() {

    return new Date().toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}



/* ADD USER MESSAGE */

function addUserMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "message user-message";

    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">
                <p>
                    ${escapeHTML(message)}
                </p>
            </div>

            <span class="message-time">
                ${getTime()}
            </span>
        </div>
    `;

    chatMessages.appendChild(
        messageElement
    );

    scrollToBottom();

}



/* ADD BOT MESSAGE */

function addBotMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "message bot-message";

    messageElement.innerHTML = `
        <div class="message-avatar">
            <img
                class="bot-avatar-image"
                src="${escapeHTML(selectedAvatar)}"
                alt="Assistant avatar"
            >
        </div>

        <div class="message-content">

            <div class="message-bubble">

                <p>
                    ${formatMessage(message)}
                </p>

            </div>

            <span class="message-time">
                ${getTime()}
            </span>

        </div>
    `;

    chatMessages.appendChild(
        messageElement
    );

    scrollToBottom();

}



/* FORMAT BOT RESPONSE */

function formatMessage(message) {

    if (!message) {
        return "";
    }

    return escapeHTML(message)
        .replace(/\n/g, "<br>")
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

}



/* ESCAPE HTML */

function escapeHTML(text) {

    const element =
        document.createElement("div");

    element.textContent =
        text;

    return element.innerHTML;

}



/* TYPING INDICATOR */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.id =
        "typing-indicator";

    typing.className =
        "typing-message";

    typing.innerHTML = `
        <div class="message-avatar">
            <img
                class="bot-avatar-image"
                src="${escapeHTML(selectedAvatar)}"
                alt="Assistant avatar"
            >
        </div>

        <div class="typing-bubble">

            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>

        </div>
    `;

    chatMessages.appendChild(
        typing
    );

    scrollToBottom();

}



/* HIDE TYPING */

function hideTyping() {

    const typing =
        document.getElementById(
            "typing-indicator"
        );

    if (typing) {
        typing.remove();
    }

}



/* SCROLL */

function scrollToBottom() {

    chatMessages.scrollTo({

        top: chatMessages.scrollHeight,

        behavior: "smooth"

    });

}



/* SEND MESSAGE */

async function sendMessage(message = null) {

    const text =
        message !== null
            ? message.trim()
            : chatInput.value.trim();

    if (!text || isWaiting) {
        return;
    }

    addUserMessage(text);

    chatInput.value = "";

    resizeInput();

    if (suggestions) {
        suggestions.style.display = "none";
    }

    isWaiting = true;

    sendButton.disabled = true;

    showTyping();

    try {

        const response = await fetch("/api/chat", {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: text
                    })
                }
            );

        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }

        const data =
            await response.json();

        hideTyping();

        const botResponse =
            data.response ||
            data.reply ||
            data.answer ||
            data.message;

        if (botResponse) {

            addBotMessage(
                botResponse
            );

        } else {

            addBotMessage(
                "I received a response, but I couldn't find the answer in the returned data."
            );

        }

    } catch (error) {

        console.error(
            "Chat error:",
            error
        );

        hideTyping();

        addBotMessage(
            "Sorry, I couldn't connect to the assistant right now. Please try again."
        );

    } finally {

        isWaiting = false;

        sendButton.disabled = false;

        chatInput.focus();

    }

}



/* SEND BUTTON */

sendButton.addEventListener(
    "click",
    function () {

        sendMessage();

    }
);



/* ENTER KEY */

chatInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);



/* TEXTAREA SIZE */

function resizeInput() {

    chatInput.style.height =
        "auto";

    chatInput.style.height =
        Math.min(
            chatInput.scrollHeight,
            120
        ) + "px";

}

chatInput.addEventListener(
    "input",
    resizeInput
);



/* SUGGESTIONS */

document
    .querySelectorAll(
        ".suggestion-button"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        button.dataset.question;

                    sendMessage(
                        question
                    );

                }
            );

        }
    );



/* VOICE STATUS */

function setVoiceStatus(message) {

    const statusText =
        voiceStatus.querySelector(
            "span:last-child"
        );

    if (statusText) {

        statusText.textContent =
            message;

    }

}



/* START VOICE UI */

function startVoiceUI() {

    isListening = true;

    voiceButton.classList.add(
        "listening"
    );

    voiceStatus.classList.add(
        "active"
    );

    setVoiceStatus(
        "Listening..."
    );

}



/* STOP VOICE UI */

function stopVoiceUI() {

    isListening = false;

    voiceButton.classList.remove(
        "listening"
    );

    voiceStatus.classList.remove(
        "active"
    );

}



/* VOXIDE */

async function initializeVoxide() {

    if (
        typeof Voxide === "undefined" ||
        typeof Voxide.VoxideClient !== "function"
    ) {

        console.error(
            "Voxide was not found. Make sure the Voxide script is loaded before chatbot.js."
        );

        voiceButton.disabled = true;

        voiceButton.title =
            "Voice service is unavailable";

        return;

    }

    try {

        voiceAgent =
            new Voxide.VoxideClient({

                publicKey:
                    "vox_pub_6fce45630be41da07c9ddc88f8c6125b3d5d63959df1a491"

            });

        await voiceAgent.init();

        voiceAgent.register({

            askUniversityQuestion: {

                description:
                    "Answers questions about universities, departments, programs, courses, events, and other university information using the university database.",

                params: {

                    question: {

                        type: "string",

                        required: true

                    }

                },

                handler:
                    async function ({
                        question
                    }) {

                        try {

                            const response =
                                await fetch(
                                    "http://localhost:3000/api/chat",
                                    {

                                        method: "POST",

                                        headers: {

                                            "Content-Type":
                                                "application/json"

                                        },

                                        body:
                                            JSON.stringify({
                                                message:
                                                    question
                                            })

                                    }
                                );

                            if (!response.ok) {

                                return {

                                    status:
                                        "error",

                                    message:
                                        "The university database could not be reached."

                                };

                            }

                            const data =
                                await response.json();

                            return {

                                status:
                                    "success",

                                answer:
                                    data.answer ||
                                    data.response ||
                                    data.message ||
                                    "No answer was found."

                            };

                        } catch (error) {

                            console.error(
                                "University database error:",
                                error
                            );

                            return {

                                status:
                                    "error",

                                message:
                                    "I could not connect to the university database."

                            };

                        }

                    }

            }

        });



        voxideUnsubscribe =
            voiceAgent.subscribe(
                function () {

                    const snapshot =
                        voiceAgent.getSnapshot();

                    if (!snapshot) {
                        return;
                    }

                    const status =
                        snapshot.status;

                    if (
                        status === "listening"
                    ) {

                        isListening =
                            true;

                        voiceButton.classList.add(
                            "listening"
                        );

                        voiceStatus.classList.add(
                            "active"
                        );

                        setVoiceStatus(
                            "Listening..."
                        );

                    } else if (
                        status === "thinking"
                    ) {

                        voiceButton.classList.add(
                            "listening"
                        );

                        voiceStatus.classList.add(
                            "active"
                        );

                        setVoiceStatus(
                            "Thinking..."
                        );

                    } else if (
                        status === "speaking"
                    ) {

                        voiceButton.classList.add(
                            "listening"
                        );

                        voiceStatus.classList.add(
                            "active"
                        );

                        setVoiceStatus(
                            "Speaking..."
                        );

                    } else if (
                        status === "executing"
                    ) {

                        voiceButton.classList.add(
                            "listening"
                        );

                        voiceStatus.classList.add(
                            "active"
                        );

                        setVoiceStatus(
                            "Working..."
                        );

                    } else if (
                        status === "connecting" ||
                        status === "armed"
                    ) {

                        voiceStatus.classList.add(
                            "active"
                        );

                        setVoiceStatus(
                            "Connecting..."
                        );

                    } else if (
                        status === "idle"
                    ) {

                        stopVoiceUI();

                    } else if (
                        status === "error"
                    ) {

                        stopVoiceUI();

                        setVoiceStatus(
                            "Voice service error."
                        );

                    }

                }
            );

        voiceButton.disabled = false;

        voiceButton.title =
            "Search by voice";

    } catch (error) {

        console.error(
            "Voxide initialization error:",
            error
        );

        voiceAgent = null;

        voiceButton.disabled = true;

        voiceButton.title =
            "Voice service is unavailable";

    }

}



/* VOICE BUTTON */

voiceButton.addEventListener(
    "click",
    async function () {

        if (!voiceAgent) {

            console.error(
                "Voxide has not been initialized."
            );

            setVoiceStatus(
                "Voice service unavailable."
            );

            voiceStatus.classList.add(
                "active"
            );

            setTimeout(
                function () {

                    voiceStatus.classList.remove(
                        "active"
                    );

                },
                2500
            );

            return;

        }

        try {

            const snapshot =
                voiceAgent.getSnapshot();

            if (
                snapshot &&
                (
                    snapshot.status === "listening" ||
                    snapshot.status === "thinking" ||
                    snapshot.status === "speaking" ||
                    snapshot.status === "executing" ||
                    snapshot.status === "connecting"
                )
            ) {

                return;

            }

            startVoiceUI();

            setVoiceStatus(
                "Connecting..."
            );

            await voiceAgent.connect();

        } catch (error) {

            console.error(
                "Voxide voice error:",
                error
            );

            stopVoiceUI();

            setVoiceStatus(
                "Voice input failed."
            );

            voiceStatus.classList.add(
                "active"
            );

            setTimeout(
                function () {

                    stopVoiceUI();

                },
                2000
            );

        }

    }
);



/* VOICE LANGUAGE */

voiceLanguage.addEventListener(
    "change",
    function () {

        if (voiceAgent) {

            console.log(
                "Voice language selected:",
                voiceLanguage.value
            );

        }

    }
);



/* INITIALIZE */

lucide.createIcons();

chatInput.focus();

initializeVoxide();



/* AVATAR */

avatarButton.addEventListener(
    "click",
    function () {

        avatarMenu.classList.toggle(
            "active"
        );

    }
);

closeAvatarMenu.addEventListener(
    "click",
    function () {

        avatarMenu.classList.remove(
            "active"
        );

    }
);

avatarOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function () {

                selectedAvatar =
                    option.dataset.avatar;

                avatarPreview.src =
                    selectedAvatar;

                avatarOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );

                option.classList.add(
                    "selected"
                );

            }
        );

    }
);

avatarUpload.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select an image."
            );

            return;

        }

        const reader =
            new FileReader();

        reader.onload =
            function (e) {

                selectedAvatar =
                    e.target.result;

                avatarPreview.src =
                    selectedAvatar;

                avatarOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );

            };

        reader.readAsDataURL(
            file
        );

    }
);

saveAvatar.addEventListener(
    "click",
    function () {

        if (!selectedAvatar) {
            return;
        }

        localStorage.setItem(
            "userAvatar",
            selectedAvatar
        );

        userAvatar.src =
            selectedAvatar;

        updateBotAvatars();

        avatarMenu.classList.remove(
            "active"
        );

    }
);

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".avatar-area"
            )
        ) {

            avatarMenu.classList.remove(
                "active"
            );

        }

    }
);

updateBotAvatars();