let currentIndex = 0;
const progressBar = document.querySelector('.progress-bar');
const imageContainer = document.querySelector('.image-container img');
const titleContainer = document.querySelector('#title');
const drawings = [];
let interval;

// Fetch and load the drawings JSON
fetch('resources/drawings.json')
    .then(response => response.json())
    .then(data => {
        drawings.push(...data);
        loadImage();
        startCarousel();
    });

// Load the current drawing
function loadImage() {
    const currentDrawing = drawings[currentIndex];
    imageContainer.src = `resources/images/${currentDrawing.filename}`;
    titleContainer.textContent = currentDrawing.title;
}

// Move to the next drawing
function nextImage() {
    currentIndex = (currentIndex + 1) % drawings.length;
    resetProgressBar();
    loadImage();
}

// Move to the previous drawing
function prevImage() {
    currentIndex = (currentIndex - 1 + drawings.length) % drawings.length;
    resetProgressBar();
    loadImage();
}

// Reset the progress bar
function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    clearInterval(interval);
    setTimeout(() => {
        progressBar.style.transition = 'width 10s linear';
        progressBar.style.width = '100%';
        interval = setInterval(nextImage, 10000);
    });
}

// Start the carousel
function startCarousel() {
    progressBar.style.transition = 'width 10s linear';
    progressBar.style.width = '100%';
    interval = setInterval(nextImage, 10000);
}

// Event listeners for arrows
document.querySelector('.arrow.left').addEventListener('click', prevImage);
document.querySelector('.arrow.right').addEventListener('click', nextImage);