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
			welcome: ' Welcome, my name is',
			title: 'Software Engineer',
			bio: 'I\'m a <span id="age">20</span> years old, creative Software Engineer and Full-Stack Developer from France. I studied computer science at <a class="link" href="https://www.insa-toulouse.fr/en/" target="_blank">INSA Toulouse</a>. I am open to any exciting opportunity.'
		},
		about: {
			title: 'About me : ',
			body: 'I\'m a <b>software engineer</b> passionate about turning ideas into engaging, functional solutions across <b>web development</b>, <b>game design</b>, and <b>AI</b>.<br><br>After earning my degree at <b>INSA Toulouse</b>, I gained three years of experience in the <b>aerospace and aeronautics industry</b> with companies such as Airbus D&amp;S, Thales, and Air France, working on high-precision, mission-critical projects.<br><br>I then spent a year in Australia <b>freelancing</b> in <b>web design</b> and tutoring computer science and mathematics, which strengthened my client-facing skills as well as my English to a fluent and professional level. I thrive in collaborative environments, enjoy customer interaction, and value clear communication as much as technical excellence.<br><br>This <b>portfolio</b> highlights the projects and experiences that have shaped my journey.<br><br>'
		},
		projects: {
			title: 'Some of my Projects'
		},
		skills: {
			title: 'Skills :'
		},
		experience: {
			title: 'Working experiences:'
		},
		contact: {
			title: 'Contacts : '
		},
		footer: {
			license: '\u00a9 Matthieu Jacques',
			mit: 'MIT license 2024',
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
			welcome: ' Bienvenue, je m\'appelle',
			title: 'Ingénieur logiciel',
			bio: 'J\'ai <span id="age">20</span> ans, je suis ingénieur logiciel créatif et développeur full-stack, originaire de France. J\'ai étudié l\'informatique à <a class="link" href="https://www.insa-toulouse.fr/" target="_blank">l\'INSA Toulouse</a>. Je suis ouvert à toute opportunité enthousiasmante.'
		},
		about: {
			title: 'À propos : ',
			body: 'Je suis un <b>ingénieur logiciel</b> passionné par la transformation d\'idées en solutions engageantes et fonctionnelles dans les domaines du <b>développement web</b>, du <b>game design</b> et de l\'<b>IA</b>.<br><br>Après avoir obtenu mon diplôme à l\'<b>INSA Toulouse</b>, j\'ai acquis trois ans d\'expérience dans l\'<b>industrie aérospatiale et aéronautique</b> avec des entreprises comme Airbus D&amp;S, Thales et Air France, en travaillant sur des projets critiques de haute précision.<br><br>J\'ai ensuite passé un an en Australie en tant que <b>freelance</b> en <b>web design</b> et professeur particulier en informatique et en mathématiques, ce qui a renforcé mes compétences relationnelles ainsi que mon niveau d\'anglais, aujourd\'hui fluent et professionnel. J\'évolue très bien dans les environnements collaboratifs, j\'apprécie la relation client et j\'accorde autant d\'importance à la communication claire qu\'à l\'excellence technique.<br><br>Ce <b>portfolio</b> met en avant les projets et expériences qui ont façonné mon parcours.<br><br>'
		},
		projects: {
			title: 'Quelques projets'
		},
		skills: {
			title: 'Compétences :'
		},
		experience: {
			title: 'Expériences professionnelles :'
		},
		contact: {
			title: 'Contacts : '
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
