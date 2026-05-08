// Справочник стилей для фильтров, чипов и алгоритма рекомендаций.
const styles = [
    { id: "y2k", label: "Y2K" },
    { id: "gothic", label: "Готика" },
    { id: "rock", label: "Рок" },
    { id: "punk", label: "Панк" },
    { id: "grunge", label: "Гранж" }
];

// Справочник категорий товаров.
const categories = [
    { id: "top", label: "Верх" },
    { id: "bottom", label: "Низ" },
    { id: "shoes", label: "Обувь" },
    { id: "outerwear", label: "Верхняя одежда" },
    { id: "accessory", label: "Аксессуары" }
];

// Каталог товаров (локальные данные без backend).
const products = [
    { id: "tshirt-1", name: "Футболка Паучье логово", category: "top", image: "images/t-shirt1.png", price: 1499, styles: ["punk", "grunge"], rating: 4.6, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-2", name: "Футболка Белая клетка чувств", category: "top", image: "images/t-shirt2.png", price: 1499, styles: ["rock", "grunge", "punk"], rating: 4.8, imageScale: 0.87, imageOffsetY: "0%" },
    { id: "tshirt-3", name: "Футболка Морской подарок", category: "top", image: "images/t-shirt3.png", price: 1290, styles: ["y2k", "rock"], rating: 4.7, imageScale: 0.86, imageOffsetY: "0%" },
    { id: "tshirt-4", name: "Футболка Морской пустяк", category: "top", image: "images/t-shirt4.png", price: 1290, styles: ["y2k", "punk"], rating: 4.5, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-5", name: "Футболка Бездомный поэт", category: "top", image: "images/t-shirt5.png", price: 990, styles: ["y2k", "punk"], rating: 4.6, imageScale: 0.85, imageOffsetY: "0%" },
    { id: "pants-1", name: "Джинсы Облоко", category: "bottom", image: "images/pants1.png", price: 3890, styles: ["grunge", "punk"], rating: 4.7, imageScale: 0.83, imageOffsetY: "1%" },
    { id: "pants-2", name: "Джинсы Офисный стиляга", category: "bottom", image: "images/pants2.png", price: 3590, styles: ["y2k", "grunge", "gothic"], rating: 4.9, imageScale: 0.84, imageOffsetY: "1%" },
    { id: "pants-3", name: "Джинсы Классика 80-х", category: "bottom", image: "images/pants3.png", price: 3290, styles: ["y2k", "punk"], rating: 4.5, imageScale: 0.84, imageOffsetY: "1%" },
    { id: "shoes-1", name: "Берцы Переговорщика", category: "shoes", image: "images/shoes1.png", price: 3790, styles: ["rock", "grunge", "punk"], rating: 4.4, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-2", name: "Берцы Повседневный путь", category: "shoes", image: "images/shoes2.png", price: 2990, styles: ["rock", "y2k"], rating: 4.8, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-3", name: "Берцы Классика двора", category: "shoes", image: "images/shoes3.png", price: 3190, styles: ["rock", "grunge", "punk"], rating: 4.6, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-4", name: "Кеды Свободный дух", category: "shoes", image: "images/shoes4.png", price: 2490, styles: ["y2k", "rock", "grunge"], rating: 4.7, imageScale: 0.91, imageOffsetY: "4%" },
    { id: "shoes-5", name: "Кеды Такой, какой есть", category: "shoes", image: "images/shoes5.png", price: 2490, styles: ["y2k", "gothic", "punk"], rating: 4.5, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "jacket-1", name: "Ветровка Гонщик", category: "outerwear", image: "images/jacket1.png", price: 3990, styles: ["rock", "y2k", "grunge"], rating: 4.9, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "jacket-2", name: "Косуха Наследство пятиэтажек", category: "outerwear", image: "images/jacket2.png", price: 3990, styles: ["rock", "punk", "grunge"], rating: 4.7, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "cap-1", name: "Кепка Зомби майор", category: "accessory", image: "images/cap1.png", price: 990, styles: ["y2k", "grunge"], rating: 4.3, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-2", name: "Берет Карьеристки", category: "accessory", image: "images/cap2.png", price: 990, styles: ["punk", "rock", "grunge"], rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-3", name: "Кепка Душа компании", category: "accessory", image: "images/cap3.png", price: 990, styles: ["y2k", "punk"], rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "hat-1", name: "Шапка Забота мамы", category: "accessory", image: "images/hat1.png", price: 2590, styles: ["y2k", "gothic", "rock"], rating: 4.6, imageScale: 0.9, imageOffsetY: "0%" },
    { id: "hat-2", name: "Шапка Ушанка Сибирь", category: "accessory", image: "images/hat2.png", price: 2490, styles: ["gothic", "grunge", "punk"], rating: 4.5, imageScale: 0.9, imageOffsetY: "0%" }
];

// Кэшируем ссылки на элементы интерфейса один раз при старте.
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const styleSelect = document.getElementById("styleSelect");
const sortSelect = document.getElementById("sortSelect");
const productsGrid = document.getElementById("productsGrid");
const catalogInfo = document.getElementById("catalogInfo");
const styleNav = document.getElementById("styleNav");
const recommendPanel = document.getElementById("recommendPanel");
const recommendOverlay = document.getElementById("recommendOverlay");
const cartItemsElement = document.getElementById("cartItems");
const cartCountElement = document.getElementById("cartCount");
const cartCountBadge = document.getElementById("cartCountBadge");
const cartSubtotalElement = document.getElementById("cartSubtotal");
const cartDeliveryElement = document.getElementById("cartDelivery");
const cartDiscountElement = document.getElementById("cartDiscount");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartFab = document.getElementById("cartFab");
const cartPanel = document.getElementById("cartPanel");
const closeCartBtn = document.getElementById("closeCartBtn");
const deliveryHint = document.getElementById("deliveryHint");
const deliveryBarFill = document.getElementById("deliveryBarFill");
const promoInput = document.getElementById("promoInput");
const applyPromoBtn = document.getElementById("applyPromoBtn");
const promoNote = document.getElementById("promoNote");
const categoryChartCanvas = document.getElementById("categoryChart");
const stylesChartCanvas = document.getElementById("stylesChart");
const cityChartCanvas = document.getElementById("cityChart");
const statProducts = document.getElementById("statProducts");
const statStyles = document.getElementById("statStyles");
const statDelivery = document.getElementById("statDelivery");
const paginationControls = document.getElementById("paginationControls");

// Runtime-состояние страницы.
const cart = [];
const FREE_DELIVERY_FROM = 7000;
const BASE_DELIVERY_COST = 490;
const PROMO_CODES = {
    NOIR10: 0.1,
    STUDENT15: 0.15
};
let activePromo = null;
let recommendationAnchor = null;
let isRecommendationDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let categoryChart = null;
let stylesChart = null;
let cityChart = null;
let currentPage = 1;
let lastCatalogColumns = getCatalogColumns();

// Форматирует число как цену в рублях.
function formatPrice(value) {
    return `${value.toLocaleString("ru-RU")} ₽`;
}

// Сохраняет корзину и примененный промокод в localStorage.
function saveCartState() {
    const payload = {
        items: cart.map((row) => ({ productId: row.product.id, qty: row.qty })),
        activePromo
    };
    localStorage.setItem("noir-cart", JSON.stringify(payload));
}

// Восстанавливает корзину после перезагрузки страницы.
function restoreCartState() {
    const raw = localStorage.getItem("noir-cart");
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) {
            parsed.items.forEach((row) => {
                const product = findById(row.productId);
                if (!product || !Number.isFinite(row.qty) || row.qty <= 0) return;
                cart.push({ product, qty: Math.floor(row.qty) });
            });
        }
        if (parsed.activePromo && PROMO_CODES[parsed.activePromo]) {
            activePromo = parsed.activePromo;
        }
    } catch (error) {
        localStorage.removeItem("noir-cart");
    }
}

// Возвращает человекочитаемое имя категории по id.
function getCategoryLabel(categoryId) {
    return categories.find((cat) => cat.id === categoryId)?.label || "Товар";
}

// Заполняет выпадающие фильтры категориями и стилями.
function fillSelects() {
    categorySelect.innerHTML = `<option value="all">Все категории</option>${categories
        .map((cat) => `<option value="${cat.id}">${cat.label}</option>`)
        .join("")}`;

    styleSelect.innerHTML = `<option value="all">Все стили</option>${styles
        .map((style) => `<option value="${style.id}">${style.label}</option>`)
        .join("")}`;
}

// Перерисовывает быстрые чипы стилей под текущее значение фильтра.
function renderStyleNav() {
    styleNav.innerHTML = [
        `<button class="style-chip ${styleSelect.value === "all" ? "active" : ""}" type="button" data-style="all">Все</button>`,
        ...styles.map(
            (style) =>
                `<button class="style-chip ${styleSelect.value === style.id ? "active" : ""}" type="button" data-style="${style.id}">${style.label}</button>`
        )
    ].join("");
}

// Возвращает список товаров с учетом поиска/фильтров/сортировки.
function getFilteredProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const style = styleSelect.value;
    const sort = sortSelect.value;

    // Сначала фильтрация.
    let result = products.filter((item) => {
        const bySearch = !search || item.name.toLowerCase().includes(search);
        const byCategory = category === "all" || item.category === category;
        const byStyle = style === "all" || item.styles.includes(style);
        return bySearch && byCategory && byStyle;
    });

    // Затем сортировка.
    if (sort === "cheap") result.sort((a, b) => a.price - b.price);
    if (sort === "expensive") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    if (sort === "popular") result.sort((a, b) => b.rating - a.rating);

    return result;
}

