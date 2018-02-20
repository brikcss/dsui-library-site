function createSidebars(sidebarsService) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attributes) {
			sidebarsService.create($attributes.sidebars, $element[0]);
		},
	};
}

export default createSidebars;
