/* ==========================================================
   RDARIUS AI ADMIN PANEL
   dashboard.js
   PART 1
========================================================== */

console.clear();

console.log("RDarius AI Admin Loaded");

/* ==========================================================
STATE
========================================================== */

const defaultState = {

theme:"purple",

holiday:"none",

ai:true,

password:"1234",

sidebar:false,

serverID:"RD-"+Math.floor(Math.random()*900000+100000)

};

let state =
JSON.parse(localStorage.getItem("rdarius-admin")) ||
defaultState;

/* ==========================================================
SAVE
========================================================== */
function saveState() {
    // 1. Saves to the admin panel itself
    localStorage.setItem("rdarius-admin", JSON.stringify(state));

    // 2. THIS IS THE MAGIC BRIDGE: It formats the data for your chat page
    const crossPageConfig = {
        theme: state.theme,
        holiday: state.holiday,
        aiEnabled: state.ai
    };
    localStorage.setItem("rdarius-config", JSON.stringify(crossPageConfig));

    // 3. This triggers the instant update across tabs
    window.dispatchEvent(new Event("storage"));
}

/* ==========================================================
ELEMENTS
========================================================== */

const body=document.body;

const loadingScreen=
document.getElementById("loadingScreen");

const toastContainer=
document.getElementById("toastContainer");

const sidebar=
document.getElementById("sidebar");

const pageTitle=
document.getElementById("pageTitle");

/* ==========================================================
LOADING
========================================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.style.opacity="0";

loadingScreen.style.pointerEvents="none";

setTimeout(()=>{

loadingScreen.remove();

},600);

},1800);

});

/* ==========================================================
THEME
========================================================== */

function applyTheme(){

body.className="";

body.classList.add(

"theme-"+state.theme

);

const t=

document.getElementById("currentTheme");

if(t){

t.innerText=

state.theme.charAt(0).toUpperCase()

+

state.theme.slice(1);

}

}

/* ==========================================================
THEME BUTTONS
========================================================== */

document

.querySelectorAll(".theme-btn")

.forEach(btn=>{

btn.onclick=()=>{

state.theme=

btn.dataset.theme;

applyTheme();

saveState();

toast(

"🎨 Theme changed to "

+

btn.innerText,

"success"

);

};

});

/* ==========================================================
TOAST
========================================================== */

function toast(message,type="success"){

const div=

document.createElement("div");

div.className=

"toast "+type;

div.innerHTML=message;

toastContainer.appendChild(div);

setTimeout(()=>{

div.style.opacity="0";

div.style.transform=

"translateX(120px)";

setTimeout(()=>{

div.remove();

},500);

},3000);

}

/* ==========================================================
PAGES
========================================================== */

document

.querySelectorAll(".nav")

.forEach(button=>{

button.onclick=()=>{

document

.querySelectorAll(".nav")

.forEach(n=>

n.classList.remove("active")

);

button.classList.add("active");

document

.querySelectorAll(".page")

.forEach(p=>

p.classList.remove("active")

);

document

.getElementById(

button.dataset.page

)

.classList.add("active");

pageTitle.innerText=

button.innerText.trim();

};

});

/* ==========================================================
PREVIEW WEBSITE
========================================================== */

const preview=

document.getElementById(

"previewWebsite"

);

if(preview){

preview.onclick=()=>{

window.open(

"ai.html",

"_blank"

);

};

}

/* ==========================================================
LOGOUT
========================================================== */

const logout=

document.getElementById(

"logout"

);

logout.onclick=()=>{

toast(

"👋 Logging out...",

"warning"

);

setTimeout(()=>{

window.location.href=

"admin.html";

},1200);

};

/* ==========================================================
SIDEBAR
========================================================== */

const collapse=

document.getElementById(

"collapseSidebar"

);

collapse.onclick=()=>{

sidebar.classList.toggle(

"collapsed"

);

state.sidebar=

sidebar.classList.contains(

"collapsed"

);

saveState();

};

if(state.sidebar){

sidebar.classList.add(

"collapsed"

);

}