// Основной рендер каталога + заполнение пустых ячеек до ровной сетки.
function renderCatalog() {
    if (!productsGrid || !catalogInfo || !styleNav) return;

    const filtered = getFilteredProducts();
    catalogInfo.textContent = `Найдено: ${filtered.length}`;
    renderStyleNav();

    if (!filtered.length) {
        productsGrid.innerHTML = `<p class="empty-state">По этим фильтрам ничего не найдено.</p>`;
        renderPagination(0);
        return;
    }

    // Количество карточек на страницу всегда кратно количеству колонок.
    const columns = getCatalogColumns();
    const itemsPerPage = Math.max(columns * 3, 3);
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    const startIdx = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIdx, startIdx + itemsPerPage);

    productsGrid.innerHTML = pageItems
        .map(
            (item) => `
                <article class="product-card">
                    <div class="product-image-wrap">
                        <img src="${item.image}" alt="${item.name}" class="product-image" style="--img-scale:${item.imageScale ?? 0.88}; --img-offset-y:${item.imageOffsetY ?? "0%"};">
                    </div>
                    <div class="product-meta">
                        <p class="product-category">${getCategoryLabel(item.category)}</p>
                        <h3>${item.name}</h3>
                        <p class="product-sub">Рейтинг: ${item.rating.toFixed(1)} / 5</p>
                        <div class="product-footer">
                            <p class="product-price">${formatPrice(item.price)}</p>
                            <button class="card-btn" type="button" data-role="add" data-id="${item.id}">В корзину</button>
                        </div>
                        <button class="link-btn" type="button" data-role="match" data-id="${item.id}">Сочетается с</button>
                    </div>
                </article>
            `
        )
        .join("");

    const remainder = pageItems.length % columns;
    const placeholders = remainder === 0 ? 0 : columns - remainder;
    for (let i = 0; i < placeholders; i += 1) {
        productsGrid.insertAdjacentHTML(
            "beforeend",
            `<article class="product-card placeholder-card"><div class="product-image-wrap"></div><div class="product-meta"></div></article>`
        );
    }

    renderPagination(totalPages);
}

