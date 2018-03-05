import tabsTpl from './tabs.tpl.html';

function tabsDirective($parse) {
	return {
		restrict: 'E',
		transclude: true,
		template: tabsTpl,
		scope: {
			activeTab: '=?',
		},
		link: function($scope, $element, $attributes) {
			const tabs = $parse($attributes.tabs)($scope);
			$scope.activateTab = activateTab;
			$scope.tabs = [];

			Object.keys(tabs).forEach((tab) => {
				$scope.tabs.push({ name: tab, label: tabs[tab] });
			});

			if (!$attributes.activeTab || !$scope.activeTab) {
				$scope.activeTab = $scope.tabs[0].name;
			}

			activateTab($scope.activeTab);

			function activateTab(tab) {
				const activeTabName = typeof tab === 'string' ? tab : tab.name;
				$scope.activeTab = activeTabName;
				$scope.activeTabLocal = activeTabName;
			}
		},
	};
}

tabsDirective.$inject = ['$parse'];

export default tabsDirective;
