/**
 * FAQ Chatbot Module
 * Simple client-side FAQ chatbot with predefined responses
 * Matches portfolio design theme
 */

const FAQ_DATA = [
    {
        question: "What technologies do you use?",
        answer: "I specialize in <strong>Laravel</strong>, <strong>React</strong>, PHP, MySQL, HTML/CSS/JS, Docker, AWS. Full stack from frontend to deployment!"
    },
    {
        question: "How much experience do you have?",
        answer: "1+ years of professional experience with 20+ projects completed for 10+ clients. Building scalable billing systems and AI platforms."
    },
    {
        question: "How can I hire you?",
        answer: "Fill out the <a href='#contact' class='chat-link'>contact form</a> or email <strong>saim6624227@gmail.com</strong>. I'm available for freelance/full-time!"
    },
    {
        question: "What types of projects do you do?",
        answer: "Billing systems, AI-powered apps, customer dashboards, e-commerce platforms, SaaS apps. Laravel/React specialist."
    },
    {
        question: "Where are you located?",
        answer: "Based in <strong>Islamabad, Pakistan</strong>. Remote work worldwide!"
    },
    {
        question: "What are your rates?",
        answer: "Hourly: $10-15 USD | Fixed-price projects negotiable based on scope. <a href='#contact' class='chat-link'>Let's discuss your project!</a>"
    },
    {
        question: "Do you do frontend only or fullstack?",
        answer: "Full stack! I handle complete projects from React frontend to Laravel/MySQL backend + deployment."
    },
    {
        question: "How long does a typical project take?",
        answer: "Small: 1-2 weeks | Medium: 4-6 weeks | Large: 2-3 months. Depends on scope - happy to provide timeline estimates."
    },
    {
        question: "Can you integrate AI features?",
        answer: "Yes! I've built AI chatbots, content generation, data analysis using OpenAI APIs in Laravel/React apps."
    },
    {
        question: "How do we communicate?",
        answer: "WhatsApp/Telegram/Slack/Email + weekly updates. Tools like GitHub, Trello, Figma for collaboration."
    }
];

let chatOpen = false; // Fixed init issue

function initFaqChatbot() {
    createChatUI();
    setupEventListeners();
    console.log('FAQ Chatbot initialized'); // Debug
}

function createChatUI() {
    // Chat toggle button
    if (!document.querySelector('.chat-toggle-btn')) {
        const btn = document.createElement('button');
        btn.className = 'chat-toggle-btn';
        btn.innerHTML = '<i class="fas fa-comments"></i>';
        btn.setAttribute('aria-label', 'Toggle FAQ Chatbot');
        btn.title = 'FAQ Chatbot';
        document.body.appendChild(btn);
    }

    // Chat modal/panel
    if (!document.querySelector('.chatbot-container')) {
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-title">FAQ Assistant</div>
                <button class="chatbot-close" aria-label="Close chatbot">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
                <div class="chat-message bot">
                    <div class="message-bubble">
                        Hi Saim's FAQ Assistant! 👋<br><br><strong>Quick Answers:</strong><br>1️⃣ Tech stack<br>2️⃣ Hiring/rates<br>3️⃣ Experience<br>4️⃣ Projects<br>5️⃣ Location<br><br>Type number (1-5) or keywords!
                    </div>
                </div>
            </div>
            <div class="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Ask me anything..." maxlength="500">
                <button id="chatbot-send" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        document.body.appendChild(container);
    }
}

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function setupEventListeners() {
    const toggleBtn = document.querySelector('.chat-toggle-btn');
    const closeBtn = document.querySelector('.chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const chatContainer = document.querySelector('.chatbot-container');
    const chatHeader = document.querySelector('.chatbot-header');

    toggleBtn?.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', closeChat);
    sendBtn?.addEventListener('click', sendMessage);
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    chatHeader?.addEventListener('mousedown', (e) => {
        if (e.target.closest('.chatbot-close')) return;
        dragStart(e);
    });

    // Drag functionality - only on header
    document.addEventListener("mousemove", drag, false);
    document.addEventListener("mouseup", dragEnd, false);

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatOpen) closeChat();
    });
}

function dragStart(e) {
    if (chatOpen) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === document.querySelector('.chatbot-header')) {
            isDragging = true;
        }
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        document.querySelector('.chatbot-container').style.transform = 
            `translate(${currentX}px, ${currentY}px)`;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function toggleChat() {
    console.log('Toggle clicked'); // Debug
    if (chatOpen) {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
    chatOpen = true;
    localStorage.setItem('chatbot-open', 'true');
    document.body.classList.add('chatbot-open');
    document.querySelector('.chatbot-container')?.classList.add('open');
    document.querySelector('.chat-toggle-btn')?.classList.add('active');
}

function closeChat() {
    chatOpen = false;
    localStorage.setItem('chatbot-open', 'false');
    document.body.classList.remove('chatbot-open');
    document.querySelector('.chatbot-container')?.classList.remove('open');
    document.querySelector('.chat-toggle-btn')?.classList.remove('active');
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    const userText = input.value.trim();

    if (!userText) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<div class="message-bubble">${escapeHtml(userText)}</div>`;
    messages.appendChild(userMsg);
    input.value = '';

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;

    // Simulate bot response (find best match)
    setTimeout(() => {
        const response = getFaqResponse(userText.toLowerCase());
        addBotMessage(response);
    }, 800);
}

function getFaqResponse(question) {
    // Number matching
    if (question.includes('1') || question.includes('tech') || question.includes('stack') || question.includes('skill')) {
        return FAQ_DATA[0].answer;
    }
    if (question.includes('2') || question.includes('hire') || question.includes('rates') || question.includes('cost') || question.includes('price')) {
        return FAQ_DATA[2].answer;
    }
    if (question.includes('3') || question.includes('experience') || question.includes('exp') || question.includes('year')) {
        return FAQ_DATA[1].answer;
    }
    if (question.includes('4') || question.includes('project') || question.includes('work')) {
        return FAQ_DATA[3].answer;
    }
    if (question.includes('5') || question.includes('location') || question.includes('where')) {
        return FAQ_DATA[4].answer;
    }
    
    // Keyword fallback
    const bestMatch = FAQ_DATA.find(faq => 
        question.includes('ai') || question.includes('chatbot') ? faq.question.includes('AI') :
        question.includes('full stack') || question.includes('frontend') || question.includes('backend') ? faq.question.includes('fullstack') :
        false
    ) || FAQ_DATA[2]; // Default to hiring

    return bestMatch.answer;
}

function addBotMessage(html) {
    const messages = document.getElementById('chatbot-messages');
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message bot';
    botMsg.innerHTML = `<div class="message-bubble typing"></div>`;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        botMsg.querySelector('.message-bubble').innerHTML = html;
        botMsg.querySelector('.message-bubble').classList.remove('typing');
    }, 500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-init if script loaded directly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqChatbot);
} else {
    initFaqChatbot();
}