/* ==========================================================
INIT
========================================================== */

applyTheme();

saveState();

console.log("Part 1 Ready");

/* ==========================================================
   PART 2 - HOLIDAY SYSTEM
========================================================== */

const snow = document.getElementById("snow");
const pumpkins = document.getElementById("pumpkins");
const hearts = document.getElementById("hearts");
const fireworks = document.getElementById("fireworks");
const holidaySelect = document.getElementById("holiday");

/* ==========================================================
CLEAR EFFECTS
========================================================== */

let fireworkInterval = null;

function clearHolidayEffects(){

    snow.innerHTML = "";
    pumpkins.innerHTML = "";
    hearts.innerHTML = "";
    fireworks.innerHTML = "";

    if(fireworkInterval){
        clearInterval(fireworkInterval);
        fireworkInterval = null;
    }
}

/* ==========================================================
CHRISTMAS
========================================================== */

function createSnow(){

    for(let i=0;i<80;i++){

        const flake=document.createElement("div");

        flake.className="snow";

        flake.innerHTML="❄";

        flake.style.left=Math.random()*100+"%";

        flake.style.animationDuration=
        (Math.random()*5+5)+"s";

        flake.style.animationDelay=
        Math.random()*5+"s";

        flake.style.fontSize=
        (12+Math.random()*18)+"px";

        snow.appendChild(flake);

    }

}

/* ==========================================================
HALLOWEEN
========================================================== */

function createPumpkins(){

    for(let i=0;i<35;i++){

        const p=document.createElement("div");

        p.className="pumpkin";

        p.innerHTML="🎃";

        p.style.left=Math.random()*100+"%";

        p.style.animationDuration=
        (5+Math.random()*6)+"s";

        p.style.animationDelay=
        Math.random()*5+"s";

        p.style.fontSize=
        (18+Math.random()*20)+"px";

        pumpkins.appendChild(p);

    }

}

/* ==========================================================
VALENTINE
========================================================== */

function createHearts(){

    const emojis=[
        "❤️",
        "💖",
        "💕",
        "💘",
        "💝"
    ];

    for(let i=0;i<55;i++){

        const h=document.createElement("div");

        h.className="heart";

        h.innerHTML=
        emojis[
        Math.floor(Math.random()*emojis.length)
        ];

        h.style.left=Math.random()*100+"%";

        h.style.animationDuration=
        (6+Math.random()*5)+"s";

        h.style.animationDelay=
        Math.random()*5+"s";

        h.style.fontSize=
        (16+Math.random()*18)+"px";

        hearts.appendChild(h);

    }

}

/* ==========================================================
NEW YEAR
========================================================== */

function createFirework(){

    const f=document.createElement("div");

    f.className="firework";

    f.style.left=Math.random()*100+"%";

    f.style.top=(10+Math.random()*50)+"%";

    fireworks.appendChild(f);

    setTimeout(()=>{

        f.remove();

    },1200);

}

function startFireworks(){

    createFirework();

    fireworkInterval=setInterval(()=>{

        createFirework();

    },900);

}

/* ==========================================================
APPLY HOLIDAY
========================================================== */

function applyHoliday(){

    clearHolidayEffects();

    switch(state.holiday){

        case "christmas":

            createSnow();

            break;

        case "halloween":

            createPumpkins();

            break;

        case "valentine":

            createHearts();

            break;

        case "newyear":

            startFireworks();

            break;

    }

    const currentHoliday =
    document.getElementById("currentHoliday");

    if(currentHoliday){

        if(state.holiday==="none")
            currentHoliday.innerText="Off";

        else
            currentHoliday.innerText=
            state.holiday.charAt(0).toUpperCase()+
            state.holiday.slice(1);

    }

}

/* ==========================================================
HOLIDAY SELECTOR
========================================================== */

if(holidaySelect){

    holidaySelect.value=state.holiday;

    holidaySelect.onchange=()=>{

        state.holiday=
        holidaySelect.value;

        saveState();

        applyHoliday();

        toast(
            "🎉 Holiday changed to "
            + holidaySelect.options[
            holidaySelect.selectedIndex
            ].text,
            "success"
        );

    };

}