// Возвращает фактическое число колонок по текущему размеру экрана.
function getCatalogColumns() {
    if (window.matchMedia("(max-width: 480px)").matches) return 1;
    if (window.matchMedia("(max-width: 760px)").matches) return 2;
    return 3;
}

// Рисует контролы пагинации для каталога.
function renderPagination(totalPages) {
    if (!paginationControls) return;
    if (totalPages <= 1) {
        paginationControls.innerHTML = "";
        return;
    }

    const buttons = [];
    buttons.push(`<button class="page-btn" data-page="${Math.max(1, currentPage - 1)}">Назад</button>`);
    for (let page = 1; page <= totalPages; page++) {
        buttons.push(`<button class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">${page}</button>`);
    }
    buttons.push(`<button class="page-btn" data-page="${Math.min(totalPages, currentPage + 1)}">Вперед</button>`);
    paginationControls.innerHTML = buttons.join("");
}

// Поиск товара по id.
function findById(productId) {
    return products.find((item) => item.id === productId);
}

// Матрица совместимости категорий для рекомендаций "с чем носить".
const CATEGORY_COMPATIBILITY = {
    top: ["bottom", "shoes", "outerwear", "accessory"],
    bottom: ["top", "shoes", "outerwear", "accessory"],
    shoes: ["top", "bottom", "outerwear", "accessory"],
    outerwear: ["top", "bottom", "shoes", "accessory"],
    accessory: ["top", "bottom", "shoes", "outerwear"]
};

