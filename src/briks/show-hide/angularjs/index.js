import angular from 'angular';
import showHideService from './show-hide.service.js';
import showHideDirective from './show-hide.directive.js';
import showHideToggleDirective from './show-hide-toggle.directive.js';

export default angular
	.module('brikcss.show-hide', [])
	.service('showHideService', showHideService)
	.directive('showHide', showHideDirective)
	.directive('showHideToggle', showHideToggleDirective).name;
