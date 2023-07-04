'use strict';

async function header_animated()
{
	let elements = document.querySelectorAll('#header .animated');

	for (let i of elements)
	{
		i.style.opacity = '1';
		i.style.transform = 'translateY(0)';
		await sleep(100);
	}
}

function menu_events()
{
	let header_menu = document.querySelector('#header_div .menu');
	let header_menu_icon = document.querySelector('#header_div .menu_icon');
	let menu_div = document.querySelector('#menu_div');
	let menu_icon = document.querySelector('#menu_div .menu_icon');
	let menu_choices = document.querySelectorAll('#menu_div .menu a');

	function menu_in()
	{
		menu_div.style.transform = 'translateX(0px)';
		menu_div.style.boxShadow = '-10px 0px 30px rgba(0, 0, 0, 0.7)';
	}

	function menu_out()
	{
		menu_div.style.transform = 'translateX(clamp(0px, 100%, 400px))';
		menu_div.style.boxShadow = 'none';
	}

	function resize_events()
	{
		if (window.innerWidth < 900)
		{
			header_menu.style.display = 'none';
			header_menu_icon.style.display = 'block';
		}

		else
		{
			header_menu.style.display = 'block';
			header_menu_icon.style.display = 'none';
			menu_out();
		}
	}

	window.addEventListener('resize', resize_events);
	header_menu_icon.addEventListener('click', menu_in);
	menu_icon.addEventListener('click', menu_out);

	menu_choices.forEach((el) =>
	{
		el.addEventListener('click', menu_out);
	});

	resize_events();
}

function header_events()
{
	header_animated();

	let header_detached = false;
	let last_scroll_top = 0;

	function scroll_event()
	{
		let homeButton = document.querySelector('.home a');

		let atTop = document.documentElement.scrollTop === 0;

		if (atTop) {
			homeButton.classList.add('active');
		} else {
			homeButton.classList.remove('active');
		}

		if (document.querySelector('#header_div').getBoundingClientRect().bottom <
			document.querySelector('#home_section .welcome').getBoundingClientRect().top)
		{
			document.querySelector('#header_div').style.height = '100px';
			document.querySelector('#header_div').style.boxShadow = 'none';
			document.querySelector('#header_div').style.pointerEvents = 'none';
			document.querySelector('#header').style.backgroundColor = 'rgba(16, 29, 48, 0)';
			document.querySelector('#header').style.backdropFilter = 'none';
			document.querySelector('#header').style.webkitBackdropFilter = 'none';
			header_detached = false;
		}

		else
		{
			document.querySelector('#header_div').style.height = '70px';
			document.querySelector('#header_div').style.boxShadow = '0px 5px 30px rgba(0, 0, 0, 0.7)';
			document.querySelector('#header_div').style.pointerEvents = 'all';
			document.querySelector('#header').style.backgroundColor = 'var(--header-color)';
			document.querySelector('#header').style.backdropFilter = 'blur(8px)';
			document.querySelector('#header').style.webkitBackdropFilter = 'blur(8px)';
			header_detached = true;
		}
	}

	window.addEventListener('scroll', (e) =>
	{
		scroll_event();
		let new_last_scroll_top = window.pageYOffset || document.documentElement.scrollTop;

		if (new_last_scroll_top > last_scroll_top)
		{
			if (header_detached)
			{
				document.querySelector('#header_div').style.top = '-73px';
				document.querySelector('#header_div').style.boxShadow = 'none';
			}
		}

		else
		{
			document.querySelector('#header_div').style.top = '0px';

			if (header_detached)
				document.querySelector('#header_div').style.boxShadow = '0px 5px 20px rgba(0, 0, 0, 0.8)';
		}

		last_scroll_top = new_last_scroll_top <= 0 ? 0 : new_last_scroll_top;
	});

	window.addEventListener("scroll", function() {
		var image = document.getElementById('clickthis');
		var triggerHeight = document.documentElement.scrollHeight - window.innerHeight - 200;  // 200px before the end
	
		if (window.scrollY >= triggerHeight) {
			image.style.display = "block";
		} else {
			image.style.display = "none";
		}
	});
	

	window.addEventListener('resize', (e) =>
	{
		scroll_event();
	});

	scroll_event();

	menu_events();
}