/*
  ВАЖНО: этот блок (styles, categories, products) можно безопасно редактировать вручную.
  Что можно менять:
  - name: название товара;
  - price: цена;
  - styles: массив стилей товара;
  - imageScale / imageOffsetY: визуальная подгонка иконки товара в карточке.
*/

// Оценивает, насколько цены двух вещей близки между собой.
function getPriceDistanceScore(basePrice, candidatePrice) {
    const ratio = Math.abs(candidatePrice - basePrice) / Math.max(basePrice, 1);
    if (ratio <= 0.25) return 2;
    if (ratio <= 0.45) return 1;
    return 0;
}

// Подбирает сочетаемые товары с учетом стиля, категории, цены и рейтинга.
function getMatchesForProduct(product, limit = 4) {
    const preferredCategories = CATEGORY_COMPATIBILITY[product.category] || [];

    // Формируем и ранжируем кандидатов.
    const prioritized = products
        .filter((candidate) => candidate.id !== product.id)
        .map((candidate) => {
            const commonStyles = candidate.styles.filter((styleId) => product.styles.includes(styleId));
            const styleScore = commonStyles.length * 4;
            const categoryScore = preferredCategories.includes(candidate.category) ? 3 : 0;
            const sameCategoryPenalty = candidate.category === product.category ? -5 : 0;
            const priceScore = getPriceDistanceScore(product.price, candidate.price);
            const ratingScore = candidate.rating >= 4.7 ? 1 : 0;
            const totalScore = styleScore + categoryScore + priceScore + ratingScore + sameCategoryPenalty;

            return { candidate, totalScore, commonStyles };
        })
        .filter((entry) => entry.totalScore >= 5)
        .sort((a, b) => b.totalScore - a.totalScore || b.commonStyles.length - a.commonStyles.length || a.candidate.price - b.candidate.price);

    const usedCategories = new Set();
    const result = [];

    // Сначала собираем разнообразный лук из разных категорий.
    for (const entry of prioritized) {
        if (result.length >= limit) break;
        if (usedCategories.has(entry.candidate.category)) continue;
        usedCategories.add(entry.candidate.category);
        result.push(entry.candidate);
    }

    // Потом добираем лучшие оставшиеся варианты, если слотов не хватило.
    if (result.length < limit) {
        for (const entry of prioritized) {
            if (result.length >= limit) break;
            if (result.some((item) => item.id === entry.candidate.id)) continue;
            result.push(entry.candidate);
        }
    }

    return result;
}

