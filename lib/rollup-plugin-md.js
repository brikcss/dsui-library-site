import markdownit from 'markdown-it';
import prism from 'prismjs';
import { createFilter } from 'rollup-pluginutils';

function string(options = {}) {
	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
	options.markdownit = Object.assign(
		{
			highlightjs: true,
			prefix: '<pre class="hljs"><code class="{{langClass}}">',
			suffix: '</code></pre>',
			html: true,
			xhtmlOut: true,
			breaks: false,
			langPrefix: 'language-',
			linkify: true,
			typographer: true
		},
		options.markdownit
	);
	options.plugins = options.plugins || {};

	return {
		name: 'md',
		transform: function transform(code, id) {
			if (filter(id)) {
				// Add code highlighting.
				if (options.markdownit.highlightjs) {
					options.markdownit.highlight = (str, lang) => {
						const langClass = options.markdownit.langPrefix + lang;
						if (!lang) return;
						if (!prism.languages[lang]) {
							// eslint-disable-next-line no-console
							console.warn(
								`Syntax highlighting for ${lang} not applied because it is not configured in Prism.js.`
							);
							return;
						}
						try {
							return (
								options.markdownit.prefix.replace('{{langClass}}', langClass) +
								prism.highlight(str, prism.languages[lang]) +
								options.markdownit.suffix
							);
						} catch (error) {
							// eslint-disable-next-line no-console
							console.log(error);
						}

						return (
							options.markdownit.prefix +
							mdInstance.utils.escapeHtml(str) +
							options.markdownit.suffix
						);
					};
				}

				// Initialize markdownit and call back.
				let mdInstance = markdownit(options.markdownit);
				if (typeof options.markdownit.init === 'function') {
					options.markdownit.init(mdInstance);
				}

				// Render to HTML.
				code = mdInstance.render(code);

				// Return object for rollup.
				return {
					code:
						'export default ' +
						JSON.stringify(`<div class="markdown">${code}</div>`) +
						';',
					map: { mappings: '' }
				};
			}
		}
	};
}

export default string;

// import markdown from 'markdown-it';
// import hljs from 'highlight.js';
// import { createFilter } from 'rollup-pluginutils';

// export default (options = {}) => {
// 	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
// 	options.markdownit = Object.assign(
// 		{
// 			highlightjs: true,
// 			prefix: '<pre class="hljs"><code class="{{langClass}}">',
// 			suffix: '</code></pre>',
// 			html: true,
// 			xhtmlOut: true,
// 			breaks: false,
// 			langPrefix: 'language-',
// 			linkify: true,
// 			typographer: true,
// 			plugins: {}
// 		},
// 		options.markdownit
// 	);

// 	// Return object for rollup.
// 	return {
// 		name: 'md',
// 		transform(md, tplFilePath) {
// 			if (!filter(tplFilePath)) return null;

// 			// Add code highlighting.
// 			if (options.markdownit.highlightjs) {
// 				options.markdownit.highlight = (str, lang) => {
// 					const langClass = options.markdownit.langPrefix + lang;
// 					if (lang && hljs.getLanguage(lang)) {
// 						try {
// 							return (
// 								options.markdownit.prefix.replace('{{langClass}}', langClass) +
// 								hljs.highlight(lang, str, true).value +
// 								options.markdownit.suffix
// 							);
// 						} catch (error) {
// 							// eslint-disable-next-line no-console
// 							console.log(error);
// 						}

// 						return (
// 							options.markdownit.prefix +
// 							markdown.utils.escapeHtml(str) +
// 							options.markdownit.suffix
// 						);
// 					}
// 				};
// 			}

// 			// Initialize markdown-it.
// 			const mdInstance = markdown(options.markdownit);

// 			// Use plugins.
// 			if (Object.keys(options.plugins).length) {
// 				[Object.keys(options.plugins)].forEach((pluginName) => {
// 					if (typeof options.plugins[pluginName] === 'function') {
// 						options.markdownit[pluginName](mdInstance);
// 					} else {
// 						mdInstance.use(require(pluginName), options.plugins[pluginName]);
// 					}
// 				});
// 			}

// 			// Render to html.
// 			const html = mdInstance.render(md);

// 			return {
// 				code: `export default ${html.toString()};`,
// 				map: { mappings: '' }
// 			};
// 		}
// 	};
// };

// import marked from 'marked';
// import { createFilter } from 'rollup-pluginutils';

// export default (options = {}) => {
// 	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
// 	if (options.marked) {
// 		marked.setOptions(options.marked);
// 	}

// 	return {
// 		name: 'md',
// 		transform(md, tplFilePath) {
// 			if (!/\.md$/.test(tplFilePath)) return null;
// 			if (!filter(tplFilePath)) return null;

// 			const data = marked(md);
// 			return {
// 				code: `export default ${JSON.stringify(
// 					'<div class="md">' + data.toString() + '</div>'
// 				)};`,
// 				map: { mappings: '' }
// 			};
// 		}
// 	};
// };
