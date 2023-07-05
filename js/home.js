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
  
    document.onmousemove = function(e) {
      window.lastMousePos = { x: e.clientX, y: e.clientY };
    };
  
    setInterval(function() {
      if (window.lastMousePos) {
        createDroplet(window.lastMousePos.x, window.lastMousePos.y);
      }
    }, 1000);
  });
  
  function createDroplet(x, y) {
    const droplet = document.createElement('div');
    droplet.style.width = '6px';
    droplet.style.height = '10px';
    droplet.style.left = (x - 3) + 'px'; // Adjusted to droplet center
    droplet.style.top = (y - 5) + 'px'; // Adjusted to droplet center
    droplet.classList.add('droplet');
  
    document.body.appendChild(droplet);
  
    const followMouse = setInterval(function() {
      if (window.lastMousePos) {
        droplet.style.left = (window.lastMousePos.x - 3) + 'px';
        droplet.style.top = (window.lastMousePos.y - 5) + 'px';
      }
    }, 10);
  
    setTimeout(function() {
      clearInterval(followMouse);
    }, 600);
  
    setTimeout(function() {
      document.body.removeChild(droplet);
    }, 3000);
  }
  
  

