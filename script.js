const styles = [
    { id: "y2k", label: "Y2K" },
    { id: "gothic", label: "Готика" },
    { id: "rock", label: "Рок" },
    { id: "punk", label: "Панк" },
    { id: "grunge", label: "Гранж" }
];

const categories = [
    { id: "top", label: "Верх" },
    { id: "bottom", label: "Низ" },
    { id: "shoes", label: "Обувь" },
    { id: "outerwear", label: "Верхняя одежда" },
    { id: "accessory", label: "Аксессуары" }
];

const products = [
    { id: "tshirt-1", name: "Футболка Neo Chrome", category: "top", image: "images/t-shirt1.png", price: 2890, styles: ["y2k", "punk", "grunge"], rating: 4.6, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-2", name: "Футболка Rebel Noise", category: "top", image: "images/t-shirt2.png", price: 3190, styles: ["rock", "grunge", "punk"], rating: 4.8, imageScale: 0.87, imageOffsetY: "0%" },
    { id: "tshirt-3", name: "Топ Midnight Lace", category: "top", image: "images/t-shirt3.png", price: 3590, styles: ["gothic", "rock"], rating: 4.7, imageScale: 0.86, imageOffsetY: "0%" },
    { id: "tshirt-4", name: "Футболка Pixel Fever", category: "top", image: "images/t-shirt4.png", price: 2990, styles: ["y2k", "rock"], rating: 4.5, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-5", name: "Лонгслив Shadow Soft", category: "top", image: "images/t-shirt5.png", price: 3490, styles: ["gothic", "grunge"], rating: 4.6, imageScale: 0.85, imageOffsetY: "0%" },
    { id: "pants-1", name: "Брюки Electro Cargo", category: "bottom", image: "images/pants1.png", price: 4890, styles: ["y2k", "punk"], rating: 4.7, imageScale: 0.83, imageOffsetY: "1%" },
    { id: "pants-2", name: "Джинсы Iron Fade", category: "bottom", image: "images/pants2.png", price: 5590, styles: ["rock", "grunge", "gothic"], rating: 4.9, imageScale: 0.84, imageOffsetY: "1%" },
    { id: "pants-3", name: "Брюки Nocturne Line", category: "bottom", image: "images/pants3.png", price: 5290, styles: ["y2k", "gothic", "punk"], rating: 4.5, imageScale: 0.84, imageOffsetY: "1%" },
    { id: "shoes-1", name: "Кроссовки Voltage 01", category: "shoes", image: "images/shoes1.png", price: 6790, styles: ["y2k", "punk"], rating: 4.4, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-2", name: "Ботинки Obsidian Rift", category: "shoes", image: "images/shoes2.png", price: 7990, styles: ["rock", "gothic"], rating: 4.8, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-3", name: "Кеды Dust Riot", category: "shoes", image: "images/shoes3.png", price: 6190, styles: ["grunge", "punk"], rating: 4.6, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-4", name: "Ботинки Steel Anthem", category: "shoes", image: "images/shoes4.png", price: 7490, styles: ["rock", "grunge"], rating: 4.7, imageScale: 0.91, imageOffsetY: "4%" },
    { id: "shoes-5", name: "Кроссовки Chrome Moon", category: "shoes", image: "images/shoes5.png", price: 6990, styles: ["y2k", "gothic"], rating: 4.5, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "jacket-1", name: "Куртка Dark Stage", category: "outerwear", image: "images/jacket1.png", price: 8990, styles: ["rock", "gothic", "grunge"], rating: 4.9, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "jacket-2", name: "Куртка Neon Pulse", category: "outerwear", image: "images/jacket2.png", price: 8290, styles: ["y2k", "punk"], rating: 4.7, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "cap-1", name: "Кепка Soft Static", category: "accessory", image: "images/cap1.png", price: 1890, styles: ["y2k", "grunge"], rating: 4.3, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-2", name: "Кепка Riot Code", category: "accessory", image: "images/cap2.png", price: 1990, styles: ["punk", "rock"], rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-3", name: "Кепка Hyper Frame", category: "accessory", image: "images/cap3.png", price: 2090, styles: ["y2k", "punk"], rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "hat-1", name: "Шляпа Velvet Night", category: "accessory", image: "images/hat1.png", price: 2590, styles: ["gothic", "rock"], rating: 4.6, imageScale: 0.9, imageOffsetY: "0%" },
    { id: "hat-2", name: "Шляпа Mist Raven", category: "accessory", image: "images/hat2.png", price: 2490, styles: ["gothic", "grunge"], rating: 4.5, imageScale: 0.9, imageOffsetY: "0%" }
];

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const styleSelect = document.getElementById("styleSelect");
const sortSelect = document.getElementById("sortSelect");
const productsGrid = document.getElementById("productsGrid");
const catalogInfo = document.getElementById("catalogInfo");
const styleNav = document.getElementById("styleNav");
const recommendPanel = document.getElementById("recommendPanel");
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

const cart = [];
const FREE_DELIVERY_FROM = 7000;
const BASE_DELIVERY_COST = 490;
const PROMO_CODES = {
    NOIR10: 0.1,
    STUDENT15: 0.15
};
let activePromo = null;
let recommendationAnchor = null;

function formatPrice(value) {
    return `${value.toLocaleString("ru-RU")} ₽`;
}

function saveCartState() {
    const payload = {
        items: cart.map((row) => ({ productId: row.product.id, qty: row.qty })),
        activePromo
    };
    localStorage.setItem("noir-cart", JSON.stringify(payload));
}

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

function getCategoryLabel(categoryId) {
    return categories.find((cat) => cat.id === categoryId)?.label || "Товар";
}

function fillSelects() {
    categorySelect.innerHTML = `<option value="all">Все категории</option>${categories
        .map((cat) => `<option value="${cat.id}">${cat.label}</option>`)
        .join("")}`;

    styleSelect.innerHTML = `<option value="all">Все стили</option>${styles
        .map((style) => `<option value="${style.id}">${style.label}</option>`)
        .join("")}`;
}

function renderStyleNav() {
    styleNav.innerHTML = [
        `<button class="style-chip ${styleSelect.value === "all" ? "active" : ""}" type="button" data-style="all">Все</button>`,
        ...styles.map(
            (style) =>
                `<button class="style-chip ${styleSelect.value === style.id ? "active" : ""}" type="button" data-style="${style.id}">${style.label}</button>`
        )
    ].join("");
}

function getFilteredProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const style = styleSelect.value;
    const sort = sortSelect.value;

    let result = products.filter((item) => {
        const bySearch = !search || item.name.toLowerCase().includes(search);
        const byCategory = category === "all" || item.category === category;
        const byStyle = style === "all" || item.styles.includes(style);
        return bySearch && byCategory && byStyle;
    });

    if (sort === "cheap") result.sort((a, b) => a.price - b.price);
    if (sort === "expensive") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    if (sort === "popular") result.sort((a, b) => b.rating - a.rating);

    return result;
}

function renderCatalog() {
    const filtered = getFilteredProducts();
    catalogInfo.textContent = `Найдено: ${filtered.length}`;
    renderStyleNav();

    if (!filtered.length) {
        productsGrid.innerHTML = `<p class="empty-state">По этим фильтрам ничего не найдено.</p>`;
        return;
    }

    productsGrid.innerHTML = filtered
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
}

function findById(productId) {
    return products.find((item) => item.id === productId);
}

const CATEGORY_COMPATIBILITY = {
    top: ["bottom", "shoes", "outerwear", "accessory"],
    bottom: ["top", "shoes", "outerwear", "accessory"],
    shoes: ["top", "bottom", "outerwear", "accessory"],
    outerwear: ["top", "bottom", "shoes", "accessory"],
    accessory: ["top", "bottom", "shoes", "outerwear"]
};

function getPriceDistanceScore(basePrice, candidatePrice) {
    const ratio = Math.abs(candidatePrice - basePrice) / Math.max(basePrice, 1);
    if (ratio <= 0.25) return 2;
    if (ratio <= 0.45) return 1;
    return 0;
}

function getMatchesForProduct(product, limit = 4) {
    const preferredCategories = CATEGORY_COMPATIBILITY[product.category] || [];

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

function hideRecommendations() {
    recommendPanel.classList.remove("open");
}

function renderRecommendations(productId, anchorElement = null) {
    const product = findById(productId);
    if (!product) return;
    const matches = getMatchesForProduct(product);
    recommendationAnchor = anchorElement || recommendationAnchor;

    if (!matches.length) {
        recommendPanel.innerHTML = `
            <div class="recommend-head">
                <h3>С чем носить: ${product.name}</h3>
                <button class="recommend-close" type="button" data-role="close-recommend">Закрыть</button>
            </div>
            <p class="recommend-empty">Для товара "${product.name}" пока нет подборки.</p>
        `;
        recommendPanel.classList.add("open");
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
    if (window.innerWidth > 860 && recommendationAnchor) {
        positionRecommendPanel(recommendationAnchor);
    }
}

function renderCart() {
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

function bindEvents() {
    [searchInput, categorySelect, styleSelect, sortSelect].forEach((input) => {
        input.addEventListener("input", renderCatalog);
        input.addEventListener("change", renderCatalog);
    });

    styleNav.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const styleId = target.dataset.style;
        if (!styleId) return;
        styleSelect.value = styleId;
        renderCatalog();
    });

    productsGrid.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const role = target.dataset.role;
        const productId = target.dataset.id;
        if (!role || !productId) return;
        if (role === "add") addToCart(productId);
        if (role === "match") renderRecommendations(productId, target);
    });

    recommendPanel.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.dataset.role === "close-recommend") {
            hideRecommendations();
            return;
        }
        if (target.dataset.role === "add" && target.dataset.id) addToCart(target.dataset.id);
    });

    cartItemsElement.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const role = target.dataset.role;
        const productId = target.dataset.id;
        if (!role || !productId) return;
        if (role === "increase") updateQty(productId, 1);
        if (role === "decrease") updateQty(productId, -1);
    });

    checkoutBtn.addEventListener("click", () => {
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

    applyPromoBtn.addEventListener("click", () => {
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

    cartFab.addEventListener("click", () => cartPanel.classList.add("open"));
    closeCartBtn.addEventListener("click", () => cartPanel.classList.remove("open"));

    window.addEventListener("resize", () => {
        if (!recommendPanel.classList.contains("open")) return;
        if (window.innerWidth > 860 && recommendationAnchor) {
            positionRecommendPanel(recommendationAnchor);
        }
    });

    document.addEventListener("click", (event) => {
        if (!recommendPanel.classList.contains("open")) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        const clickedInsidePanel = recommendPanel.contains(target);
        const clickedMatchButton = target instanceof HTMLElement && target.dataset.role === "match";
        if (!clickedInsidePanel && !clickedMatchButton) {
            hideRecommendations();
        }
    });
}

function init() {
    restoreCartState();
    fillSelects();
    bindEvents();
    renderStyleNav();
    renderCatalog();
    renderCart();
}

init();