const styles = [
    {
        id: "y2k",
        title: "Y2K — эстетика 2000-х",
        description: "Глянец, металлик и контрастные детали с ярким акцентом.",
        vibe: "блеск + ностальгия"
    },
    {
        id: "gothic",
        title: "Готика / Dark romantic",
        description: "Темные силуэты, романтичные формы и акцент на фактуре.",
        vibe: "мистика и элегантность"
    },
    {
        id: "rock",
        title: "Рок / металл",
        description: "Плотные материалы, кожаные акценты и мощная обувь.",
        vibe: "мощь и драйв"
    },
    {
        id: "punk",
        title: "Панк / анархия",
        description: "Контраст, дерзкий микс и заметные аксессуары.",
        vibe: "протест и DIY"
    },
    {
        id: "grunge",
        title: "Гранж / 90-е",
        description: "Расслабленные слои, потертая фактура и непринужденность.",
        vibe: "меланхолия и свобода"
    }
];

const products = [
    { id: "tshirt-1", name: "Футболка #1", category: "top", image: "images/t-shirt1.png", styles: ["y2k", "punk", "grunge"] },
    { id: "tshirt-2", name: "Футболка #2", category: "top", image: "images/t-shirt2.png", styles: ["rock", "grunge", "punk"] },
    { id: "tshirt-3", name: "Футболка #3", category: "top", image: "images/t-shirt3.png", styles: ["gothic", "rock"] },
    { id: "tshirt-4", name: "Футболка #4", category: "top", image: "images/t-shirt4.png", styles: ["y2k", "rock"] },
    { id: "tshirt-5", name: "Футболка #5", category: "top", image: "images/t-shirt5.png", styles: ["gothic", "grunge"] },

    { id: "pants-1", name: "Брюки #1", category: "bottom", image: "images/pants1.png", styles: ["y2k", "punk"] },
    { id: "pants-2", name: "Брюки #2", category: "bottom", image: "images/pants2.png", styles: ["rock", "grunge", "gothic"] },
    { id: "pants-3", name: "Брюки #3", category: "bottom", image: "images/pants3.png", styles: ["y2k", "gothic", "punk"] },

    { id: "shoes-1", name: "Обувь #1", category: "shoes", image: "images/shoes1.png", styles: ["y2k", "punk"] },
    { id: "shoes-2", name: "Обувь #2", category: "shoes", image: "images/shoes2.png", styles: ["rock", "gothic"] },
    { id: "shoes-3", name: "Обувь #3", category: "shoes", image: "images/shoes3.png", styles: ["grunge", "punk"] },
    { id: "shoes-4", name: "Обувь #4", category: "shoes", image: "images/shoes4.png", styles: ["rock", "grunge"] },
    { id: "shoes-5", name: "Обувь #5", category: "shoes", image: "images/shoes5.png", styles: ["y2k", "gothic"] },

    { id: "jacket-1", name: "Куртка #1", category: "outerwear", image: "images/jacket1.png", styles: ["rock", "gothic", "grunge"] },
    { id: "jacket-2", name: "Куртка #2", category: "outerwear", image: "images/jacket2.png", styles: ["y2k", "punk"] },

    { id: "cap-1", name: "Кепка #1", category: "accessory", image: "images/cap1.png", styles: ["y2k", "grunge"] },
    { id: "cap-2", name: "Кепка #2", category: "accessory", image: "images/cap2.png", styles: ["punk", "rock"] },
    { id: "cap-3", name: "Кепка #3", category: "accessory", image: "images/cap3.png", styles: ["y2k", "punk"] },
    { id: "hat-1", name: "Шляпа #1", category: "accessory", image: "images/hat1.png", styles: ["gothic", "rock"] },
    { id: "hat-2", name: "Шляпа #2", category: "accessory", image: "images/hat2.png", styles: ["gothic", "grunge"] }
];

