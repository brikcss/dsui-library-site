import angular from 'angular';
import pageConfig from './page.config.js';
import pageController from './page.controller.js';

export default angular
	.module('dsui.pages', [])
	.config(pageConfig)
	.controller('pageCtrl', pageController).name;
