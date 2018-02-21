function appController(sidebarsService) {
	var ctrl = this;
	ctrl.sidebars = sidebarsService;
	ctrl.showVerticalGrid = false;
}

appController.$inject = ['sidebarsService'];

export default appController;