// Позиционирует окно рекомендаций рядом с кнопкой "Сочетается с".
function positionRecommendPanel(anchorElement) {
    const panel = recommendPanel;
    if (!anchorElement) return;

    const anchorRect = anchorElement.getBoundingClientRect();
    const panelWidth = Math.min(460, window.innerWidth - 24);
    const panelHeight = Math.min(420, window.innerHeight - 24);
    const horizontalOffset = 14;

    let left = anchorRect.right + horizontalOffset;
    let top = anchorRect.top;

    if (left + panelWidth > window.innerWidth - 12) {
        left = anchorRect.left - panelWidth - horizontalOffset;
    }
    if (left < 12) {
        left = Math.max(12, window.innerWidth - panelWidth - 12);
    }

    if (top + panelHeight > window.innerHeight - 12) {
        top = Math.max(12, window.innerHeight - panelHeight - 12);
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
}

// Закрывает панель рекомендаций и оверлей.
function hideRecommendations() {
    if (window.jQuery) {
        $(recommendPanel).removeClass("open");
        $(recommendOverlay).removeClass("open");
    } else {
        recommendPanel.classList.remove("open");
        recommendOverlay.classList.remove("open");
    }
    isRecommendationDragging = false;
}

// Рендерит рекомендации для выбранного товара.
function renderRecommendations(productId, anchorElement = null) {
    const product = findById(productId);
    if (!product) return;
    const matches = getMatchesForProduct(product);
    recommendationAnchor = anchorElement || recommendationAnchor;

    // Отдельный сценарий, когда подходящие варианты не найдены.
    if (!matches.length) {
        recommendPanel.innerHTML = `
            <div class="recommend-head">
                <h3>С чем носить: ${product.name}</h3>
                <button class="recommend-close" type="button" data-role="close-recommend">Закрыть</button>
            </div>
            <p class="recommend-empty">Для товара "${product.name}" пока нет подборки.</p>
        `;
        recommendPanel.classList.add("open");
        if (window.jQuery) {
            $(recommendOverlay).addClass("open");
        } else {
            recommendOverlay.classList.add("open");
        }
        if (window.innerWidth > 860 && recommendationAnchor) {
            positionRecommendPanel(recommendationAnchor);
        }
        return;
    }

    recommendPanel.innerHTML = `
        <div class="recommend-head">
            <div>
                <h3>С чем носить: ${product.name}</h3>
                <p>Подобрали сочетаемые вещи по стилю, категории и близкому ценовому уровню</p>
            </div>
            <button class="recommend-close" type="button" data-role="close-recommend">Закрыть</button>
        </div>
        <div class="recommend-grid">
            ${matches
                .map(
                    (item) => `
                        <article class="recommend-card">
                            <img src="${item.image}" alt="${item.name}" class="recommend-image" style="--img-scale:${item.imageScale ?? 0.88}; --img-offset-y:${item.imageOffsetY ?? "0%"};">
                            <p class="recommend-name">${item.name}</p>
                            <p class="product-category">${getCategoryLabel(item.category)}</p>
                            <p class="recommend-price">${formatPrice(item.price)}</p>
                            <button class="card-btn" type="button" data-role="add" data-id="${item.id}">В корзину</button>
                        </article>
                    `
                )
                .join("")}
        </div>
    `;
    recommendPanel.classList.add("open");
    if (window.jQuery) {
        $(recommendOverlay).addClass("open");
    } else {
        recommendOverlay.classList.add("open");
    }
    if (window.innerWidth > 860 && recommendationAnchor) {
        positionRecommendPanel(recommendationAnchor);
    }
}

// График 1: количество товаров по категориям.
function renderCategoryChart() {
    if (!categoryChartCanvas || !window.Chart) return;
    const labels = categories.map((item) => item.label);
    const values = categories.map((item) => products.filter((product) => product.category === item.id).length);

    // Перед перерисовкой всегда удаляем предыдущий инстанс.
    if (categoryChart) {
        categoryChart.destroy();
    }

    categoryChart = new Chart(categoryChartCanvas, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Количество товаров",
                    data: values,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: ["#6f5bff", "#4d7bff", "#55c9ff", "#8c6bff", "#6ec2a3"]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: "#d8e0ff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: "#d8e0ff", precision: 0 },
                    grid: { color: "rgba(255,255,255,0.08)" }
                }
            }
        }
    });
}

// График 2: распределение товаров по стилям.
function renderStylesChart() {
    if (!stylesChartCanvas || !window.Chart) return;
    const labels = styles.map((item) => item.label);
    const values = styles.map((item) => products.filter((product) => product.styles.includes(item.id)).length);

    if (stylesChart) {
        stylesChart.destroy();
    }

    stylesChart = new Chart(stylesChartCanvas, {
        type: "doughnut",
        data: {
            labels,
            datasets: [
                {
                    data: values,
                    borderWidth: 0,
                    backgroundColor: ["#6f5bff", "#4d7bff", "#55c9ff", "#8c6bff", "#6ec2a3"]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: "#d8e0ff" }
                }
            }
        }
    });
}

