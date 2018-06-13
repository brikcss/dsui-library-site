import markdownit from 'markdown-it';
import ejs from 'ejs';
import merge from '@brikcss/merge';
import yaml from 'gray-matter';
import prism from 'prismjs';
import { createFilter } from 'rollup-pluginutils';

function string(options = {}) {
	// Create rollup filter.
	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
	// Set default and required options.
	options = merge(
		{
			markdownit: {
				langPrefix: 'language-',
				prefix: '<pre class="{{lang}}"><code>',
				suffix: '</code></pre>',
				content: '<div class="markdown">{{content}}</div>',
				html: true,
				xhtmlOut: true,
				breaks: false,
				linkify: true,
				typographer: true
			},
			ejs: {
				cache: false,
				_with: false,
				localsName: 'page'
			}
		},
		options,
		{
			ejs: {
				client: false,
				rmWhitespace: false,
				escape: false
			}
		}
	);

	// Create markdown-it instance.
	const md = markdownit(options.markdownit);
	// options.plugins = options.plugins || {};

	// Call init() callback for markdown-it.
	if (typeof options.markdownit.init === 'function') {
		options.markdownit.init(md);
	}

	// Update markdown-it renderer rules.
	if (options.markdownit.rules instanceof Array) {
		options.markdownit.rules.forEach((rule) => {
			md.renderer.rules[rule.name] = rule.fn;
		});
	}

	return {
		name: 'md',
		transform: function transform(code, id) {
			if (filter(id)) {
				// Set filename for ejs includes.
				options.ejs.filename = id;

				// Grab yaml and separate from content.
				code = yaml(code);

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

				// Render EJS.
				code.content = ejs.render(code.content, code.data, options.ejs);

				// Render markdown to html/ejs.
				code.content = md.render(code.content);

				// Implement content template.
				if (options.markdownit.content) {
					code.content = options.markdownit.content.replace('{{content}}', code.content);
				}

				// Return object for rollup.
				return {
					code: `export default ${JSON.stringify(`${code.content}`)};`,
					map: { mappings: '' }
				};
			}
		}
	};
}

export default string;
