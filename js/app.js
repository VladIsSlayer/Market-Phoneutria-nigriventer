const styles = window.NOIR_STYLES;
const categories = window.NOIR_CATEGORIES;
const BASE_PRODUCTS = window.NOIR_BASE_PRODUCTS;
const PRODUCTS_STORAGE_KEY = window.NOIR_PRODUCTS_STORAGE_KEY;


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
let products = loadProductsForStore();

function safeJsonParse(raw) {
    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}

function normalizeProduct(raw) {
    if (!raw || typeof raw !== "object") return null;
    const id = String(raw.id || "").trim();
    const name = String(raw.name || "").trim();
    const category = String(raw.category || "").trim();
    const image = String(raw.image || "").trim();
    const price = Number(raw.price);
    const rating = Number(raw.rating);
    if (!id || !name || !category || !image) return null;
    if (!categories.some((item) => item.id === category)) return null;
    if (!Number.isFinite(price) || price <= 0) return null;
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) return null;

    const styleList = Array.isArray(raw.styles)
        ? raw.styles.map((item) => String(item).trim()).filter(Boolean)
        : [];
    const validStyles = styleList.filter((styleId) => styles.some((style) => style.id === styleId));
    if (!validStyles.length) return null;

    const imageScale = Number(raw.imageScale);
    const imageOffsetY = typeof raw.imageOffsetY === "string" ? raw.imageOffsetY : "0%";
    return {
        id,
        name,
        category,
        image,
        price: Math.round(price),
        styles: [...new Set(validStyles)],
        rating: Math.round(rating * 10) / 10,
        imageScale: Number.isFinite(imageScale) ? imageScale : 0.88,
        imageOffsetY
    };
}

function loadProductsForStore() {
    const stored = safeJsonParse(localStorage.getItem(PRODUCTS_STORAGE_KEY) || "");
    if (!Array.isArray(stored)) return BASE_PRODUCTS.slice();
    const normalized = stored.map(normalizeProduct).filter(Boolean);
    if (!normalized.length) return BASE_PRODUCTS.slice();
    return normalized;
}

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
    const parsed = safeJsonParse(raw);
    if (!parsed || typeof parsed !== "object") {
        localStorage.removeItem("noir-cart");
        return;
    }
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

    const filtered = products.filter((item) => {
        const bySearch = !search || item.name.toLowerCase().includes(search);
        const byCategory = category === "all" || item.category === category;
        const byStyle = style === "all" || item.styles.includes(style);
        return bySearch && byCategory && byStyle;
    });

    const sortFns = {
        cheap: (a, b) => a.price - b.price,
        expensive: (a, b) => b.price - a.price,
        name: (a, b) => a.name.localeCompare(b.name, "ru"),
        popular: (a, b) => b.rating - a.rating
    };
    filtered.sort(sortFns[sort] || sortFns.popular);
    return filtered;
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


    //Переменные для подгонки карточек до ровной сетки
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
  ВАЖНО: справочники и базовый каталог лежат в js/data.js (массив объектов).
  Здесь — логика витрины; товары подтягиваются из window.NOIR_BASE_PRODUCTS и localStorage.
  Что можно менять в данных товара:
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
    if (!anchorElement || !recommendPanel) return;

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

    recommendPanel.style.left = `${left}px`;
    recommendPanel.style.top = `${top}px`;
}

function setRecommendOverlayOpen(isOpen) {
    recommendPanel?.classList.toggle("open", isOpen);
    recommendOverlay?.classList.toggle("open", isOpen);
}

function showRecommendPanelNearAnchor() {
    setRecommendOverlayOpen(true);
    if (window.innerWidth > 860 && recommendationAnchor) {
        positionRecommendPanel(recommendationAnchor);
    }
}

