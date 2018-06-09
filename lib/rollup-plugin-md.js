import markdownit from 'markdown-it';
import prism from 'prismjs';
import { createFilter } from 'rollup-pluginutils';

function string(options = {}) {
	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
	const md = markdownit(options.markdownit);
	options.markdownit = Object.assign(
		{
			langPrefix: 'language-',
			prefix: '<pre class="{{lang}}"><code>',
			suffix: '</code></pre>',
			html: true,
			xhtmlOut: true,
			breaks: false,
			linkify: true,
			typographer: true
		},
		options.markdownit
	);
	options.plugins = options.plugins || {};

	// Call init() callback.
	if (typeof options.markdownit.init === 'function') {
		options.markdownit.init(md);
	}

	// Update renderer rules.
	if (options.markdownit.rules instanceof Array) {
		options.markdownit.rules.forEach((rule) => {
			md.renderer.rules[rule.name] = rule.fn;
		});
	}

	return {
		name: 'md',
		transform: function transform(code, id) {
			if (filter(id)) {
				// Add code highlighting.
				if (
					options.markdownit.highlight === true &&
					options.markdownit.langPrefix !== 'language-'
				) {
					options.markdownit.highlight = (str, lang) => {
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
								options.markdownit.prefix.replace(/\{\{lang\}\}/g, lang) +
								prism.highlight(str, prism.languages[lang]) +
								// md.utils.escapeHtml(str) +
								options.markdownit.suffix
							);
						} catch (error) {
							// eslint-disable-next-line no-console
							console.log(error);
						}

						return (
							options.markdownit.prefix +
							md.utils.escapeHtml(str) +
							options.markdownit.suffix
						);
					};
				}

				// Render to HTML.
				code = md.render(code);

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