/* ==========================================================
LOAD SAVED HOLIDAY
========================================================== */

applyHoliday();

console.log("Holiday System Loaded");

/* ==========================================================
   PART 3 - LIVE DASHBOARD SYSTEM (CLEAN VERSION)
========================================================== */

/* ==========================================================
AI TOGGLE
========================================================== */

const toggleAI = document.getElementById("toggleAI");
const aiStatus = document.getElementById("aiStatus");

function updateAI() {
    if (!toggleAI || !aiStatus) return;

    aiStatus.innerText = state.ai ? "🟢 Online" : "🔴 Offline";
    toggleAI.innerText = state.ai ? "Disable AI" : "Enable AI";
}

if (toggleAI) {
    toggleAI.onclick = () => {
        state.ai = !state.ai;
        saveState();
        updateAI();

        toast(
            state.ai ? "🤖 AI Enabled" : "🚫 AI Disabled",
            "warning"
        );
    };
}

/* ==========================================================
LIVE USERS + CHATS COUNTERS
========================================================== */

const usersEl = document.getElementById("users");
const chatsEl = document.getElementById("chats");

function updateCounters() {
    if (usersEl) {
        usersEl.innerText = Math.floor(Math.random() * 60);
    }

    if (chatsEl) {
        chatsEl.innerText = Math.floor(Math.random() * 800);
    }
}

/* ==========================================================
SERVER UPTIME SIMULATION
========================================================== */

const uptimeEl = document.getElementById("uptime");

function updateUptime() {
    if (!uptimeEl) return;

    const percent = (99 + Math.random()).toFixed(2);
    uptimeEl.innerText = percent + "%";
}

/* ==========================================================
RECENT ACTIVITY FEED
========================================================== */

const activityFeed = document.getElementById("activityFeed");