// Закрывает панель рекомендаций и оверлей.
function hideRecommendations() {
    setRecommendOverlayOpen(false);
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
        showRecommendPanelNearAnchor();
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
                .map(       //Перебираем массив совместимых товаров и формируем HTML для каждого товара
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
    showRecommendPanelNearAnchor();
}

function destroyChartIfExists(chart) {
    if (chart) chart.destroy();
}

const CHART_GRID = { color: "rgba(255,255,255,0.08)" };
const CHART_TICK = { color: "#d8e0ff" };

function chartScalesBarDefault() {
    return {
        x: { ticks: CHART_TICK, grid: CHART_GRID },
        y: { beginAtZero: true, ticks: { ...CHART_TICK, precision: 0 }, grid: CHART_GRID }
    };
}

const CHART_BASE_OPTIONS = {
    responsive: true,
    maintainAspectRatio: true
};

// График 1: количество товаров по категориям.
function renderCategoryChart() {
    if (!categoryChartCanvas || !window.Chart) return;
    const labels = categories.map((item) => item.label);
    const values = categories.map((item) => products.filter((product) => product.category === item.id).length);

    destroyChartIfExists(categoryChart);

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
            ...CHART_BASE_OPTIONS,
            plugins: { legend: { display: false } },
            scales: chartScalesBarDefault()
        }
    });
}

// График 2: распределение товаров по стилям.
function renderStylesChart() {
    if (!stylesChartCanvas || !window.Chart) return;
    const labels = styles.map((item) => item.label);
    const values = styles.map((item) => products.filter((product) => product.styles.includes(item.id)).length);

    destroyChartIfExists(stylesChart);

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
            ...CHART_BASE_OPTIONS,
            plugins: { legend: { labels: { color: CHART_TICK.color } } }
        }
    });
}

