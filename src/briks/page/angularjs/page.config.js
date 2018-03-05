const pages = {
	Home: require('../../../pages/home.tpl.html'),
	'Getting Started': require('../../../pages/getting-started.tpl.html'),
	core: {
		'Browser Reset': {
			tpl: require('../../../pages/reset.tpl.html'),
			data: {
				version: '0.0.1',
			},
		},
		'Vertical Rhythm': {
			tpl: require('../../../pages/vertical-rhythm.tpl.html'),
			data: {
				version: '0.0.1',
			},
		},
		Typography: {
			tpl: require('../../../pages/typography.tpl.html'),
			data: {
				version: '0.0.1',
			},
		},
		Colors: {
			tpl: require('ejs-loader!../../../pages/colors.html.ejs')({ version: '0.0.1' }),
			data: {
				version: '0.0.1',
			},
		},
		Spacing: '',
	},
	404: require('../../../pages/404.tpl.html'),
};

pageConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function pageConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/home');
	$urlRouterProvider.when('/', '/home');
	$urlRouterProvider.otherwise('404');

	// Iterate through pages object and create pages.
	Object.keys(pages).forEach((section) => {
		if (typeof pages[section] === 'string') {
			createRoute(section, '/' + section, pages[section]);
		} else if (typeof pages[section] === 'object') {
			Object.keys(pages[section]).forEach((page) => {
				createRoute(page, '/' + [section, page].join('/'), pages[section][page]);
			});
		}
	});

	// Create a route.
	function createRoute(name, url, template) {
		let data = {
			pageTitle: name,
		};
		url = url.replace(/\s+/g, '-').toLowerCase();
		if (typeof template === 'object' && template.data) {
			data = Object.assign(data, template.data);
			template = template.tpl;
		}
		const pageName = name.replace(/\s+/g, '-').toLowerCase();
		const config = {
			url,
			views: {
				content: {
					template: template,
					controller: 'appCtrl as app',
				},
			},
			data,
		};
		template =
			template ||
			`<h2 class="font__headline">${name}</h2><p class="font__subheading">We are working on documentation and examples. Come back soon!</p>`;
		$stateProvider.state(pageName, config);
	}
}

pageConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default pageConfig;