function addActivity(text) {
    if (!activityFeed) return;

    const div = document.createElement("div");
    div.className = "activityItem";
    div.innerText = text;

    activityFeed.prepend(div);

    if (activityFeed.children.length > 6) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

function generateActivity() {
    const logs = [
        "AI responded to user query",
        "New session started",
        "Theme updated",
        "User joined dashboard",
        "Server ping successful",
        "Chat processed"
    ];

    addActivity(logs[Math.floor(Math.random() * logs.length)]);
}

/* ==========================================================
BUTTONS
========================================================== */

const restartAI = document.getElementById("restartAI");
const refreshStats = document.getElementById("refreshStats");

if (restartAI) {
    restartAI.onclick = () => {
        toast("🔄 Restarting AI...", "warning");

        setTimeout(() => {
            toast("🤖 AI Restarted", "success");
        }, 1800);
    };
}

if (refreshStats) {
    refreshStats.onclick = () => {
        updateCounters();
        updateUptime();
        toast("📊 Dashboard updated", "success");
    };
}

/* ==========================================================
AUTO LIVE SYSTEM
========================================================== */

setInterval(() => {
    updateCounters();
    updateUptime();
}, 4000);

setInterval(() => {
    generateActivity();
}, 3000);

/* ==========================================================
INIT PART 3
========================================================== */

updateAI();
updateCounters();
updateUptime();

console.log("Part 3 Clean Loaded");

/* ==========================================================
   PART 4 - STATE SYNC + PERSISTENCE LAYER
========================================================== */

/* ==========================================================
SAFE STATE LOADER
========================================================== */

function safeLoadState() {
    try {
        const saved = JSON.parse(localStorage.getItem("rdarius-admin"));
        if (!saved) return;

        state = { ...defaultState, ...saved };
    } catch (e) {
        console.log("State load failed, resetting...");
        state = defaultState;
    }
}

/* ==========================================================
PERSIST ACTIVITY FEED
========================================================== */

function saveActivityToStorage(text) {
    let logs = JSON.parse(localStorage.getItem("rdarius-activity")) || [];

    logs.unshift({
        text,
        time: Date.now()
    });

    if (logs.length > 20) logs.pop();

    localStorage.setItem("rdarius-activity", JSON.stringify(logs));
}

function loadActivityFromStorage() {
    const logs = JSON.parse(localStorage.getItem("rdarius-activity")) || [];

    logs.forEach(log => {
        const div = document.createElement("div");
        div.className = "activityItem";
        div.innerText = log.text;
        activityFeed?.appendChild(div);
    });
}

/* ==========================================================
ENHANCED ACTIVITY FUNCTION (OVERRIDE SAFE)
========================================================== */

function addActivity(text, save = true) {
    if (!activityFeed) return;

    const div = document.createElement("div");
    div.className = "activityItem";
    div.innerText = text;

    activityFeed.prepend(div);

    if (activityFeed.children.length > 6) {
        activityFeed.removeChild(activityFeed.lastChild);
    }

    if (save) saveActivityToStorage(text);
}

/* ==========================================================
CONTROL INTERVAL MANAGEMENT (PREVENT DOUBLE RUNS)
========================================================== */

let intervals = [];

function safeInterval(fn, time) {
    const id = setInterval(fn, time);
    intervals.push(id);
    return id;
}

function clearAllIntervals() {
    intervals.forEach(id => clearInterval(id));
    intervals = [];
}

/* ==========================================================
REPLACE OLD INTERVALS WITH SAFE ONES
========================================================== */

clearAllIntervals();

/* re-register clean intervals */
safeInterval(() => {
    updateCounters();
    updateUptime();
}, 4000);

safeInterval(() => {
    const logs = [
        "AI responded to request",
        "User session active",
        "Theme engine running",
        "Dashboard sync complete",
        "Server heartbeat OK"
    ];

    addActivity(logs[Math.floor(Math.random() * logs.length)]);
}, 3000);

/* ==========================================================
FULL UI RE-SYNC ON LOAD
========================================================== */

function syncUI() {
    applyTheme();
    updateAI();

    if (state.serverID) {
        const el = document.getElementById("serverID");
        if (el) el.innerText = state.serverID;
    }

    const holidaySelect = document.getElementById("holiday");
    if (holidaySelect) {
        holidaySelect.value = state.holiday;
    }
}

/* ==========================================================
INITIAL BOOT FIX
========================================================== */

safeLoadState();
loadActivityFromStorage();
syncUI();

/* ensure activity function is globally safe */
window.addActivity = addActivity;

console.log("Part 4 Sync Layer Ready");

/* ==========================================================
   PART 5 - UI POLISH + UX IMPROVEMENTS
========================================================== */

/* ==========================================================
SMOOTH PAGE SWITCH TRANSITIONS
========================================================== */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");

function switchPage(pageId) {
    pages.forEach(p => {
        p.style.opacity = "0";
        p.style.transform = "translateY(10px)";
        setTimeout(() => {
            p.classList.remove("active");
        }, 150);
    });

    setTimeout(() => {
        const target = document.getElementById(pageId);
        if (!target) return;

        target.classList.add("active");

        setTimeout(() => {
            target.style.opacity = "1";
            target.style.transform = "translateY(0px)";
        }, 50);
    }, 150);
}

/* override nav behavior safely */
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.page;

        navButtons.forEach(n => n.classList.remove("active"));
        btn.classList.add("active");

        switchPage(page);

        pageTitle.innerText = btn.innerText.trim();
    });
});

/* ==========================================================
TOAST QUEUE SYSTEM (prevents spam stacking)
========================================================== */

let toastQueue = [];
let toastActive = false;

function showNextToast() {
    if (toastQueue.length === 0) {
        toastActive = false;
        return;
    }

    toastActive = true;

    const { message, type } = toastQueue.shift();

    const div = document.createElement("div");
    div.className = "toast " + type;
    div.innerHTML = message;

    toastContainer.appendChild(div);

    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateX(120px)";

        setTimeout(() => {
            div.remove();
            showNextToast();
        }, 400);
    }, 2500);
}