// График 3: спрос по городам (заказы + сумма).
function renderCityDemandChart() {
    if (!cityChartCanvas || !window.Chart) return;
    const labels = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Другие"];
    const orders = [1260, 980, 520, 470, 430, 610];
    const sumMln = [8.9, 6.8, 3.4, 3.1, 2.8, 4.2];

    destroyChartIfExists(cityChart);

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
            ...CHART_BASE_OPTIONS,
            plugins: { legend: { labels: { color: CHART_TICK.color } } },
            scales: {
                x: { ticks: CHART_TICK, grid: CHART_GRID },
                y: { beginAtZero: true, ticks: { ...CHART_TICK, precision: 0 }, grid: CHART_GRID },
                y1: {
                    beginAtZero: true,
                    position: "right",
                    ticks: { color: "#ffcf9a" },
                    grid: CHART_GRID
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

// --- Обработчики UI (разные современные приёмы в bindEvents): именованные функции,
// делегирование с event.target.closest(), AbortController + { signal }, фаза capture для одного сценария.

function onFilterChanged() {
    currentPage = 1;
    renderCatalog();
}

/** Делегирование: клик по чипу стиля (всплытие), ищем ближайшую кнопку с data-style. */
function handleStyleNavClick(event) {
    const chip = event.target instanceof Element ? event.target.closest("button[data-style]") : null;
    if (!chip || !styleNav.contains(chip)) return;
    const styleId = chip.dataset.style;
    if (!styleId) return;
    styleSelect.value = styleId;
    currentPage = 1;
    renderCatalog();
}

/** Делегирование: «В корзину» / «Сочетается с» в сетке каталога. */
function handleProductsGridClick(event) {
    const btn = event.target instanceof Element ? event.target.closest("button[data-role][data-id]") : null;
    if (!btn || !productsGrid.contains(btn)) return;
    const { role, id: productId } = btn.dataset;
    if (!role || !productId) return;
    if (role === "add") addToCart(productId);
    if (role === "match") renderRecommendations(productId, btn);
}

/** Делегирование: кнопки пагинации с data-page. */
function handlePaginationClick(event) {
    if (!paginationControls) return;
    const btn = event.target instanceof Element ? event.target.closest("button.page-btn[data-page]") : null;
    if (!btn || !paginationControls.contains(btn)) return;
    const pageValue = Number(btn.dataset.page);
    if (!Number.isFinite(pageValue) || pageValue < 1) return;
    currentPage = pageValue;
    renderCatalog();
}

/** Делегирование: панель рекомендаций (закрыть / в корзину). */
function handleRecommendPanelClick(event) {
    const btn = event.target instanceof Element ? event.target.closest("button[data-role]") : null;
    if (!btn || !recommendPanel.contains(btn)) return;
    if (btn.dataset.role === "close-recommend") {
        hideRecommendations();
        return;
    }
    if (btn.dataset.role === "add" && btn.dataset.id) addToCart(btn.dataset.id);
}

/** Делегирование: +/- количества в корзине. */
function handleCartItemsClick(event) {
    const btn = event.target instanceof Element ? event.target.closest("button[data-role][data-id]") : null;
    if (!btn || !cartItemsElement.contains(btn)) return;
    const { role, id: productId } = btn.dataset;
    if (!role || !productId) return;
    if (role === "increase") updateQty(productId, 1);
    if (role === "decrease") updateQty(productId, -1);
}

/** Прямая подписка: оформление заказа. */
function handleCheckoutClick() {
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
}

/** Прямая подписка: промокод. */
function handleApplyPromoClick() {
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
}

function handleOpenCart() {
    cartPanel?.classList.add("open");
}

function handleCloseCart() {
    cartPanel?.classList.remove("open");
}

function handleWindowResize() {
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
}

/**
 * Закрытие рекомендаций по клику вне панели.
 * Подписка с capture: true — другой приём, чем у остальных слушателей (фаза перехвата).
 */
function handleDocumentClickRecommendCapture(event) {
    if (!recommendPanel || !recommendPanel.classList.contains("open")) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    const clickedInsidePanel = recommendPanel.contains(target);
    const clickedMatchButton = target instanceof HTMLElement && target.dataset.role === "match";
    const clickedOverlay = target === recommendOverlay;
    if (!clickedInsidePanel && !clickedMatchButton && !clickedOverlay) {
        hideRecommendations();
    }
}

// Подписывает все обработчики событий интерфейса.
function bindEvents() {
    const ac = new AbortController();
    const { signal } = ac;

    if (searchInput && categorySelect && styleSelect && sortSelect && productsGrid && styleNav) {
        // Нативные слушатели (без смешения с jQuery): поиск — input; селекты — change.
        searchInput.addEventListener("input", onFilterChanged, { signal });
        [categorySelect, styleSelect, sortSelect].forEach((el) => {
            el.addEventListener("change", onFilterChanged, { signal });
        });

        styleNav.addEventListener("click", handleStyleNavClick, { signal });
        productsGrid.addEventListener("click", handleProductsGridClick, { signal });
        paginationControls?.addEventListener("click", handlePaginationClick, { signal });
    }

    recommendPanel?.addEventListener("click", handleRecommendPanelClick, { signal });
    recommendPanel?.addEventListener("mousedown", startRecommendationDrag, { signal });
    document.addEventListener("mousemove", onRecommendationDrag, { signal });
    document.addEventListener("mouseup", stopRecommendationDrag, { signal });

    cartItemsElement?.addEventListener("click", handleCartItemsClick, { signal });

    checkoutBtn?.addEventListener("click", handleCheckoutClick, { signal });
    applyPromoBtn?.addEventListener("click", handleApplyPromoClick, { signal });

    cartFab?.addEventListener("click", handleOpenCart, { signal });
    closeCartBtn?.addEventListener("click", handleCloseCart, { signal });
    recommendOverlay?.addEventListener("click", hideRecommendations, { signal });

    window.addEventListener("resize", handleWindowResize, { signal });

    document.addEventListener("click", handleDocumentClickRecommendCapture, { capture: true, signal });
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
