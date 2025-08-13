'use strict';

// Make It Rain
var makeItRain = function () {
    // Clear out everything
    $('.rain').empty();

    let increment = 0;
    let drops = "";
    let backDrops = "";

    // Get screen width
    const screenWidth = $(window).width();

    // Set the number of raindrops based on screen width
    const numOfDrops = screenWidth > 800 ? 80 : 40; // Reduce the number for smaller screens

    while (increment < numOfDrops) {
        const randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        const randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        increment += randoFiver;
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
}

// Call the function once the document is ready
//$(document).ready(makeItRain);
