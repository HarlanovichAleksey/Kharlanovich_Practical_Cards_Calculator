// 1. Объекты с ценами
const prices = {
    template: {
        "1/0": 110,
        "1/1": 220,
        "4/0": 110,
        "4/1": 220,
        "4/4": 220
    },
    paper: {
        "melovannaya": 6.8,
        "splendorgel": 40.5,
        "prestige": 45
    },
    print: {
        "1/0": 14,
        "1/1": 28,
        "4/0": 37,
        "4/1": 51,
        "4/4": 74
    }
};

// 2. Маппинг картинок (ключ — значение value из select)
const imageMap = {
    "1/0": "img/1_0.png",
    "1/1": "img/1_1.png",
    "4/0": "img/4_0.png",
    "4/1": "img/4_1.png",
    "4/4": "img/4_4.png"
};

// 3. Элементы DOM
const quantityInput = document.getElementById('quantity');
const paperSelect = document.getElementById('paper');
const colorSelect = document.getElementById('color');
const totalPriceEl = document.getElementById('totalPrice');
const previewImage = document.getElementById('previewImage');

// 4. Функция расчёта
function calculate() {
    let quantity = parseInt(quantityInput.value);
    const paperType = paperSelect.value;
    const colorType = colorSelect.value;

    if (isNaN(quantity) || quantity < 1) {
        quantity = 0;
    }

    const physicalSheets = Math.ceil(quantity / 30); 

    const templatePrice = prices.template[colorType];
    const paperPrice = prices.paper[paperType] * physicalSheets;
    const printPrice = prices.print[colorType] * physicalSheets;

    const total = templatePrice + paperPrice + printPrice;
    
    // Выводим цену
    totalPriceEl.textContent = Number(total.toFixed(1));

    // Меняем картинку в зависимости от выбранной цветности
    if (imageMap[colorType]) {
        previewImage.src = imageMap[colorType];
    }
}

// 5. Слушатели
quantityInput.addEventListener('input', calculate);
paperSelect.addEventListener('change', calculate);
colorSelect.addEventListener('change', calculate);

// 6. Первый запуск
calculate();