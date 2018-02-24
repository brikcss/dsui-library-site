import editorTpl from './editor.tpl.html';
import highlightjs from 'highlight.js';

function codeEditor() {
	return {
		restrict: 'E',
		scope: {
			editable: '@',
			livePreview: '@',
			lang: '@',
		},
		transclude: true,
		template: editorTpl,
		link: ($scope, $element) => {
			const previewEl = $element[0].querySelector('.editor__preview');
			const codeParentEl = $element[0].querySelector('.editor__code');
			let throttleEditorUpdate;
			let ticking = false;

			// Create array of tabs from comma-separated $scope.lang string.
			$scope.tabs = $scope.lang.split(',');
			$scope.tabEls = {};
			$scope.activateTab = activateTab;

			// Create editor DOM and initialize highlightjs on each tab.
			$element.addClass('editor');
			if (!$scope.editable) {
				$element.addClass('editor--read-only');
			}
			$scope.tabs.forEach((tab, i) => {
				// Create the tab's DOM.
				const highlightEl = codeParentEl.children[i];
				const wrapEl = document.createElement('div');
				const originalCode = highlightEl.innerHTML;
				codeParentEl.insertBefore(wrapEl, codeParentEl.firstChild);
				wrapEl.appendChild(highlightEl);
				wrapEl.classList.add('editor__code-tab');
				wrapEl.setAttribute('data-tab', tab);
				highlightEl.classList.add('hljs', 'editor__highlighted-code');
				highlightEl.innerHTML =
					'<code class="editor__highlighted-code--' + tab + '">' + originalCode + '</code>';
				// Make code editable if it's not read only.
				if ($scope.editable) {
					const rawPreEl = document.createElement('pre');
					const rawCodeEl = document.createElement('code');
					rawPreEl.classList.add('hljs', 'editor__raw-code');
					rawCodeEl.classList.add('editor__raw-code--' + tab);
					rawCodeEl.innerHTML = originalCode;
					rawCodeEl.setAttribute('contenteditable', true);
					rawPreEl.appendChild(rawCodeEl);
					wrapEl.appendChild(rawPreEl);
					wrapEl.addEventListener('input', updateEditor);
					rawPreEl.addEventListener('scroll', handleScroll);
				} else {
					wrapEl.addEventListener('click', selectAllText);
					wrapEl.style.cursor = 'pointer';
				}
			});

			// Activate tab.
			activateTab($scope.tabs[0]);

			// Update editor with highlighting and live preview.
			updateEditor();
			if (!$scope.livePreview) {
				previewEl.style.display = 'none';
			}

			// Destroy when scope is destroyed.
			$scope.$on('$destroy', () => {
				$scope.tabs.forEach((tab, i) => {
					codeParentEl.children[i].removeEventListener('input', updateEditor);
					codeParentEl.children[i]
						.querySelector('.editor__raw-code')
						.removeEventListener('scroll', handleScroll);
					codeParentEl.children[i].removeEventListener('click', selectAllText);
				});
			});

			/**
			 *  Update live preview.
			 */
			function updateEditor() {
				if (!throttleEditorUpdate) {
					let html = '';
					let script;
					$scope.tabs.forEach((tab) => {
						let code = '';
						let codeEl = codeParentEl.querySelector('.editor__raw-code--' + tab);
						if (!codeEl) {
							codeEl = codeParentEl.querySelector('.editor__highlighted-code--' + tab);
						}
						codeEl.childNodes.forEach((node) => {
							code += node.nodeValue;
						});
						// Highlight code.
						codeParentEl.querySelector(
							'.editor__highlighted-code--' + tab
						).innerHTML = highlightjs.highlight(tab, code).value;
						// Update HTML content.
						if ($scope.livePreview) {
							if (tab === 'css') {
								html += '<style>' + code + '</style>';
							} else if (tab === 'html') {
								html += code;
							}
							if (tab === 'js') {
								script = document.createElement('script');
								try {
									script.appendChild(document.createTextNode(code));
								} catch (e) {
									script.text = code;
								}
							}
						}
					});
					if ($scope.livePreview) {
						previewEl.innerHTML = html;
						if (script) {
							previewEl.appendChild(script);
						}
					}
					throttleEditorUpdate = true;
					setTimeout(() => {
						throttleEditorUpdate = false;
					}, 50);
				}
			}

			/**
			 *  Handle scroll event to keep `pre` tags for editor and highlighter in sync.
			 *
			 *  @param   {object}  event  Scroll event.
			 */
			function handleScroll(event) {
				const codeWrapEl = event.target;

				if (!ticking) {
					window.requestAnimationFrame(function() {
						codeWrapEl.previousSibling.scrollLeft = codeWrapEl.scrollLeft;
						codeWrapEl.previousSibling.scrollTop = codeWrapEl.scrollTop;
						ticking = false;
					});
					ticking = true;
				}
			}

			/**
			 *  Activate a tab.
			 *
			 *  @param   {string}  tab  Tab to activate.
			 */
			function activateTab(tab) {
				$scope.activeTab = tab;
				Array.from(codeParentEl.children).forEach((el) => {
					el.classList.remove('editor__code-tab--active');
					if (el.getAttribute('data-tab') === tab) {
						el.classList.add('editor__code-tab--active');
					}
				});
			}

			/**
			 *  Select all text in an editor.
			 *
			 *  @param   {object}  event  Click event.
			 */
			function selectAllText(event) {
				if (document.selection) {
					const range = document.body.createTextRange();
					range.moveToElementText(event.target);
					range.select();
				} else if (window.getSelection) {
					const range = document.createRange();
					range.selectNode(event.target);
					window.getSelection().removeAllRanges();
					window.getSelection().addRange(range);
				}
			}
		},
	};
}

export default codeEditor;
