'use strict';
function gears() {
    var gear1 = document.querySelector('.gear-first');
    var gear2 = document.querySelector('.gear-second');
    
    var lastAngle = null;
    var lastUpdate = Date.now();
    var ignoreRadius = 40;
    var gearAngle = 0;
    var targetAngle = 0; //for smoothing
    var maxSpeed = 480;
    var smoothing = 0.1;

    gear1.addEventListener('mousemove', setTargetAngle);
    gear1.addEventListener('mouseleave', resetLastAngle);

    // Function to set the target angle based on the mouse position
    function setTargetAngle(e) {
        var rectGear = gear1.getBoundingClientRect();
        var centerX = rectGear.left + rectGear.width / 2;
        var centerY = rectGear.top + rectGear.height / 2;
        var dx = e.clientX - centerX;
        var dy = e.clientY - centerY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ignoreRadius) {
            return;
        }

        var angle = Math.atan2(dy, dx) * 180 / Math.PI;

        if (lastAngle !== null) {
            var now = Date.now();
            var elapsed = (now - lastUpdate) / 1000;
            var diff = ((angle - lastAngle + 540) % 360) - 180;
            var maxDiff = maxSpeed * elapsed;
            if (Math.abs(diff) > maxDiff) {
                diff = maxDiff * (diff < 0 ? -1 : 1);
                lastAngle = null;
                return;
            }

            // Set the target angle instead of immediately applying the rotation
            targetAngle += diff;

            lastUpdate = now;
        }
        
        lastAngle = angle;
    }

    function resetLastAngle() {
        lastAngle = null;
    }

    // Function to smoothly apply the rotation
    function applyRotation() {
        // Calculate the difference between the target angle and the current angle
        var angleDiff = targetAngle - gearAngle;

        // Apply a fraction of the difference to the current angle
        gearAngle += angleDiff * smoothing;

        gear1.style.transform = 'rotate(' + gearAngle + 'deg)';
        gear2.style.transform = 'rotate(' + -gearAngle * 1.25 + 'deg)';

        // Continue applying the rotation in the next frame
        requestAnimationFrame(applyRotation);
    }

    // Start applying the rotation
    applyRotation();
}

window.addEventListener('load', gears);
