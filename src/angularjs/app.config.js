appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function appConfig($urlRouterProvider) {
	// $locationProvider.html5Mode({ enabled: true });
	$urlRouterProvider.otherwise('/');
}
