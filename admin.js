const form = document.getElementById("adminForm");
const passwordInput = document.getElementById("adminPassword");
const error = document.getElementById("error");

// load saved password OR default
const ADMIN_PASSWORD = localStorage.getItem("adminPassword") || "PASSword1";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = passwordInput.value.trim();

    if (password === "") {
        error.textContent = "Please enter your password.";
        error.style.color = "#ff5b5b";
        return;
    }

    if (password === ADMIN_PASSWORD) {
        error.style.color = "#4ade80";
        error.textContent = "Access Granted!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);

    } else {
        error.style.color = "#ff5b5b";
        error.textContent = "Incorrect password!";
        passwordInput.value = "";
        passwordInput.focus();
    }
});

