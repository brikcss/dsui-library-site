/** ------------------------------------------------------------------------------------------------
 *  @filename  .rolluprc.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Configuration for rollupjs bundles.
 ** --------------------------------------------------------------------------------------------- */

// -------------------
// Set up environment.
//
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';
import babel from 'rollup-plugin-babel';
import ejs from './lib/rollup-plugin-ejs';
import md from './lib/rollup-plugin-md';
import mdAttrs from 'markdown-it-attrs';
import mdContainer from 'markdown-it-container';
import mdTasks from 'markdown-it-task-lists';
import mdInclude from 'markdown-it-include';
import prettier from 'rollup-plugin-prettier';
const prettierConfig = require('./.prettierrc.js');
import uglify from 'rollup-plugin-uglify';

// Flags.
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

// -----------------------
// Build config variatons.
//

// Set base options.
const base = {
	input: 'src/angularjs/app.js',
	watch: {
		chokidar: true,
		include: 'src/**',
		exclude: 'node_modules/**',
		clearScreen: false
	}
};

// Build configs to be merged (later) with base.
let configs = [
	{
		output: {
			file: 'dist/angularjs/js/app.js',
			format: 'iife'
		},
		plugins: [
			resolve(),
			commonjs(),
			md({
				include: '**/*.md',
				markdownit: {
					init(md) {
						return md
							.use(mdInclude, 'src')
							.use(mdTasks)
							.use(mdAttrs)
							.use(mdContainer, 'tag', {
								validate(name) {
									return name.trim().match(/([a-z]+)?\(.*\)/);
								},
								render(tokens, idx) {
									const tags = [];
									if (tokens[idx].nesting === 1) {
										var info = tokens[idx].info.trim();
										var attrs = info.match(/\(.*\)/)
											? info.match(/\(.*\)/)[0]
											: null;
										var tag = info.split('(')[0];
										tags.push(tag);
										return (
											'<' +
											tag +
											(attrs ? ' ' + attrs.slice(1, attrs.length - 1) : '') +
											'>\n'
										);
									} else {
										var html = '</' + tags[tags.length - 1] + '>\n';
										tags.pop();
										return html;
									}
								}
							});
					}
				}
			}),
			string({
				include: '**/*.tpl.html'
			}),
			ejs({
				include: ['**/*.ejs*'],
				compilerOptions: { client: true, _with: false, localsName: 'data' }
			}),
			babel({
				include: '**/*.js',
				exclude: ['node_modules/**'],
				presets: [
					[
						'env',
						{
							targets: {
								node: '8',
								browsers: ['last 2 versions', '> 2%']
							},
							modules: false
						}
					]
				]
			}),
			isProd && prettier(prettierConfig)
		]
	}
];

// Add configs with minified files on production build.
if (isProd) {
	const prodConfigs = [];
	configs.forEach((config) => {
		// Clone original config.
		let newConfig = JSON.parse(JSON.stringify(config));
		// Clone original plugins (they can't be cloned with above method).
		newConfig.plugins = config.plugins.slice(0);
		// Remove prettier.
		if (newConfig.plugins[newConfig.plugins.length - 1].name === 'rollup-plugin-prettier') {
			newConfig.plugins.splice(-1, 1);
		}
		// Add minifier and add `.min` to file name.
		newConfig.plugins.push(uglify());
		newConfig.output.forEach((output, i) => {
			newConfig.output[i].file = newConfig.output[i].file.replace('.js', '.min.js');
		});
		// Add minified config.
		prodConfigs.push(newConfig);
	});
	configs = configs.concat(prodConfigs);
}

// Merge each config with base config.
configs = configs.map((config) => {
	return Object.assign({}, base, config);
});

// ---------------
// Export configs.
//
export default configs;
