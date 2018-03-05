/** ------------------------------------------------------------------------------------------------
 *  app.js
 *  ------
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Main entry for DS UI's AngularJS site.
 ** --------------------------------------------------------------------------------------------- */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidebars from '../briks/sidebars/angularjs/index.js';
import showHide from '../briks/show-hide/angularjs/index.js';
import appConfig from './app.config.js';
import appController from './app.controller.js';
import pages from '../briks/page/angularjs/index.js';
import codeEditor from '../briks/code-editor/angularjs/index.js';
import tabs from '../briks/tabs/angularjs/index.js';

angular
	.module('dsui', [uiRouter, pages, sidebars, showHide, codeEditor, tabs])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		($rootScope, $state, $stateParams) => {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		},
	])
	.config(appConfig)
	.controller('appCtrl', appController);
