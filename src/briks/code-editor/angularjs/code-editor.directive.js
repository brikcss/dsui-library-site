import editorTpl from './editor.tpl.html';
import highlightjs from 'highlight.js';

function codeEditor($compile) {
	return {
		restrict: 'E',
		scope: {
			editable: '@',
			livePreview: '@',
			lang: '@'
		},
		transclude: true,
		template: editorTpl,
		link: ($scope, $element) => {
			const previewEl = $element[0].querySelector('.editor__preview');
			const codeParentEl = $element[0].querySelector('.editor__code');
			let throttleEditorUpdate;
			let ticking = false;

			// Create array of tabs from comma-separated $scope.lang string.
			$scope.tabs = [];
			$scope.tabEls = {};
			$scope.activateTab = activateTab;

			// Create editor DOM and initialize highlightjs on each tab.
			$element.addClass('editor');
			if (!$scope.editable) {
				$element.addClass('editor--read-only');
			}
			$scope.lang.split(',').forEach((tab, i) => {
				// Create the tab's DOM.
				const highlightEl = codeParentEl.children[i];
				const wrapEl = document.createElement('div');
				const originalCode = highlightEl.innerHTML;
				if (tab.indexOf(':') > -1) {
					tab = tab.split(':');
					tab.label = tab[1];
					tab.name = tab[0];
				} else {
					tab = { name: tab, label: tab };
				}
				$scope.tabs.push(tab);
				codeParentEl.insertBefore(wrapEl, codeParentEl.firstChild);
				wrapEl.appendChild(highlightEl);
				wrapEl.classList.add('editor__code-tab');
				wrapEl.setAttribute('data-tab', tab.name);
				highlightEl.classList.add('hljs', 'editor__highlighted-code');
				highlightEl.innerHTML =
					'<code class="editor__highlighted-code--' +
					tab.name +
					'">' +
					originalCode +
					'</code>';
				// Make code editable if it's not read only.
				if ($scope.editable) {
					const rawPreEl = document.createElement('pre');
					const rawCodeEl = document.createElement('code');
					rawPreEl.classList.add('hljs', 'editor__raw-code');
					rawCodeEl.classList.add('editor__raw-code--' + tab.name);
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
					if ($scope.editable) {
						codeParentEl.children[i].removeEventListener('input', updateEditor);
						codeParentEl.children[i]
							.querySelector('.editor__raw-code')
							.removeEventListener('scroll', handleScroll);
					} else {
						codeParentEl.children[i].removeEventListener('click', selectAllText);
					}
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
						let codeEl = codeParentEl.querySelector('.editor__raw-code--' + tab.name);
						if (!codeEl) {
							codeEl = codeParentEl.querySelector(
								'.editor__highlighted-code--' + tab.name
							);
						}
						codeEl.childNodes.forEach((node) => {
							code += node.nodeValue;
						});
						// Highlight code.
						codeParentEl.querySelector(
							'.editor__highlighted-code--' + tab.name
						).innerHTML = highlightjs.highlight(tab.name, code).value;
						// Update HTML content.
						if ($scope.livePreview) {
							// Create new content.
							if (tab.name === 'css') {
								html += '<style>' + code + '</style>';
							} else if (tab.name === 'html') {
								html += code;
							}
							if (tab.name === 'js') {
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
						// Remove old content.
						previewEl.innerHTML = '';
						// previewEl.innerHTML = html;
						// Add new content.
						previewEl.appendChild($compile(html)($scope)[0]);
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
					if (el.getAttribute('data-tab') === tab.name) {
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
		}
	};
}

codeEditor.$inject = ['$compile'];

export default codeEditor;
