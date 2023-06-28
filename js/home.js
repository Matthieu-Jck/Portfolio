'use strict';

function home_animateds() {
    let done = false;
    let elements = document.querySelectorAll('#home_section .animated');
    let section = document.querySelector('#home_section');

    async function animated_check() {
        if (!done && is_in_viewport(section)) {
            for (let i of elements) {
                i.style.opacity = '1';
                i.style.transform = 'translateY(0)';
                await sleep(300);
            }

            done = true;
        }
    }

    window.addEventListener('scroll', (e) => {
        animated_check();
    });

    window.addEventListener('resize', (e) => {
        animated_check();
    });

    animated_check();
}

function home_events() {
    let rectContent = document.querySelector('#home_section .content').getBoundingClientRect();
    document.querySelector('#home_section').style.minHeight = (rectContent.height + 90) + 'px';

    var gear = document.querySelector('.gear');
    var rectGear = gear.getBoundingClientRect();
    var centerX = rectGear.left + rectGear.width / 2;
    var centerY = rectGear.top + rectGear.height / 2;

    document.addEventListener('mousemove', function(e) {
        var angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
        gear.style.transform = 'rotate(' + angle + 'deg)';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    home_animateds();
    home_events();
});
