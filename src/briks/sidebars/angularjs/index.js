import angular from 'angular';
import sidebarsService from './sidebars.service.js';
import sidebarsInitDirective from './sidebar-init.directive.js';

export default angular
	.module('brikcss.sidebars', [])
	.service('sidebarsService', sidebarsService)
	.directive('sidebars', sidebarsInitDirective).name;
