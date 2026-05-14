const cmsForm = document.getElementById("cmsForm");
const cmsTableWrap = document.getElementById("cmsTableWrap");
const cmsStatus = document.getElementById("cmsStatus");
const cmsClearBtn = document.getElementById("cmsClearBtn");
const cmsResetBtn = document.getElementById("cmsResetBtn");

const cmsId = document.getElementById("cmsId");
const cmsName = document.getElementById("cmsName");
const cmsCategory = document.getElementById("cmsCategory");
const cmsImage = document.getElementById("cmsImage");
const cmsPrice = document.getElementById("cmsPrice");
const cmsStyleCheckboxes = Array.from(document.querySelectorAll(".cms-style-checkbox"));

const PRODUCT_KEY = window.NOIR_PRODUCTS_STORAGE_KEY || "noir-products-v1";
const BASE_PRODUCTS = Array.isArray(window.NOIR_BASE_PRODUCTS) ? window.NOIR_BASE_PRODUCTS : [];
const CATEGORY_PREFIX = {
    top: "tshirt",
    bottom: "pants",
    shoes: "shoes",
    outerwear: "jacket",
    accessory: "accessory"
};
let editingProductId = null;

function parseJson(raw) {
    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}

function getCurrentProducts() {
    const stored = parseJson(localStorage.getItem(PRODUCT_KEY) || "");
    if (Array.isArray(stored) && stored.length) return stored;
    return BASE_PRODUCTS.slice();
}

function saveProducts(items) {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(items));
}

function setStatus(text, isError = false) {
    cmsStatus.textContent = text;
    cmsStatus.style.color = isError ? "#ffb2b2" : "#a8b4dc";
}

function clearForm() {
    cmsId.value = "";
    cmsName.value = "";
    cmsCategory.value = "top";
    cmsImage.value = "";
    cmsPrice.value = "";
    cmsStyleCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    editingProductId = null;
    setStatus("Форма очищена.");
}

function buildNextProductId(category, items, excludeId = null) {
    const prefix = CATEGORY_PREFIX[category] || "item";
    const sameCategoryItems = items.filter((item) => item.category === category && item.id !== excludeId);
    let maxNum = 0;
    sameCategoryItems.forEach((item) => {
        const match = String(item.id).match(new RegExp(`^${prefix}-(\\d+)$`));
        if (!match) return;
        const num = Number(match[1]);
        if (Number.isFinite(num) && num > maxNum) {
            maxNum = num;
        }
    });
    return `${prefix}-${maxNum + 1}`;
}

function normalizeFromForm() {
    const name = cmsName.value.trim();
    const category = cmsCategory.value;
    const image = cmsImage.value.trim();
    const price = Number(cmsPrice.value);
    const rating = 4.5;
    const styles = cmsStyleCheckboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

    if (!name || !category || !image || !styles.length) return null;
    if (!Number.isFinite(price) || price <= 0) return null;

    const items = getCurrentProducts();
    const id = buildNextProductId(category, items, editingProductId);
    cmsId.value = id;

    return {
        id,
        name,
        category,
        image,
        price: Math.round(price),
        styles,
        rating,
        imageScale: 0.88,
        imageOffsetY: "0%"
    };
}

function fillForm(product) {
    cmsId.value = product.id;
    cmsName.value = product.name;
    cmsCategory.value = product.category;
    cmsImage.value = product.image;
    cmsPrice.value = String(product.price);
    cmsStyleCheckboxes.forEach((checkbox) => {
        checkbox.checked = Array.isArray(product.styles) && product.styles.includes(checkbox.value);
    });
    editingProductId = product.id;
}

function renderTable() {
    const items = getCurrentProducts();
    if (!items.length) {
        cmsTableWrap.innerHTML = `<p class="empty-state">Каталог пуст. Добавьте первый товар.</p>`;
        return;
    }

    cmsTableWrap.innerHTML = `
        <table class="cms-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Цена</th>
                    <th>Стили</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${items
                    .map(
                        (item) => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.category}</td>
                            <td>${item.price}</td>
                            <td>${(item.styles || []).join(", ")}</td>
                            <td>
                                <button class="link-btn cms-edit-btn" type="button" data-role="edit" data-id="${item.id}">Редактировать</button>
                                <button class="link-btn cms-del-btn" type="button" data-role="delete" data-id="${item.id}">Удалить</button>
                            </td>
                        </tr>
                    `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
}

function onSubmit(event) {
    event.preventDefault();
    const normalized = normalizeFromForm();
    if (!normalized) {
        setStatus("Проверьте поля: обязательные данные, цена > 0, хотя бы 1 стиль.", true);
        return;
    }

    const items = getCurrentProducts();
    const withoutEdited = editingProductId ? items.filter((item) => item.id !== editingProductId) : items.slice();
    const index = withoutEdited.findIndex((item) => item.id === normalized.id);
    if (index >= 0) withoutEdited[index] = normalized;
    else withoutEdited.push(normalized);

    setStatus(editingProductId ? `Товар обновлен: ${normalized.id}.` : `Товар добавлен: ${normalized.id}.`);
    editingProductId = normalized.id;
    saveProducts(withoutEdited);
    renderTable();
}

function onTableClick(event) {
    const btn = event.target instanceof Element ? event.target.closest("button[data-role][data-id]") : null;
    if (!btn || !cmsTableWrap.contains(btn)) return;
    const role = btn.dataset.role;
    const id = btn.dataset.id;
    if (!role || !id) return;

    const items = getCurrentProducts();
    const product = items.find((item) => item.id === id);
    if (!product) return;

    if (role === "edit") {
        fillForm(product);
        setStatus(`Товар ${id} загружен в форму.`);
        return;
    }
    if (role === "delete") {
        const next = items.filter((item) => item.id !== id);
        saveProducts(next);
        renderTable();
        setStatus(`Товар ${id} удален.`);
    }
}

function resetToBase() {
    localStorage.removeItem(PRODUCT_KEY);
    renderTable();
    setStatus("Каталог сброшен к базовым товарам.");
}

if (cmsForm && cmsTableWrap && cmsStatus) {
    renderTable();
    const cmsUi = new AbortController();
    const { signal } = cmsUi;
    cmsForm.addEventListener("submit", onSubmit, { signal });
    cmsTableWrap.addEventListener("click", onTableClick, { signal });
    cmsClearBtn?.addEventListener("click", clearForm, { signal });
    cmsResetBtn?.addEventListener("click", resetToBase, { signal });
}
