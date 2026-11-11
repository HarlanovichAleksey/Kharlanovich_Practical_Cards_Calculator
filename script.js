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

// 2. Маппинг картинок
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

    // Если поле пустое или введено что-то не то — считаем, что тираж 0
    if (isNaN(quantity) || quantity < 0) {
        quantity = 0;
    }

    // Вычисляем количество листов (тираж / 30)
    // Используем Math.ceil, чтобы если ввели 35, посчиталось за 2 листа (а не за 1.16)
    const physicalSheets = Math.ceil(quantity / 30); 

    // Считаем составляющие
    const templatePrice = prices.template[colorType] || 0;
    const paperPrice = (prices.paper[paperType] || 0) * physicalSheets;
    const printPrice = (prices.print[colorType] || 0) * physicalSheets;

    const total = templatePrice + paperPrice + printPrice;
    
    // Выводим цену (округляем до 1 знака)
    totalPriceEl.textContent = Number(total.toFixed(1));

    // Меняем картинку
    if (imageMap[colorType]) {
        previewImage.src = imageMap[colorType];
    }
}

// 5. Обработка потери фокуса (приведение к кратному 30)
quantityInput.addEventListener('blur', () => {
    let val = parseInt(quantityInput.value);
    
    // Если пусто, меньше 30 или NaN — ставим минимальные 30
    if (isNaN(val) || val < 30) {
        val = 30;
    } else {
        // Округляем вверх до ближайшего кратного 30
        val = Math.ceil(val / 30) * 30; 
    }
    
    quantityInput.value = val;
    calculate(); // Пересчитываем цену после изменения
});

// 6. Слушатели событий (пересчёт на лету)
quantityInput.addEventListener('input', calculate);
paperSelect.addEventListener('change', calculate);
colorSelect.addEventListener('change', calculate);

// 7. Первый запуск
calculate();