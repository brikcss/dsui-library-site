function appController(sidebarsService) {
	var ctrl = this;
	ctrl.sidebars = sidebarsService;
	ctrl.showRhythmGrid = false;
}

appController.$inject = ['sidebarsService'];

export default appController;
