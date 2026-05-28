/**
 * Данные магазина: справочники стилей и категорий, базовый каталог (массив объектов).
 * Подключается перед app.js и admin.js.
 *
 * Массивы создаются через конструктор Array с перечислением элементов:
 *   let students = new Array("Орлов", "Соколов", "Ястребов");
 * Если передать один числовой аргумент, задаётся длина пустого массива (здесь так не делаем):
 *   let students = new Array(2); // длина 2, не элемент «2»
 */
window.NOIR_PRODUCTS_STORAGE_KEY = "noir-products-v1";

window.NOIR_STYLES = new Array(
    { id: "y2k", label: "Y2K" },
    { id: "gothic", label: "Готика" },
    { id: "rock", label: "Рок" },
    { id: "punk", label: "Панк" },
    { id: "grunge", label: "Гранж" }
);

window.NOIR_CATEGORIES = new Array(
    { id: "top", label: "Верх" },
    { id: "bottom", label: "Низ" },
    { id: "shoes", label: "Обувь" },
    { id: "outerwear", label: "Верхняя одежда" },
    { id: "accessory", label: "Аксессуары" }
);

window.NOIR_BASE_PRODUCTS = new Array(
    { id: "tshirt-1", name: "Футболка Паучье логово", category: "top", image: "../images/t-shirt1.png", price: 1499, styles: new Array("punk", "grunge"), rating: 4.6, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-2", name: "Футболка Белая клетка чувств", category: "top", image: "../images/t-shirt2.png", price: 1499, styles: new Array("rock", "grunge", "punk"), rating: 4.8, imageScale: 0.87, imageOffsetY: "0%" },
    { id: "tshirt-3", name: "Футболка Морской подарок", category: "top", image: "../images/t-shirt3.png", price: 1290, styles: new Array("y2k", "rock"), rating: 4.7, imageScale: 0.86, imageOffsetY: "0%" },
    { id: "tshirt-4", name: "Футболка Морской пустяк", category: "top", image: "../images/t-shirt4.png", price: 1290, styles: new Array("y2k", "punk"), rating: 4.5, imageScale: 0.84, imageOffsetY: "0%" },
    { id: "tshirt-5", name: "Футболка Бездомный поэт", category: "top", image: "../images/t-shirt5.png", price: 990, styles: new Array("y2k", "punk"), rating: 4.6, imageScale: 0.85, imageOffsetY: "0%" },
    { id: "pants-1", name: "Джинсы Облоко", category: "bottom", image: "../images/pants1.png", price: 3890, styles: new Array("grunge", "punk"), rating: 4.7, imageScale: 0.83, imageOffsetY: "1%" },
    { id: "pants-2", name: "Джинсы Офисный стиляга", category: "bottom", image: "../images/pants2.png", price: 3590, styles: new Array("y2k", "grunge", "gothic"), rating: 4.9, imageScale: 0.84, imageOffsetY: "1%" },
    { id: "pants-3", name: "Джинсы Классика 80-х", category: "bottom", image: "../images/pants3.png", price: 3290, styles: new Array("y2k", "punk"), rating: 4.5, imageScale: 0.9, imageOffsetY: "1%" },
    { id: "shoes-1", name: "Берцы Переговорщика", category: "shoes", image: "../images/shoes1.png", price: 3790, styles: new Array("rock", "grunge", "punk"), rating: 4.4, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-2", name: "Берцы Повседневный путь", category: "shoes", image: "../images/shoes2.png", price: 2990, styles: new Array("rock", "y2k"), rating: 4.8, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "shoes-3", name: "Берцы Классика двора", category: "shoes", image: "../images/shoes3.png", price: 3190, styles: new Array("rock", "grunge", "punk"), rating: 4.6, imageScale: 1.1, imageOffsetY: "4%" },
    { id: "shoes-4", name: "Кеды Свободный дух", category: "shoes", image: "../images/shoes4.png", price: 2490, styles: new Array("y2k", "rock", "grunge"), rating: 4.7, imageScale: 0.91, imageOffsetY: "4%" },
    { id: "shoes-5", name: "Кеды Такой, какой есть", category: "shoes", image: "../images/shoes5.png", price: 2490, styles: new Array("y2k", "gothic", "punk"), rating: 4.5, imageScale: 0.9, imageOffsetY: "4%" },
    { id: "jacket-1", name: "Ветровка Гонщик", category: "outerwear", image: "../images/jacket1.png", price: 3990, styles: new Array("rock", "y2k", "grunge"), rating: 4.9, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "jacket-2", name: "Косуха Наследство пятиэтажек", category: "outerwear", image: "../images/jacket2.png", price: 3990, styles: new Array("rock", "punk", "grunge"), rating: 4.7, imageScale: 0.8, imageOffsetY: "-1%" },
    { id: "cap-1", name: "Кепка Зомби майор", category: "accessory", image: "../images/cap1.png", price: 990, styles: new Array("y2k", "grunge"), rating: 4.3, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-2", name: "Берет Карьеристки", category: "accessory", image: "../images/cap2.png", price: 990, styles: new Array("punk", "rock", "grunge"), rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "cap-3", name: "Кепка Душа компании", category: "accessory", image: "../images/cap3.png", price: 990, styles: new Array("y2k", "punk"), rating: 4.4, imageScale: 0.92, imageOffsetY: "0%" },
    { id: "hat-1", name: "Шапка Забота мамы", category: "accessory", image: "../images/hat1.png", price: 2590, styles: new Array("y2k", "gothic", "rock"), rating: 4.6, imageScale: 0.9, imageOffsetY: "0%" },
    { id: "hat-2", name: "Шапка Ушанка Сибирь", category: "accessory", image: "../images/hat2.png", price: 2490, styles: new Array("gothic", "grunge", "punk"), rating: 4.5, imageScale: 0.9, imageOffsetY: "0%" }
);
