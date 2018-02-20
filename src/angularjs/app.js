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

angular
	.module('dsui', [uiRouter, sidebars, showHide])
	.config(appConfig)
	.controller('appCtrl', appController);
