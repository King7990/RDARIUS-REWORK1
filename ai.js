// ==========================================
// CHAT INTERFACE FUNCTIONALITY
// ==========================================
let isAiGloballyDisabled = false;

const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 🔑 GROQ API KEY
const API_KEY = "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";

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text;

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

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
                    {
                        role: "system",
                        content: "You are RDarius AI, a helpful assistant that answers clearly and friendly."
                    },
                    {
                        role: "user",
                        content: text
                    }
                ]
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            return data?.error?.message || "API Error ❌";
        }

        return data?.choices?.[0]?.message?.content || "No response 🤖";

    } catch (err) {
        console.log(err);
        return "Error connecting to AI ❌";
    }
}
async function sendMessage() {
    // 🛑 GLOBAL OVERRIDE CHECK
    if (isAiGloballyDisabled) {
        alert("The AI assistant has been temporarily disabled by an administrator.");
        return; // Stops the message from going through
    }

    const text = userInput.value.trim();
    if (!text) return;
}
    // ... rest of your original message code stays exactly the same


async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user-message");
    userInput.value = "";

    const typing = document.createElement("div");
    typing.classList.add("message", "bot-message");
    typing.innerText = "Typing...";
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    const reply = await getAIResponse(text);

    typing.remove();
    addMessage(reply, "bot-message");
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});


/* ==========================================================
   GLOBAL ADMINISTRATIVE SYNCHRONIZATION ENGINE (FOR AI PAGE)
========================================================== */

function setupHolidayContainers() {
    const effects = ["snow", "pumpkins", "hearts", "fireworks"];
    effects.forEach(id => {
        if (!document.getElementById(id)) {
            const container = document.createElement("div");
            container.id = id;
            // Style layers securely so they sit correctly behind content
            container.style.position = "fixed";
            container.style.inset = "0";
            container.style.pointerEvents = "none";
            container.style.zIndex = "-1";
            document.body.appendChild(container);
        }
    });
}

let fireworkInterval = null;

function clearHolidayEffects() {
    ["snow", "pumpkins", "hearts", "fireworks"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
    if (fireworkInterval) {
        clearInterval(fireworkInterval);
        fireworkInterval = null;
    }
}

function applyAdminSettings(config) {
    if (!config) return;

    // 1. Sync Theme Color Classes
    document.body.className = "";
    document.body.classList.add("theme-" + config.theme);

    // 2. Sync Holiday Animations Layer
    setupHolidayContainers();
    clearHolidayEffects();

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
            function triggerFirework() {
                const f = document.createElement("div");
                f.className = "firework";
                f.style.left = Math.random()*100+"%";
                f.style.top = (10+Math.random()*50)+"%";
                fireworksContainer.appendChild(f);
                setTimeout(() => f.remove(), 1200);
            }
            triggerFirework();
            fireworkInterval = setInterval(triggerFirework, 1000);
            break;
    }
}

// 3. Connect to Firebase Network Satellite
import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js").then((firebaseApp) => {
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js").then((firebaseDB) => {
        
        const firebaseConfig = {
            apiKey: "AIzaSyAar8wXGMm_TR_qiVD8vWos0ZjYc5UeiWQ",
            authDomain: "console-96eaa.firebaseapp.com",
            databaseURL: "https://console-96eaa-default-rtdb.firebaseio.com/", // Handshake complete!
            projectId: "console-96eaa",
            storageBucket: "console-96eaa.firebasestorage.app",
            messagingSenderId: "281939510727",
            appId: "1:281939510727:web:a6c0ff88cb2566fd5745e2",
            measurementId: "G-SQKJPGTSVN"
        };

        const app = firebaseApp.initializeApp(firebaseConfig);
        const db = firebaseDB.getDatabase(app);
        
        // Listen to live database events
        firebaseDB.onValue(firebaseDB.ref(db, "globalConfig"), (snapshot) => {
            applyAdminSettings(snapshot.val());
        });
    });
}).catch(err => console.error("Firebase sync configuration mismatch:", err));
