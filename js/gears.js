'use strict';

window.addEventListener('load', function gears() {
    const GEAR_1_SELECTOR = '.gear-first';
    const GEAR_2_SELECTOR = '.gear-second';
    const IGNORE_RADIUS = 40;
    const MAX_SPEED = 500;
    const SMOOTHING = 0.1;

    const gear1 = document.querySelector(GEAR_1_SELECTOR);
    const gear2 = document.querySelector(GEAR_2_SELECTOR);

    let gearAngle = 0;
    let targetAngle = 0;
    let lastAngle = null;
    let lastUpdate = Date.now();

    gear1.addEventListener('mousemove', setTargetAngle);
    gear1.addEventListener('mouseleave', resetLastAngle);

    function setTargetAngle(e) {
        const { centerX, centerY } = getCenter(gear1);
        const { distance, angle } = getDistanceAndAngle(e, centerX, centerY);

        if (distance < IGNORE_RADIUS) return;
        if (lastAngle !== null) {
            adjustTargetAngle(angle);
        }

        lastAngle = angle;
    }

    function resetLastAngle() {
        lastAngle = null;
    }

    function getCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
        };
    }

    function getDistanceAndAngle(e, centerX, centerY) {
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        return { distance, angle };
    }

    function adjustTargetAngle(angle) {
        const elapsed = (Date.now() - lastUpdate) / 1000;
        let diff = ((angle - lastAngle + 540) % 360) - 180;
        const maxDiff = MAX_SPEED * elapsed;

        if (Math.abs(diff) > maxDiff) {
            diff = maxDiff * (diff < 0 ? -1 : 1);
            lastAngle = null;
            return;
        }

        targetAngle += diff;
        lastUpdate = Date.now();
    }

    function applyRotation() {
        const angleDiff = targetAngle - gearAngle;
        gearAngle += angleDiff * SMOOTHING;

        gear1.style.transform = `rotate(${gearAngle}deg)`;
        gear2.style.transform = `rotate(${-gearAngle * 1.25}deg)`;

        requestAnimationFrame(applyRotation);
    }

    applyRotation();
});