// График 3: спрос по городам (заказы + сумма).
function renderCityDemandChart() {
    if (!cityChartCanvas || !window.Chart) return;
    const labels = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Другие"];
    const orders = [1260, 980, 520, 470, 430, 610];
    const sumMln = [8.9, 6.8, 3.4, 3.1, 2.8, 4.2];

    if (cityChart) {
        cityChart.destroy();
    }

    cityChart = new Chart(cityChartCanvas, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Количество заказов",
                    data: orders,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: ["#6f5bff", "#4d7bff", "#55c9ff", "#8c6bff", "#6ec2a3", "#5d789f"],
                    yAxisID: "y"
                },
                {
                    type: "line",
                    label: "Сумма заказов, млн ₽",
                    data: sumMln,
                    yAxisID: "y1",
                    borderColor: "#ffb76b",
                    backgroundColor: "rgba(255, 183, 107, 0.2)",
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: "#d8e0ff" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#d8e0ff" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: "#d8e0ff", precision: 0 },
                    grid: { color: "rgba(255,255,255,0.08)" }
                },
                y1: {
                    beginAtZero: true,
                    position: "right",
                    ticks: { color: "#ffcf9a" },
                    grid: { color: "rgba(255,255,255,0.08)" }
                }
            }
        }
    });
}

// Анимирует KPI-счетчики на странице "О проекте".
function initMetrics() {
    if (!window.countUp || !statProducts || !statStyles || !statDelivery) return;
    const countProducts = new window.countUp.CountUp(statProducts, products.length);
    const countStyles = new window.countUp.CountUp(statStyles, styles.length);
    const countDelivery = new window.countUp.CountUp(statDelivery, FREE_DELIVERY_FROM);
    if (!countProducts.error) countProducts.start();
    if (!countStyles.error) countStyles.start();
    if (!countDelivery.error) countDelivery.start();
}

// Включает jQuery UI Autocomplete для поля поиска.
function initAutocomplete() {
    if (!window.jQuery || !window.jQuery.ui || !searchInput) return;
    const source = products.map((item) => item.name);
    $(searchInput).autocomplete({
        source,
        minLength: 1,
        select: function (_, ui) {
            searchInput.value = ui.item.value;
            renderCatalog();
        }
    });
}

// Начинает перетаскивание панели рекомендаций.
function startRecommendationDrag(event) {
    if (window.innerWidth <= 860) return;
    const head = event.target instanceof HTMLElement ? event.target.closest(".recommend-head") : null;
    if (!head) return;
    if (event.target instanceof HTMLElement && event.target.closest(".recommend-close")) return;

    const panelRect = recommendPanel.getBoundingClientRect();
    isRecommendationDragging = true;
    dragOffsetX = event.clientX - panelRect.left;
    dragOffsetY = event.clientY - panelRect.top;
    recommendPanel.style.left = `${panelRect.left}px`;
    recommendPanel.style.top = `${panelRect.top}px`;
    event.preventDefault();
}

// Двигает панель рекомендаций вместе с курсором.
function onRecommendationDrag(event) {
    if (!isRecommendationDragging) return;
    const panelWidth = recommendPanel.offsetWidth;
    const panelHeight = recommendPanel.offsetHeight;
    let nextLeft = event.clientX - dragOffsetX;
    let nextTop = event.clientY - dragOffsetY;
    nextLeft = Math.max(8, Math.min(window.innerWidth - panelWidth - 8, nextLeft));
    nextTop = Math.max(8, Math.min(window.innerHeight - panelHeight - 8, nextTop));
    recommendPanel.style.left = `${nextLeft}px`;
    recommendPanel.style.top = `${nextTop}px`;
}

// Завершает перетаскивание панели рекомендаций.
function stopRecommendationDrag() {
    isRecommendationDragging = false;
}

