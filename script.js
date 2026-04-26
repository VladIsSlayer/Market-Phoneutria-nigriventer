// Данные для слайдов (концепция стилей магазина)
const slides = [
    {
        style: "y2k",
        title: "Y2K — эстетика 2000-х",
        description: "Низкая посадка, стразы, металлик, топы-сетки и массивные ремни.",
        vibe: "блеск + ностальгия"
    },
    {
        style: "готика",
        title: "Готика / Dark romantic",
        description: "Корсеты, длинные юбки, кружево, серебро и грубые ботинки.",
        vibe: "мистика & элегантность"
    },
    {
        style: "рок / хард",
        title: "Рок / металл / хард",
        description: "Косухи, футболки с бэндами, потертый деним, браслеты-шипы.",
        vibe: "мощь и драйв"
    },
    {
        style: "панк",
        title: "Панк / анархия",
        description: "Клетка, нашивки, рванина, чокеры, тяжелые берцы.",
        vibe: "протест & DIY"
    },
    {
        style: "гранж",
        title: "Гранж / 90-е",
        description: "Многослойность, кардиганы, фланель, драные джинсы, конверсы.",
        vibe: "меланхолия и свобода"
    }
];

let currentIndex = 0;
const frame = document.getElementById("sliderFrame");
const navPanel = document.getElementById("navPanel");
const counterSpan = document.getElementById("slideCounter");

// Функция отрисовки слайда по индексу
function renderSlide(index) {
    const data = slides[index];
    if (!data) return;

    frame.innerHTML = `
        <div class="slide-content">
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <div class="style-badge">${data.style.toUpperCase()} · ${data.vibe}</div>
        </div>
    `;

    counterSpan.innerText = `слайд ${index + 1} / ${slides.length}`;

    // Подсветка активной кнопки
    const allBtns = document.querySelectorAll(".nav-btn");
    allBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Построение панели кнопок
function buildNavPanel() {
    navPanel.innerHTML = "";
    slides.forEach((slide, idx) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.textContent = slide.style.toUpperCase();
        btn.setAttribute("data-index", idx);
        btn.addEventListener("click", () => {
            currentIndex = idx;
            renderSlide(currentIndex);
        });
        navPanel.appendChild(btn);
    });
}

// Инициализация
function init() {
    buildNavPanel();
    renderSlide(currentIndex);
}

init();