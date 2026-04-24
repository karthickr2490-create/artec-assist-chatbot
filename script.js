const chatLauncher = document.getElementById("chatLauncher");
const chatbotWrapper = document.getElementById("chatbotWrapper");
const closeChat = document.getElementById("closeChat");

const chatBody = document.getElementById("chatBody");
const chatScroll = document.getElementById("chatScroll");
const leadForm = document.getElementById("leadForm");
const leadSection = document.getElementById("leadSection");
const interestDropdown = document.getElementById("interest");

/* Tell Hostinger iframe to expand */
function notifyParentChatOpen() {
    window.parent.postMessage("ARTEC_CHAT_OPEN", "*");
}

/* Tell Hostinger iframe to shrink */
function notifyParentChatClose() {
    window.parent.postMessage("ARTEC_CHAT_CLOSE", "*");
}

/* Open Chat */
chatLauncher.addEventListener("click", function () {
    chatbotWrapper.classList.add("open");
    chatLauncher.style.display = "none";
    notifyParentChatOpen();
});

/* Close Chat */
closeChat.addEventListener("click", function () {
    chatbotWrapper.classList.remove("open");
    chatLauncher.style.display = "flex";
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
                "We help enterprises modernize customer operations across AWS, Amazon Connect, Five9 and Genesys including IVR, routing, automation and contact center transformation.";
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
            "If you'd like, you can also share your details using the Share Your Details option."
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

/* Form Submit */
leadForm.addEventListener("submit", function () {
    addUserMessage("Submitting inquiry...");

    setTimeout(function () {
        addBotMessage(
            "Thank you. Your inquiry has been sent successfully. Our team will reach out soon."
        );
    }, 700);
});
