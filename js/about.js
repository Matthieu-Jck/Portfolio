'use strict';

function about_animateds()
{
	let done = false;
	let elements = document.querySelectorAll('#about_section .animated');
	let section = document.querySelector('#about_section .photo');

	async function animated_check()
	{
		if (!done && is_in_viewport(section))
		{
			for (let i of elements)
			{
				i.style.clipPath = 'circle(49.7%)';
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
