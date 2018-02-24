import angular from 'angular';
import codeEditorDirective from './code-editor.directive.js';
import codeHighlightDirective from './code-highlighter.directive.js';

export default angular
	.module('brikcss.editor', [])
	.directive('highlight', codeHighlightDirective)
	.directive('editor', codeEditorDirective).name;
