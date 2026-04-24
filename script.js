const chatLauncher = document.getElementById("chatLauncher");
const chatbotWrapper = document.getElementById("chatbotWrapper");
const closeChat = document.getElementById("closeChat");

const chatBody = document.getElementById("chatBody");
const chatScroll = document.getElementById("chatScroll");
const leadForm = document.getElementById("leadForm");
const leadSection = document.getElementById("leadSection");
const interestDropdown = document.getElementById("interest");

function notifyParentChatOpen() {
    window.parent.postMessage("ARTEC_CHAT_OPEN", "*");
}

function notifyParentChatClose() {
    window.parent.postMessage("ARTEC_CHAT_CLOSE", "*");
}

function lockMobileScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
}

function unlockMobileScroll() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
}

/* Open Chat */
chatLauncher.addEventListener("click", function () {
    chatbotWrapper.classList.add("open");
    chatLauncher.style.display = "none";
    lockMobileScroll();
    notifyParentChatOpen();
    scrollChat();
});

/* Close Chat */
closeChat.addEventListener("click", function () {
    chatbotWrapper.classList.remove("open");
    chatLauncher.style.display = "flex";
    unlockMobileScroll();
    notifyParentChatClose();
});

/* Add User Bubble */
function addUserMessage(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "message user-message";

    wrapper.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-avatar">U</div>
    `;

    chatBody.appendChild(wrapper);
    scrollChat();
}

/* Add Bot Bubble */
function addBotMessage(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "message bot-message";

    wrapper.innerHTML = `
        <div class="message-avatar">A</div>
        <div class="message-content">${text}</div>
    `;

    chatBody.appendChild(wrapper);
    scrollChat();
}

/* Scroll Chat */
function scrollChat() {
    setTimeout(function () {
        chatScroll.scrollTop = chatScroll.scrollHeight;
    }, 120);
}

/* Topic Selection */
function selectTopic(topic) {
    addUserMessage(topic);

    if (interestDropdown) {
        interestDropdown.value = topic;
    }

    let response = "";

    switch (topic) {
        case "Contact Center Technologies":
            response =
                "We help enterprises modernize customer operations across AWS, Amazon Connect, Five9 and Genesys, including IVR, routing, automation and contact center transformation.";
            break;

        case "Agentic AI, ML & Process Intelligence":
            response =
                "We support agentic AI solutions including intelligent email, chat and voice automation, orchestration, human-in-the-loop workflows and process intelligence.";
            break;

        case "CPU/GPU & Semiconductor Engineering":
            response =
                "We support advanced compute engineering including CPU/GPU engineering, verification engineering and accelerated systems initiatives.";
            break;

        case "Enterprise Architecture & Skill Delivery":
            response =
                "We support architecture-led solutioning, delivery pods, specialized engineering talent and enterprise transformation programs.";
            break;

        case "Careers / Resume Submission":
            response =
                "Thank you for your interest in careers at Artec. Please use Share Your Details to submit your profile or inquiry.";
            break;

        default:
            response =
                "Thank you for reaching out. Please share your requirement details below.";
    }

    setTimeout(function () {
        addBotMessage(response);
    }, 500);

    setTimeout(function () {
        addBotMessage(
            "You can also share your details using the Share Your Details option."
        );
    }, 1400);
}

/* Show Lead Form */
function showLeadForm() {
    addUserMessage("Share Your Details");

    setTimeout(function () {
        addBotMessage(
            "Please share your contact details below and our team will reach out shortly."
        );

        leadSection.classList.add("show");

        setTimeout(function () {
            leadSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 250);
    }, 500);
}

/* Show Final Thank You Message */
function showThankYouMessage() {
    leadSection.innerHTML = `
        <div class="thank-you-box">
            <div class="thank-you-icon">✓</div>

            <h2>Thank you!</h2>

            <p>
                Your inquiry has been submitted successfully.<br>
                Our team will contact you shortly.
            </p>

            <button onclick="closeThankYouChat()" class="thank-you-close-btn">
                Close
            </button>
        </div>
    `;

    leadSection.classList.add("show");

    setTimeout(function () {
        leadSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 150);
}

/* Close Thank You */
function closeThankYouChat() {
    chatbotWrapper.classList.remove("open");
    chatLauncher.style.display = "flex";
    unlockMobileScroll();
    notifyParentChatClose();
}

/* Submit Form Without Redirect */
leadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    addUserMessage("Submitting inquiry...");

    const formData = new FormData(leadForm);

    fetch(leadForm.action, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json"
        }
    })
        .then(function (response) {
            if (response.ok) {
                addBotMessage("Thank you. Your inquiry has been sent successfully.");
                leadForm.reset();
                showThankYouMessage();
            } else {
                addBotMessage("Sorry, something went wrong while submitting. Please try again.");
            }
        })
        .catch(function () {
            addBotMessage("Sorry, something went wrong while submitting. Please try again.");
        });
});

/* Handle browser resize / orientation change */
window.addEventListener("resize", function () {
    if (chatbotWrapper.classList.contains("open")) {
        scrollChat();
    }
});

window.addEventListener("orientationchange", function () {
    setTimeout(function () {
        if (chatbotWrapper.classList.contains("open")) {
            scrollChat();
        }
    }, 400);
});
