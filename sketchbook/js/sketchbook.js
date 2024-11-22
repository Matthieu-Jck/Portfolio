let currentIndex = 0;
let interval;

const progressBar = document.querySelector('.progress-bar');
const imageContainer = document.querySelector('.image-container img');
const titleContainer = document.querySelector('#title');
const drawings = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    preloadImages()
        .then(loadDrawings)
        .then(startCarousel)
        .catch(console.error);

    // Event listeners for arrows
    document.querySelector('.arrow.left').addEventListener('click', prevImage);
    document.querySelector('.arrow.right').addEventListener('click', nextImage);
});

// Preload all images to ensure the page only displays when ready
function preloadImages() {
    return new Promise((resolve, reject) => {
        const images = document.querySelectorAll("img");
        const totalImages = images.length;
        let loadedImages = 0;

        const onImageLoad = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                document.body.classList.remove("hidden");
                resolve();
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                onImageLoad();
            } else {
                img.addEventListener("load", onImageLoad);
                img.addEventListener("error", onImageLoad); // Continue even if an image fails
            }
        });

        if (totalImages === 0) resolve(); // No images to preload
    });
}

// Fetch the drawings JSON file and populate the `drawings` array
function loadDrawings() {
    return fetch('resources/drawings.json')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch drawings: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            drawings.push(...data);
            if (drawings.length === 0) throw new Error("No drawings found in the JSON file.");
            loadImage();
        });
}

// Load the current drawing into the image container
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

// Reset and animate the progress bar
function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    clearInterval(interval);

    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
        interval = setInterval(nextImage, 5000);
    });
}

// Start the carousel by initiating the progress bar and interval
function startCarousel() {
    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '100%';
    interval = setInterval(nextImage, 5000);
}