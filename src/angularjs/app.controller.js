function appController(sidebarsService, $scope) {
	var ctrl = this;
	ctrl.sidebars = sidebarsService;
	ctrl.showRhythmGrid = false;

	$scope.$on('$locationChangeStart', () => {
		// Close sidebars when route changes.
		if (ctrl.sidebars.left.active) {
			ctrl.sidebars.close('left');
		}
		if (ctrl.sidebars.right.active) {
			ctrl.sidebars.close('right');
		}
	});
}

appController.$inject = ['sidebarsService', '$scope'];

export default appController;
