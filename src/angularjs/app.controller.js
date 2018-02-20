function appController($scope, sidebarsService) {
	var ctrl = this;
	ctrl.sidebars = sidebarsService;
	ctrl.showVerticalGrid = false;
}

appController.$inject = ['$scope', 'sidebarsService'];

export default appController;
