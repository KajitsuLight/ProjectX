const gallery = document.getElementById('gallery');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const nextButton1 = document.getElementById('nextButton1');
const prevButton1 = document.getElementById('prevButton1');

let scrollAmount = 0;
const scrollStep = 260; // Шаг прокрутки

const scrollToPosition = (amount) => {
    gallery.scrollTo({
        left: amount,
        behavior: 'smooth' // Плавная прокрутка
    });
};

const handleScroll = (direction) => {
    scrollAmount += direction * scrollStep; // Увеличиваем или уменьшаем scrollAmount
    if (scrollAmount < 0) scrollAmount = 0; // Не даем прокрутить в отрицательную сторону
    scrollToPosition(scrollAmount);
};

nextButton1.addEventListener('click', () => handleScroll(1));
nextButton.addEventListener('click', () => handleScroll(1));
prevButton1.addEventListener('click', () => handleScroll(-1));
prevButton.addEventListener('click', () => handleScroll(-1));

let startX;
let isDragging = false;

gallery.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true; // Устанавливаем флаг перетаскивания
    gallery.style.transition = 'none'; // Отключаем анимацию
});

gallery.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Если не перетаскиваем, выходим
    const endX = e.pageX;
    const distance = startX - endX; // Рассчитываем расстояние перемещения
    if (distance > 50) {
        // Перетаскивание влево
        handleScroll(1);
        startX = endX; // Обновляем начальную позицию
    } else if (distance < -50) {
        // Перетаскивание вправо
        handleScroll(-1);
        startX = endX; // Обновляем начальную позицию
    }
});

gallery.addEventListener('mouseup', () => {
    isDragging = false; // Сбрасываем флаг перетаскивания
    gallery.style.transition = 'transform 0.5s ease'; // Включаем анимацию
});

gallery.addEventListener('mouseleave', () => {
    isDragging = false; // Сбрасываем флаг перетаскивания
    gallery.style.transition = 'transform 0.5s ease'; // Включаем анимацию
});


const map = L.map('map').setView([54.766363, 32.061164], 15); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


function zoomIn() {
    map.setZoom(map.getZoom() + 1);
}


function zoomOut() {
    map.setZoom(map.getZoom() - 1);
}


const buys = document.querySelectorAll('.buy'); // Получаем все кнопки
const formsContainer = document.getElementById('formContainer');
const closeform = document.getElementById('closeform'); 
const overlay = document.getElementById('overlay');
const closeform1 = document.getElementById('closeform1');

function openForm() {
    formsContainer.style.display = 'block';
    overlay.style.display = 'block';
}

// Добавляем обработчик события для каждой кнопки
    buys.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price);

            console.log(`Добавляем в корзину: ${itemName} за ${itemPrice} ₽`);
            openForm();
        });
    });

closeform1.addEventListener('click', closeForm);
// closeform.addEventListener('click', closeForm);

overlay.addEventListener('click', closeForm);

function closeForm() {
    formsContainer.style.display = 'none';
    overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const garnishOptions = document.querySelectorAll('.garnish-option');

    garnishOptions.forEach(option => {
        const decreaseBtn = option.querySelector('.decrease');
        const increaseBtn = option.querySelector('.increase');
        const quantityInput = option.querySelector('.quantity');

        decreaseBtn.addEventListener('click', () => {
            let currentVal = parseInt(quantityInput.value);
            if (currentVal > 1) { // Изменяем условие, чтобы не было нуля
                quantityInput.value = currentVal - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentVal = parseInt(quantityInput.value);
            quantityInput.value = currentVal + 1;
        });

        quantityInput.addEventListener('input', () => {
            let val = parseInt(quantityInput.value);
            if (isNaN(val) || val < 1) {
                quantityInput.value = 1;
            }
        });        });        });