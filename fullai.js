/* ==========================================================
   RDARIUS AI - CORE CHAT ENGINE & ADMIN SYNC
   fullai.js
========================================================== */

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const chatScreen = document.getElementById("chatScreen");

const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 🔑 PUT YOUR GROQ API KEY HERE
const API_KEY = "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";

// ===============================
// START BUTTON → SHOW CHAT
// ===============================
startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");
    chatBody.scrollTop = chatBody.scrollHeight;
});

// ===============================
// ADD MESSAGE WITH FORMATTING
// ===============================
function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    
    // Converts line breaks into actual HTML breaks for smoother reading
    msg.innerHTML = text.replace(/\n/g, "<br>"); 

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ===============================
// GROQ AI REQUEST
// ===============================
async function getAIResponse(text) {
    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "You are RDarius AI, a helpful, polite, and advanced assistant." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await res.json();

        if (!res.ok) {
            return data?.error?.message || "API Error ❌";
        }

        return data?.choices?.[0]?.message?.content || "No response 🤖";

    } catch (err) {
        console.error("ERROR:", err);
        return "Network error ❌";
    }
}

// ===============================
// SEND MESSAGE ACTION
// ===============================
async function sendMessage() {
    // Block messaging if the admin turned the AI off
    if (window.AI_ENABLED === false) return;

    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    // Show custom typing element
    const typing = document.createElement("div");
    typing.classList.add("message", "bot", "typing-pulse");
    typing.innerText = "RDarius is typing...";
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    const reply = await getAIResponse(text);

    typing.remove();
    addMessage(reply, "bot");
}

// ===============================
// INTERACTION EVENTS
// ===============================
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});


/* ==========================================================
   GLOBAL ADMINISTRATIVE SYNCHRONIZATION ENGINE
========================================================== */

// Safely structuralize background particles containers for events
function setupHolidayContainers() {
    const effects = ["snow", "pumpkins", "hearts", "fireworks"];
    effects.forEach(id => {
        if (!document.getElementById(id)) {
            const container = document.createElement("div");
            container.id = id;
            document.body.appendChild(container);
        }
    });
}

let chatFireworkInterval = null;

function clearChatHolidayEffects() {
    ["snow", "pumpkins", "hearts", "fireworks"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
    if (chatFireworkInterval) {
        clearInterval(chatFireworkInterval);
        chatFireworkInterval = null;
    }
}

function applyAdminSettings() {
    // Read synchronization configuration data generated from dashboard.js
    const config = JSON.parse(localStorage.getItem("rdarius-config"));
    if (!config) return;

    // 1. SYNC THE MULTIPLE COLOR THEMES
    document.body.className = "";
    document.body.classList.add("theme-" + config.theme);

    // 2. SYNC GLOBAL AI TOGGLE
    window.AI_ENABLED = config.aiEnabled;
    
    if (userInput && sendBtn) {
        if (config.aiEnabled === false) {
            userInput.disabled = true;
            userInput.placeholder = "🚫 RDarius AI is currently turned offline by Admin.";
            sendBtn.style.opacity = "0.4";
            sendBtn.style.pointerEvents = "none";
        } else {
            userInput.disabled = false;
            userInput.placeholder = "Ask RDarius anything...";
            sendBtn.style.opacity = "1";
            sendBtn.style.pointerEvents = "auto";
        }
    }

    // 3. SYNC HOLIDAY EFFECTS SYSTEM
    setupHolidayContainers();
    clearChatHolidayEffects();

    const snowContainer = document.getElementById("snow");
    const pumpkinsContainer = document.getElementById("pumpkins");
    const heartsContainer = document.getElementById("hearts");
    const fireworksContainer = document.getElementById("fireworks");

    switch(config.holiday) {
        case "christmas":
            for(let i=0; i<60; i++){
                const flake = document.createElement("div");
                flake.className = "snow";
                flake.innerHTML = "❄";
                flake.style.left = Math.random()*100+"%";
                flake.style.animationDuration = (Math.random()*5+5)+"s";
                flake.style.animationDelay = Math.random()*5+"s";
                flake.style.fontSize = (12+Math.random()*18)+"px";
                snowContainer.appendChild(flake);
            }
            break;

        case "halloween":
            for(let i=0; i<25; i++){
                const p = document.createElement("div");
                p.className = "pumpkin";
                p.innerHTML = "🎃";
                p.style.left = Math.random()*100+"%";
                p.style.animationDuration = (5+Math.random()*6)+"s";
                p.style.animationDelay = Math.random()*5+"s";
                p.style.fontSize = (18+Math.random()*20)+"px";
                pumpkinsContainer.appendChild(p);
            }
            break;

        case "valentine":
            const emojis = ["❤️", "💖", "💕", "💘", "💝"];
            for(let i=0; i<35; i++){
                const h = document.createElement("div");
                h.className = "heart";
                h.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
                h.style.left = Math.random()*100+"%";
                h.style.animationDuration = (6+Math.random()*5)+"s";
                h.style.animationDelay = Math.random()*5+"s";
                h.style.fontSize = (16+Math.random()*18)+"px";
                heartsContainer.appendChild(h);
            }
            break;

        case "newyear":
            function triggerChatFirework() {
                const f = document.createElement("div");
                f.className = "firework";
                f.style.left = Math.random()*100+"%";
                f.style.top = (10+Math.random()*50)+"%";
                fireworksContainer.appendChild(f);
                setTimeout(() => f.remove(), 1200);
            }
            triggerChatFirework();
            chatFireworkInterval = setInterval(triggerChatFirework, 1000);
            break;
    }
}

// Storage event listener updates open application tabs instantly
window.addEventListener("storage", applyAdminSettings);
window.addEventListener("DOMContentLoaded", applyAdminSettings);

/* ==========================================================
   GLOBAL FIREBASE SATELLITE CONNECTION LAYER
   Paste this at the very bottom of your fullai.js file
========================================================== */
import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js").then((firebaseApp) => {
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js").then((firebaseDB) => {
        
        // 🔑 PASTE YOUR FIREBASE BUNDLE VALUES HERE:
        const firebaseConfig = {
            apiKey: "AIzaSyAar8wXGMm_TR_qiVD8vWos0ZjYc5UeiWQ",
  authDomain: "console-96eaa.firebaseapp.com",
  projectId: "console-96eaa",
  storageBucket: "console-96eaa.firebasestorage.app",
  messagingSenderId: "281939510727",
  appId: "1:281939510727:web:a6c0ff88cb2566fd5745e2",
  measurementId: "G-SQKJPGTSVN"
        };

        // Initialize connection
        const app = firebaseApp.initializeApp(firebaseConfig);
        const db = firebaseDB.getDatabase(app);
        
        // Listen to the cloud and run your working applyAdminSettings() function automatically
        firebaseDB.onValue(firebaseDB.ref(db, "globalConfig"), (snapshot) => {
            const data = snapshot.val();
            if (typeof applyAdminSettings === "function") {
                applyAdminSettings(data);
            }
        });
    });
}).catch(err => console.error("Firebase load error:", err));

// Intercept your local storage events to seamlessly push data to Firebase
window.addEventListener("storage", () => {
    const localData = localStorage.getItem("rdarius-config");
    if (!localData || !globalDB || !firebaseDBModule) return;

    try {
        const config = JSON.parse(localData);
        firebaseDBModule.set(firebaseDBModule.ref(globalDB, "globalConfig"), {
            theme: config.theme,
            holiday: config.holiday,
            aiEnabled: config.aiEnabled
        });
    } catch(e) {
        console.error("Cloud broadcast failed:", e);
    }
});