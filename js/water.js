document.addEventListener('DOMContentLoaded', function() {
    let waterElement = document.querySelector('.water');
    let belowWaterElement = document.querySelector('.below-waves');
    let waterHeight = 100;
    let bottom = 0;

    function decreaseWaterHeight() {
        if (waterHeight > 75) {
            waterHeight -= 0.02;
            bottom += 0.02;
            waterElement.style.height = waterHeight + "%";
            waterElement.style.bottom = bottom + "%";
            belowWaterElement.style.height = bottom + "%"; 
            window.requestAnimationFrame(decreaseWaterHeight);
        }
    }
    
    window.requestAnimationFrame(decreaseWaterHeight);
    
});
