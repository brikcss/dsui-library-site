import angular from 'angular';
import tabsDirective from './tabs.directive.js';

export default angular.module('brikcss.tabs', []).directive('tabs', tabsDirective).name;