/* override global toast safely */
function toast(message, type = "success") {
    toastQueue.push({ message, type });

    if (!toastActive) {
        showNextToast();
    }
}

/* ==========================================================
LOADING SCREEN IMPROVEMENT (SMOOTHER EXIT)
========================================================== */

window.addEventListener("load", () => {
    setTimeout(() => {
        if (!loadingScreen) return;

        loadingScreen.style.opacity = "0";
        loadingScreen.style.transform = "scale(1.05)";

        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 700);
    }, 1200);
});

/* ==========================================================
SIDEBAR SMOOTH COLLAPSE ANIMATION FIX
========================================================== */

if (sidebar) {
    sidebar.style.transition = "all 0.3s ease";
}

/* ==========================================================
BUTTON CLICK FEEDBACK (GLOBAL UX BOOST)
========================================================== */

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.97)";

        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 120);
    });
});

/* ==========================================================
FINAL UI SYNC PASS
========================================================== */

function finalUISync() {
    document.body.style.transition = "background 0.3s ease, color 0.3s ease";

    const activePage = document.querySelector(".page.active");
    if (activePage) {
        activePage.style.opacity = "1";
        activePage.style.transform = "translateY(0px)";
    }
}

finalUISync();

console.log("Part 5 UI Polish Loaded");

/* ==========================================================
   PART 6 - FINAL SYSTEM LAYER (PRODUCTION READY BASE)
========================================================== */

/* ==========================================================
DEV / DEBUG MODE
========================================================== */

const DEV_MODE = true;

function debugLog(...args) {
    if (DEV_MODE) {
        console.log("[RDARIUS DEBUG]", ...args);
    }
}

/* ==========================================================
AI HOOK SYSTEM (READY FOR REAL API INTEGRATION)
========================================================== */

async function aiRequest(prompt) {
    debugLog("AI Request:", prompt);

    if (!state.ai) {
        return "AI is currently disabled.";
    }

    // PLACEHOLDER (you can connect Groq / OpenAI here later)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("🤖 AI Response (mock): " + prompt);
        }, 800);
    });
}

/* ==========================================================
GLOBAL ERROR SAFETY NET
========================================================== */

window.addEventListener("error", (e) => {
    debugLog("Error caught:", e.message);

    toast(
        "⚠️ System error detected (check console)",
        "warning"
    );
});

/* ==========================================================
MEMORY CLEANUP (PREVENT PERFORMANCE DRIFT)
========================================================== */

function cleanupSystem() {
    // remove extra activity items if too many
    const items = document.querySelectorAll(".activityItem");

    if (items.length > 30) {
        for (let i = 30; i < items.length; i++) {
            items[i].remove();
        }
    }

    debugLog("Cleanup executed");
}

setInterval(cleanupSystem, 15000);

/* ==========================================================
SYSTEM HEALTH MONITOR
========================================================== */

function systemHealth() {
    const health = {
        theme: state.theme,
        ai: state.ai,
        sidebar: state.sidebar,
        holiday: state.holiday,
        memoryUsage: performance.memory
            ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + "MB"
            : "N/A"
    };

    debugLog("System Health:", health);
}

setInterval(systemHealth, 10000);

/* ==========================================================
BOOT SEQUENCE (FINAL INITIALIZER)
========================================================== */

function bootSystem() {
    debugLog("Boot sequence starting...");

    applyTheme();
    updateAI();

    if (state.serverID) {
        const el = document.getElementById("serverID");
        if (el) el.innerText = state.serverID;
    }

    syncUI?.();
    updateCounters?.();
    updateUptime?.();

    debugLog("Boot complete ✔");
}

bootSystem();

/* ==========================================================
GLOBAL WINDOW EXPOSURE (FOR FUTURE FEATURES)
========================================================== */

window.RDARIUS = {
    state,
    toast,
    addActivity,
    aiRequest,
    debug: debugLog
};

/* ==========================================================
FINAL LOG
========================================================== */

console.log("🚀 RDarius AI Admin Fully Loaded (v2 Complete)");
debugLog("All systems operational");