// Пересчитывает и отображает корзину (подытог, доставка, скидка, итог).
function renderCart() {
    // Блок вычислений.
    const totalCount = cart.reduce((sum, row) => sum + row.qty, 0);
    const subtotal = cart.reduce((sum, row) => sum + row.qty * row.product.price, 0);
    const discountRate = activePromo ? PROMO_CODES[activePromo] || 0 : 0;
    const discountAmount = Math.round(subtotal * discountRate);
    const deliveryCost = subtotal === 0 ? 0 : (subtotal >= FREE_DELIVERY_FROM ? 0 : BASE_DELIVERY_COST);
    const totalPrice = Math.max(0, subtotal - discountAmount + deliveryCost);
    const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_FROM) * 100));

    cartCountElement.textContent = String(totalCount);
    cartCountBadge.textContent = String(totalCount);
    cartSubtotalElement.textContent = formatPrice(subtotal);
    cartDeliveryElement.textContent = deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost);
    cartDiscountElement.textContent = discountAmount > 0 ? `- ${formatPrice(discountAmount)}` : "0 ₽";
    cartTotalElement.textContent = formatPrice(totalPrice);
    deliveryBarFill.style.width = `${progress}%`;

    // Подсказка о бесплатной доставке.
    if (subtotal === 0) {
        deliveryHint.textContent = "Добавьте товары в корзину для расчета доставки";
    } else if (subtotal < FREE_DELIVERY_FROM) {
        deliveryHint.textContent = `До бесплатной доставки осталось ${formatPrice(FREE_DELIVERY_FROM - subtotal)}`;
    } else {
        deliveryHint.textContent = "У вас бесплатная доставка";
    }

    promoNote.textContent = activePromo
        ? `Применен промокод ${activePromo}: скидка ${Math.round((PROMO_CODES[activePromo] || 0) * 100)}%`
        : "Промокод не применен.";

    if (!cart.length) {
        cartItemsElement.innerHTML = `<p class="cart-empty">Корзина пуста</p>`;
        saveCartState();
        return;
    }

    cartItemsElement.innerHTML = cart
        .map(
            (row) => `
                <div class="cart-item">
                    <div class="cart-item-meta">
                        <p class="cart-item-name">${row.product.name}</p>
                        <p class="cart-item-price">${formatPrice(row.product.price)}</p>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" type="button" data-role="decrease" data-id="${row.product.id}">-</button>
                        <span>${row.qty}</span>
                        <button class="qty-btn" type="button" data-role="increase" data-id="${row.product.id}">+</button>
                    </div>
                </div>
            `
        )
        .join("");
    saveCartState();
}

// Добавляет товар в корзину или увеличивает его количество.
function addToCart(productId) {
    const product = findById(productId);
    if (!product) return;
    const existing = cart.find((row) => row.product.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ product, qty: 1 });
    }
    renderCart();
}

// Меняет количество товара в корзине (и удаляет, если <= 0).
function updateQty(productId, delta) {
    const row = cart.find((item) => item.product.id === productId);
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) {
        const idx = cart.findIndex((item) => item.product.id === productId);
        cart.splice(idx, 1);
    }
    renderCart();
}

