'use strict';

async function animateds() {
	await sleep(500);
	home_animateds();
	about_animateds();
}

window.onload = () => {
	document.documentElement.scrollLeft = 0;

	header_events();
	home_events();
	projects_events();
	skills_events();
	experience_events();

	animateds();
	videos_events();

	if (!is_safari())
		document.querySelector('#safari_warning').style.display = 'none';
	else {
		document.querySelector('#about_section .photo').classList.add('safari_fix');
		document.querySelector('#skills_section .box').classList.add('safari_fix');
		
		const dismissBtn = document.querySelector('#dismiss_safari_warning');
		if (dismissBtn) {
			dismissBtn.addEventListener('click', () => {
				document.querySelector('#safari_warning').style.display = 'none';
			});
		}
	}

	document.querySelector('#loading_screen').style.display = 'none';
	window.setTimeout(() => { document.querySelector('#lcp').style.display = 'none'; }, 100);
};
