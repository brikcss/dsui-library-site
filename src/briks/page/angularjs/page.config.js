const pages = {
	home: require('../../../pages/home.tpl.html'),
	'getting-started': require('../../../pages/getting-started.tpl.html'),
	core: {
		reset: require('../../../pages/reset.tpl.html'),
		'vertical-rhythm': require('../../../pages/vertical-rhythm.tpl.html'),
		typography: require('../../../pages/typography.tpl.html'),
		colors: '',
		spacing: '',
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
		template =
			template ||
			`<h2 class="font__headline">${name.replace(/(?:^|\s)\S/g, function(a) {
				return a.toUpperCase();
			})}</h2><p class="font__subheading">We are working on documentation and examples. Come back soon!</p>`;
		$stateProvider.state(name, {
			url,
			views: {
				content: {
					template: template,
					controller: 'pageCtrl as page',
				},
			},
		});
	}
}

export default pageConfig;