// Подписывает все обработчики событий интерфейса.
function bindEvents() {
    if (searchInput && categorySelect && styleSelect && sortSelect && productsGrid && styleNav) {
        // Если jQuery доступен — используем его API, иначе fallback на native listeners.
        if (window.jQuery) {
            $(searchInput).on("input", () => {
                currentPage = 1;
                renderCatalog();
            });
            $(categorySelect).on("change", () => {
                currentPage = 1;
                renderCatalog();
            });
            $(styleSelect).on("change", () => {
                currentPage = 1;
                renderCatalog();
            });
            $(sortSelect).on("change", () => {
                currentPage = 1;
                renderCatalog();
            });
        } else {
            [searchInput, categorySelect, styleSelect, sortSelect].forEach((input) => {
                input.addEventListener("input", () => {
                    currentPage = 1;
                    renderCatalog();
                });
                input.addEventListener("change", () => {
                    currentPage = 1;
                    renderCatalog();
                });
            });
        }

        // Быстрые чипы стилей.
        styleNav.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const styleId = target.dataset.style;
            if (!styleId) return;
            styleSelect.value = styleId;
            currentPage = 1;
            renderCatalog();
        });

        // Действия в карточках каталога.
        productsGrid.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const role = target.dataset.role;
            const productId = target.dataset.id;
            if (!role || !productId) return;
            if (role === "add") addToCart(productId);
            if (role === "match") renderRecommendations(productId, target);
        });

        // Переключение страниц каталога.
        paginationControls?.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const pageValue = Number(target.dataset.page);
            if (!Number.isFinite(pageValue) || pageValue < 1) return;
            currentPage = pageValue;
            renderCatalog();
        });
    }

    // Кнопки внутри окна рекомендаций.
    recommendPanel?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.dataset.role === "close-recommend") {
            hideRecommendations();
            return;
        }
        if (target.dataset.role === "add" && target.dataset.id) addToCart(target.dataset.id);
    });

    recommendPanel?.addEventListener("mousedown", startRecommendationDrag);
    document.addEventListener("mousemove", onRecommendationDrag);
    document.addEventListener("mouseup", stopRecommendationDrag);

    // Изменение количества товаров в корзине.
    cartItemsElement?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const role = target.dataset.role;
        const productId = target.dataset.id;
        if (!role || !productId) return;
        if (role === "increase") updateQty(productId, 1);
        if (role === "decrease") updateQty(productId, -1);
    });

    // Имитация оформления заказа (frontend-демо).
    checkoutBtn?.addEventListener("click", () => {
        if (!cart.length) {
            alert("Корзина пока пустая.");
            return;
        }
        const subtotal = cart.reduce((sum, row) => sum + row.qty * row.product.price, 0);
        const discountRate = activePromo ? PROMO_CODES[activePromo] || 0 : 0;
        const discountAmount = Math.round(subtotal * discountRate);
        const deliveryCost = subtotal >= FREE_DELIVERY_FROM ? 0 : BASE_DELIVERY_COST;
        const total = Math.max(0, subtotal - discountAmount + deliveryCost);
        alert(`Заказ успешно оформлен на сумму ${formatPrice(total)}.`);
        cart.splice(0, cart.length);
        activePromo = null;
        promoInput.value = "";
        renderCart();
    });

    // Применение промокода.
    applyPromoBtn?.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        if (!code) {
            activePromo = null;
            renderCart();
            return;
        }
        if (!PROMO_CODES[code]) {
            promoNote.textContent = "Промокод не найден";
            return;
        }
        activePromo = code;
        renderCart();
    });

    cartFab?.addEventListener("click", () => cartPanel?.classList.add("open"));
    closeCartBtn?.addEventListener("click", () => cartPanel?.classList.remove("open"));
    recommendOverlay?.addEventListener("click", hideRecommendations);

    // На resize синхронизируем пагинацию и положение панели рекомендаций.
    window.addEventListener("resize", () => {
        const nowColumns = getCatalogColumns();
        if (searchInput && nowColumns !== lastCatalogColumns) {
            lastCatalogColumns = nowColumns;
            currentPage = 1;
            renderCatalog();
        }

        if (!recommendPanel || !recommendPanel.classList.contains("open")) return;
        if (window.innerWidth > 860 && recommendationAnchor) {
            positionRecommendPanel(recommendationAnchor);
        }
    });

    // Закрытие рекомендаций по клику вне панели.
    document.addEventListener("click", (event) => {
        if (!recommendPanel || !recommendPanel.classList.contains("open")) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        const clickedInsidePanel = recommendPanel.contains(target);
        const clickedMatchButton = target instanceof HTMLElement && target.dataset.role === "match";
        const clickedOverlay = target === recommendOverlay;
        if (!clickedInsidePanel && !clickedMatchButton && !clickedOverlay) {
            hideRecommendations();
        }
    });
}

// Единая точка запуска всех модулей страницы.
function init() {
    restoreCartState();
    if (searchInput && categorySelect && styleSelect) {
        fillSelects();
        renderStyleNav();
        renderCatalog();
        initAutocomplete();
    }
    bindEvents();
    if (cartCountElement && cartTotalElement) {
        renderCart();
    }
    renderCategoryChart();
    renderStylesChart();
    renderCityDemandChart();
    initMetrics();
}

// Старт приложения.
init();