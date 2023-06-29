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
}

document.addEventListener('DOMContentLoaded', function() {
    home_events();
});









