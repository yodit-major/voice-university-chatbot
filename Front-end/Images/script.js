const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const navItems = document.querySelectorAll(".nav-item");
const searchInput = document.querySelector(".sidebar-search input");
const themeToggle = document.getElementById("theme");

menuToggle.addEventListener("change", function () {
    sidebar.classList.toggle("collapsed", this.checked);
});

navItems.forEach(item => {
    item.addEventListener("click", function () {
        navItems.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();
    navItems.forEach(item => {
        const text = item.querySelector("span");
        if (!text) return;
        const itemName = text.textContent.toLowerCase();
        item.style.display = itemName.includes(searchValue) ? "flex" : "none";
    });
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
    localStorage.setItem("theme", this.checked ? "dark" : "light");
});

lucide.createIcons();