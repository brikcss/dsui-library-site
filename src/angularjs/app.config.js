appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function appConfig($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: false });
	// $urlRouterProvider.otherwise('/');
}
