function showHideDirective(showHideService, $parse) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attributes) {
			// Get options, if any exist.
			let options = {};
			if ($attributes.showHide[0] === '{') {
				options = $parse('(' + $attributes.showHide + ')')($scope);
			} else if (typeof $attributes.showHide === 'string') {
				options = { id: $attributes.showHide };
			}

			// Create the show-hide element.
			showHideService.init(options.id, $element[0], options);
		},
	};
}

showHideDirective.$inject = ['showHideService', '$parse'];

export default showHideDirective;
