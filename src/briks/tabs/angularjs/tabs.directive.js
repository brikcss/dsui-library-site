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
			const tabNames = Object.keys(tabs);
			$scope.activateTab = activateTab;
			$scope.tabs = [];

			tabNames.forEach((tab) => {
				$scope.tabs.push({ id: tab, label: tabs[tab] });
			});

			if (!$attributes.activeTab || !$scope.activeTab) {
				$scope.activeTab = $scope.tabs[0].id;
			}

			if ($scope.tabs.length) {
				activateTab($scope.activeTab);
			}

			function activateTab(tab) {
				tab = tab || $scope.tabs[0].id;
				const activeTabName = typeof tab === 'string' ? tab : tab.id;
				const activeContentEl = $element[0].querySelector('.tabs__content--active');
				$scope.activeTab = activeTabName;
				$scope.activeTabLocal = activeTabName;
				if (activeContentEl) {
					$element[0]
						.querySelector('.tabs__content--active')
						.classList.remove('tabs__content--active');
				}
				$element[0].children[1].children[tabNames.indexOf(activeTabName)].classList.add(
					'tabs__content--active'
				);
			}
		},
	};
}

tabsDirective.$inject = ['$parse'];

export default tabsDirective;
