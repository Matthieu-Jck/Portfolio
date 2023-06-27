'use strict';

function home_animateds()
{
	let done = false;
	let elements = document.querySelectorAll('#home_section .animated');
	let section = document.querySelector('#home_section');

	async function animated_check()
	{
		if (!done && is_in_viewport(section))
		{
			for (let i of elements)
			{
				i.style.opacity = '1';
				i.style.transform = 'translateY(0)';
				await sleep(300);
			}

			done = true;
		}
	}

	window.addEventListener('scroll', (e) =>
	{
		animated_check();
	});

	window.addEventListener('resize', (e) =>
	{
		animated_check();
	});

	animated_check();
}

function home_events()
{
	let particles_paused = false;
	particlesJS.load('particles', 'resources/jsons/particles.json');

	window.addEventListener('scroll', (e) =>
	{
		if (pJSDom[0] && document.querySelector('#particles').getBoundingClientRect().bottom < 0 && !particles_paused)
		{
			pJSDom[0].pJS.particles.move.enable = false;
			particles_paused = true;
		}

		if (pJSDom[0] && document.querySelector('#particles').getBoundingClientRect().bottom >= 0 && particles_paused)
		{
			pJSDom[0].pJS.particles.move.enable = true;
			pJSDom[0].pJS.fn.particlesRefresh();
			particles_paused = false;
		}
	});

	let rect = document.querySelector('#home_section .content').getBoundingClientRect();
	document.querySelector('#home_section').style.minHeight = (rect.height + 90) + 'px';
}
