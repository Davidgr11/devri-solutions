// VARIABLES
const burgerBtn = document.querySelector('.bar__burgerMenu');
const closeMenuBtn = document.querySelector('.mobile__close');
const mobileNav = document.querySelector('.mobile');
const barMenu = document.querySelector('.bar');
const links = document.querySelectorAll('a.mobile__link');
const linksDropdown = document.querySelectorAll('.mobile__option a');

const servicesDropdown = document.querySelector('.mobile__dropdown--btn');
const softwareDropdown = document.querySelector('.mobile__dropdown2--btn2');
const marketingDropdown = document.querySelector('.mobile__dropdown3--btn3');

const servicesDropdownDesktop = document.querySelector('.desktop__dropdown--btn');
const softwareDropdownDesktop = document.querySelector('.desktop__dropdown2--btn2');
const marketingDropdownDesktop = document.querySelector('.desktop__dropdown3--btn3');

const toggleMobile = document.getElementById("theme-toggle");
const toggleDesktop = document.getElementById("desktop-theme-toggle");
const themeIcons = document.querySelectorAll(".theme-icon"); // Ambos iconos (deben tener esta clase)
const logo = document.querySelector(".bar__logo--img");
const logo2 = document.querySelector(".footer__logo--img");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = saved || (prefersDark ? "dark" : "light");
    applyTheme(currentTheme);
    updateToggles(currentTheme);
});

burgerBtn?.addEventListener('click', openMobileMenu);
closeMenuBtn?.addEventListener('click', closeMobileMenu);

links.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

linksDropdown.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

servicesDropdown?.addEventListener('click', openDropdown);
softwareDropdown?.addEventListener('click', openDropdown2);
marketingDropdown?.addEventListener('click', openDropdown3);

servicesDropdownDesktop?.addEventListener('click', openDropdownDesktop);
softwareDropdownDesktop?.addEventListener('click', openDropdown2Desktop);
marketingDropdownDesktop?.addEventListener('click', openDropdown3Desktop);

// THEME TOGGLE (mobile)
toggleMobile?.addEventListener("change", () => {
    const theme = toggleMobile.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    updateToggles(theme);
});

// THEME TOGGLE (desktop)
toggleDesktop?.addEventListener("change", () => {
    const theme = toggleDesktop.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    updateToggles(theme);
});

// FUNCTIONS
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (logo) {
        logo.src = theme === "dark"
            ? "../../build/assets/icons/devri-logo-dark.svg"
            : "../../build/assets/icons/devri-logo-light.svg";
    }
    if (logo2) {
        logo2.src = theme === "dark"
            ? "../../build/assets/icons/devri-logo-dark.svg"
            : "../../build/assets/icons/devri-logo-light.svg";
    }

    themeIcons.forEach(icon => {
        icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
    });
}

function updateToggles(theme) {
    const isDark = theme === "dark";
    if (toggleMobile) toggleMobile.checked = isDark;
    if (toggleDesktop) toggleDesktop.checked = isDark;
}

function openMobileMenu() {
    mobileNav.classList.add('openMenu');
    barMenu.style.display = 'none';
    mobileNav.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = storedTheme || (prefersDark ? "dark" : "light");

    updateToggles(currentTheme);
    applyTheme(currentTheme);
}

function closeMobileMenu() {
    mobileNav.classList.remove('openMenu');
    barMenu.style.display = 'flex';
    mobileNav.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
}

function openDropdown() {
    document.querySelector('.mobile__dropdown--btn span')?.classList.toggle('rotateDrop');
    document.querySelector('.mobile__submenu')?.classList.toggle('openSubmenu');
}

function openDropdown2() {
    document.querySelector('.mobile__dropdown2--btn2 span')?.classList.toggle('rotateDrop');
    document.querySelector('.mobile__submenu2')?.classList.toggle('openSubmenu');
}

function openDropdown3() {
    document.querySelector('.mobile__dropdown3--btn3 span')?.classList.toggle('rotateDrop');
    document.querySelector('.mobile__submenu3')?.classList.toggle('openSubmenu');
}

function openDropdownDesktop() {
    document.querySelector('.desktop__dropdown--btn span')?.classList.toggle('rotateDrop');
    document.querySelector('.desktop__submenu')?.classList.toggle('openSubmenu');
}

function openDropdown2Desktop() {
    document.querySelector('.desktop__dropdown2--btn2 span')?.classList.toggle('rotateDrop');
    document.querySelector('.desktop__submenu2')?.classList.toggle('openSubmenu');
}

function openDropdown3Desktop() {
    document.querySelector('.desktop__dropdown3--btn3 span')?.classList.toggle('rotateDrop');
    document.querySelector('.desktop__submenu3')?.classList.toggle('openSubmenu');
}