const frame = document.getElementById("sliderFrame");
const navPanel = document.getElementById("navPanel");
const counter = document.getElementById("slideCounter");
const mixBtn = document.getElementById("mixBtn");

let currentIndex = 0;
let buildVersion = 0;

const CATEGORY_LABELS = {
    top: "Верх",
    bottom: "Низ",
    shoes: "Обувь",
    outerwear: "Верхняя одежда",
    accessory: "Аксессуар"
};

function randomItem(list) {
    if (!list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
}

function itemsByStyleAndCategory(styleId, category) {
    return products.filter((item) => item.category === category && item.styles.includes(styleId));
}

function getOptionalItem(styleId) {
    const category = Math.random() > 0.5 ? "outerwear" : "accessory";
    let pool = itemsByStyleAndCategory(styleId, category);
    if (!pool.length) {
        const fallbackCategory = category === "outerwear" ? "accessory" : "outerwear";
        pool = itemsByStyleAndCategory(styleId, fallbackCategory);
    }
    return randomItem(pool);
}

function generateOutfit(styleId) {
    const top = randomItem(itemsByStyleAndCategory(styleId, "top"));
    const bottom = randomItem(itemsByStyleAndCategory(styleId, "bottom"));
    const shoes = randomItem(itemsByStyleAndCategory(styleId, "shoes"));
    const optional = getOptionalItem(styleId);

    const result = [top, bottom, shoes, optional].filter(Boolean);

    // Если для стиля мало вещей, добираем рандомно из каталога.
    if (result.length < 4) {
        const usedIds = new Set(result.map((item) => item.id));
        const fillers = products.filter((item) => !usedIds.has(item.id));
        while (result.length < 4 && fillers.length) {
            const candidate = fillers.splice(Math.floor(Math.random() * fillers.length), 1)[0];
            result.push(candidate);
        }
    }

    return result;
}

function renderCards(items) {
    return items
        .map(
            (item) => `
                <article class="product-card">
                    <div class="product-image-wrap">
                        <img src="${item.image}" alt="${item.name}" class="product-image">
                    </div>
                    <div class="product-meta">
                        <p class="product-category">${CATEGORY_LABELS[item.category] || "Товар"}</p>
                        <h3>${item.name}</h3>
                    </div>
                </article>
            `
        )
        .join("");
}

function renderCurrentStyle() {
    const style = styles[currentIndex];
    if (!style) return;

    const outfit = generateOutfit(style.id);
    buildVersion += 1;

    frame.classList.remove("is-visible");
    frame.innerHTML = `
        <div class="slide-content">
            <div class="style-head">
                <h2>${style.title}</h2>
                <p>${style.description}</p>
                <div class="style-badge">${style.id.toUpperCase()} · ${style.vibe}</div>
                <p class="build-id">Сборка #${buildVersion}</p>
            </div>
            <div class="products-grid">
                ${renderCards(outfit)}
            </div>
        </div>
    `;

    requestAnimationFrame(() => frame.classList.add("is-visible"));
    counter.innerText = `стиль ${currentIndex + 1} / ${styles.length} · товаров: ${outfit.length}`;

    const allBtns = document.querySelectorAll(".nav-btn");
    allBtns.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === currentIndex);
    });
}

function buildNavPanel() {
    navPanel.innerHTML = "";
    styles.forEach((style, idx) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.textContent = style.id.toUpperCase();
        btn.addEventListener("click", () => {
            currentIndex = idx;
            renderCurrentStyle();
        });
        navPanel.appendChild(btn);
    });
}

function bindEvents() {
    mixBtn.addEventListener("click", () => {
        renderCurrentStyle();
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % styles.length;
            renderCurrentStyle();
        }
        if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + styles.length) % styles.length;
            renderCurrentStyle();
        }
        if (event.key.toLowerCase() === "r") {
            renderCurrentStyle();
        }
    });
}

function init() {
    buildNavPanel();
    bindEvents();
    renderCurrentStyle();
}

init();