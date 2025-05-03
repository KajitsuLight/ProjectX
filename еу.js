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

map.on('mouseover', () => {
    zoomIn(); // При наведении увеличиваем масштаб
});

map.on('mouseout', () => {
    zoomOut(); // При уходе курсора уменьшаем масштаб
});
