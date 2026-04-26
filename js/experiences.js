'use strict';

function experience_events()
{
	let done = [];
	let elements = [];

	async function animated_check()
	{
		for (let i = 0; i < elements.length; i++)
			if (!done[i] && is_in_viewport(elements[i]))
			{
				elements[i].style.opacity = '1';
				elements[i].style.transform = 'translateY(0)';
				done[i] = true;
				await sleep(300);
			}
	}

	window.addEventListener('scroll', () =>
	{
		animated_check();
	});

	window.addEventListener('resize', () =>
	{
		animated_check();
	});

	function get_linked_title(job)
	{
		if (is_missing_value(job.link))
			return `<span class="job_title static">${job.title}</span>`;

		return `<a class="job_title" href="${job.link}" target="_blank">${job.title}</a>`;
	}

	function get_job_view(job)
	{
		const has_link = !is_missing_value(job.link);
		const has_video = !is_missing_value(job.video) && !is_safari();
		const inner = `
			<img src="${job.image}" alt="${job.title.toLowerCase()} image" width="1440px" height="810px"/>
			${has_video ? `
			<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
			<video loop muted preload="metadata">
				<source src="${job.video}" type="video/mp4"/>
			</video>` : ''}`;

		if (!has_link)
			return `<div class="job_media">${inner}</div>`;

		return `<a ${is_safari() ? 'class="safari_fix"' : ''} href="${job.link}" target="_blank">${inner}</a>`;
	}

	function add_job(job, inverted)
	{
		let tags = '';

		for (let tag of job.tags)
			tags += `<a href="${tag.url}" target="_blank">${tag.name}</a>`;

		if (window.innerWidth > 780)
		{
			document.querySelector('#experience_section .experience_content').innerHTML += `
				<div class="animated job ${inverted ? 'inverted' : ''}">
					<div class="job_text">
						<div class="type">
							<span>${job.date}</span>
							<span>&bull;</span>
							<span>${job.type}</span>
						</div>
						${get_linked_title(job)}
						<div class="text"><p>${job.description}</p></div>
						<div class="tags">${tags}</div>
					</div>
					<div class="job_view">
						${get_job_view(job)}
					</div>
				</div>`;
		}

		else
		{
			document.querySelector('#experience_section .experience_content').innerHTML += `
				<div class="animated job ${is_safari() ? 'safari_fix' : ''}" style="background-image: url(${job.image});">
					<div class="job_text">
						<div class="type">
							<span>${job.type}</span>
							<span>&bull;</span>
							<span>${job.date}</span>
						</div>
						${get_linked_title(job)}
						<div class="text"><p>${job.description}</p></div>
						<div class="tags">${tags}</div>
					</div>
				</div>`;
		}
	}

	function generate(data)
	{
		document.querySelector('#experience_section .experience_content').innerHTML = '';
		let inverted = data.experience.length % 2 == 0;

		for (let job of data.experience)
		{
			inverted = !inverted;
			add_job(job, inverted);
		}

		done = [];
		elements = document.querySelectorAll('#experience_section .animated');

		for (let _ of elements)
			done.push(false);

		animated_check();
		videos_scroll_event();
	}

	function generate_experience()
	{
		read_json(get_localized_json_path('resources/jsons/experiences.json'), generate);
	}

	let prev_width = window.innerWidth;
	generate_experience();

	window.addEventListener('resize', () =>
	{
		if ((prev_width >= 780 && window.innerWidth <= 780) || (prev_width <= 780 && window.innerWidth >= 780))
		{
			generate_experience();
			prev_width = window.innerWidth;
		}
	});

	document.addEventListener('languagechange', generate_experience);

	document.querySelectorAll('#experience_section .sort_choices .choice').forEach((el) =>
	{
		el.addEventListener('click', () =>
		{
			generate_experience();

			document.querySelectorAll('#experience_section .sort_choices .choice').forEach((choice) =>
			{
				choice.classList.remove('selected');
			});

			el.classList.add('selected');
		});
	});
}
