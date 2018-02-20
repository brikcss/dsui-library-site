function showHideToggleDirective(showHideService) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attributes) {
			$element[0].addEventListener('click', toggle);

			$scope.$on('$destroy', function() {
				$element[0].removeEventListener('click', toggle);
			});

			function toggle() {
				return showHideService.toggle($attributes.showHideToggle);
			}
		},
	};
}

export default showHideToggleDirective;
