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

document.addEventListener('DOMContentLoaded', function () {
    home_events();
    makeItRain();
});

var makeItRain = function () {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
}










