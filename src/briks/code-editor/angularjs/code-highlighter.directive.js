import highlightJs from 'highlight.js';

function codeHighlighter() {
	return {
		restrict: 'A',
		link: function($scope, $element) {
			highlightJs.highlightBlock($element[0]);
		},
	};
}

export default codeHighlighter;
