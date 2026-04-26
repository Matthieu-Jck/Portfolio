'use strict';

const language_content = {
	en: {
		pageTitle: 'Matthieu Jacques',
		language: {
			label: 'Language switcher'
		},
		warnings: {
			safari: 'This website is not optimized for this browser. For an optimal experience, please use Chrome or Firefox.'
		},
		nav: {
			home: 'Home',
			about: 'About',
			projects: 'Projects',
			skills: 'Skills',
			experience: 'Experience',
			contact: 'Contact'
		},
		actions: {
			dismiss: 'Dismiss',
			seeMore: 'See more',
			seeCode: 'See the code',
			openProject: 'Open project',
			openLiveDemo: 'Open live demo'
		},
		home: {
			welcome: 'Welcome, my name is',
			title: 'Software Engineer',
			bio: 'I\'m a <span id="age">20</span>-year-old creative software engineer and full-stack developer from France. I studied computer science at <a class="link" href="https://www.insa-toulouse.fr/en/" target="_blank">INSA Toulouse</a> and I\'m open to exciting opportunities.'
		},
		about: {
			title: 'About me',
			body: 'I\'m a <b>software engineer</b> passionate about turning ideas into engaging, functional solutions across <b>web development</b>, <b>game design</b>, and <b>AI</b>.<br><br>After earning my degree at <b>INSA Toulouse</b>, I gained three years of experience in the <b>aerospace and aeronautics industry</b> with companies such as Airbus D&amp;S, Thales, and Air France, working on high-precision, mission-critical projects.<br><br>I then spent a year in Australia <b>freelancing</b> in <b>web design</b> and tutoring computer science and mathematics, which strengthened my client-facing skills as well as my English to a fluent and professional level.<br><br>I thrive in collaborative environments, enjoy customer interaction, and value clear communication as much as technical excellence. This <b>portfolio</b> highlights the projects and experiences that have shaped my journey.'
		},
		projects: {
			title: 'Some of my projects'
		},
		skills: {
			title: 'Skills'
		},
		experience: {
			title: 'Working experience'
		},
		contact: {
			title: 'Contact'
		},
		footer: {
			license: '\u00a9 Matthieu Jacques',
			mit: 'MIT License 2024',
			source: 'See source code on my GitHub'
		}
	},
	fr: {
		pageTitle: 'Matthieu Jacques',
		language: {
			label: 'Choix de la langue'
		},
		warnings: {
			safari: 'Ce site n\'est pas optimis\u00e9 pour ce navigateur. Pour une exp\u00e9rience optimale, utilisez Chrome ou Firefox.'
		},
		nav: {
			home: 'Accueil',
			about: '\u00c0 propos',
			projects: 'Projets',
			skills: 'Comp\u00e9tences',
			experience: 'Exp\u00e9rience',
			contact: 'Contact'
		},
		actions: {
			dismiss: 'Fermer',
			seeMore: 'En savoir plus',
			seeCode: 'Voir le code',
			openProject: 'Ouvrir le projet',
			openLiveDemo: 'Ouvrir la d\u00e9mo'
		},
		home: {
			welcome: 'Bienvenue, je m\'appelle',
			title: 'Ing\u00e9nieur logiciel',
			bio: 'J\'ai <span id="age">20</span> ans, je suis <b>ing\u00e9nieur logiciel</b> et d\u00e9veloppeur full-stack cr\u00e9atif, originaire de France. J\'ai \u00e9tudi\u00e9 l\'informatique \u00e0 <a class="link" href="https://www.insa-toulouse.fr/" target="_blank">l\'INSA Toulouse</a> et je suis ouvert \u00e0 de belles opportunit\u00e9s.'
		},
		about: {
			title: '\u00c0 propos',
			body: 'Je suis un <b>ing\u00e9nieur logiciel</b> passionn\u00e9 par la transformation d\'id\u00e9es en solutions utiles, soign\u00e9es et engageantes, entre <b>d\u00e9veloppement web</b>, <b>game design</b> et <b>IA</b>.<br><br>Apr\u00e8s mon dipl\u00f4me \u00e0 <b>l\'INSA Toulouse</b>, j\'ai acquis trois ans d\'exp\u00e9rience dans les secteurs <b>a\u00e9rospatial et a\u00e9ronautique</b> aupr\u00e8s d\'entreprises comme Airbus D&amp;S, Thales et Air France, sur des projets de haute pr\u00e9cision et critiques.<br><br>J\'ai ensuite pass\u00e9 un an en Australie en tant que <b>freelance</b> en <b>web design</b>, tout en donnant des cours d\'informatique et de math\u00e9matiques. Cette exp\u00e9rience a renforc\u00e9 mes comp\u00e9tences client ainsi que mon anglais, aujourd\'hui fluide et professionnel.<br><br>J\'aime travailler en \u00e9quipe, le contact avec les clients et les environnements o\u00f9 la communication claire compte autant que la qualit\u00e9 technique. Ce <b>portfolio</b> regroupe les projets et exp\u00e9riences qui ont construit mon parcours.'
		},
		projects: {
			title: 'Quelques projets'
		},
		skills: {
			title: 'Comp\u00e9tences'
		},
		experience: {
			title: 'Exp\u00e9rience professionnelle'
		},
		contact: {
			title: 'Contact'
		},
		footer: {
			license: '\u00a9 Matthieu Jacques',
			mit: 'Licence MIT 2024',
			source: 'Voir le code source sur GitHub'
		}
	}
};

const language_storage_key = 'portfolio_language';
let current_language = localStorage.getItem(language_storage_key) || 'en';

if (!language_content[current_language])
	current_language = 'en';

function get_current_language()
{
	return current_language;
}

function get_translation(key)
{
	return key.split('.').reduce((value, part) => value && value[part], language_content[current_language]);
}

function sync_language_buttons()
{
	document.body.dataset.language = current_language;

	document.querySelectorAll('[data-language-option]').forEach((button) =>
	{
		const is_active = button.dataset.languageOption === current_language;
		button.classList.toggle('active', is_active);
		button.setAttribute('aria-pressed', is_active ? 'true' : 'false');
	});

	document.querySelectorAll('.language_toggle').forEach((toggle) =>
	{
		toggle.setAttribute('aria-label', get_translation('language.label'));
	});
}

function translate_static_content()
{
	document.title = get_translation('pageTitle');
	document.documentElement.lang = current_language;

	document.querySelectorAll('[data-i18n]').forEach((element) =>
	{
		const translation = get_translation(element.dataset.i18n);

		if (typeof translation === 'string')
			element.textContent = translation;
	});

	document.querySelectorAll('[data-i18n-html]').forEach((element) =>
	{
		const translation = get_translation(element.dataset.i18nHtml);

		if (typeof translation === 'string')
			element.innerHTML = translation;
	});

	if (typeof updateAge === 'function')
		updateAge();
}

function set_language(language)
{
	if (!language_content[language] || language === current_language)
		return;

	current_language = language;
	localStorage.setItem(language_storage_key, current_language);
	translate_static_content();
	sync_language_buttons();
	document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: current_language } }));
}

function language_events()
{
	document.querySelectorAll('[data-language-option]').forEach((button) =>
	{
		button.addEventListener('click', () =>
		{
			set_language(button.dataset.languageOption);
		});
	});

	translate_static_content();
	sync_language_buttons();
}
