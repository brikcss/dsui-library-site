/** ------------------------------------------------------------------------------------------------
 *  @filename  .rolluprc.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Configuration for rollupjs bundles.
 ** --------------------------------------------------------------------------------------------- */

// -------------------
// Set up environment.
//
import merge from '@brikcss/merge';
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
import templateLiteral from './lib/rollup-plugin-template-literal';
// import prettier from 'rollup-plugin-prettier';
// const prettierConfig = require('./.prettierrc.js');
import uglify from 'rollup-plugin-uglify';

// Flags.
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

// -----------------------
// Build config variatons.
//

// Build configs to be merged (later) with base.
let configs = [
	createConfig(
		{
			input: 'src/vanillajs/app.js',
			output: {
				file: 'dist/vanillajs/js/app.js',
				format: 'iife'
			}
		},
		{
			babel: {
				presets: [
					[
						'env',
						{
							targets: {
								browsers: [
									'Chrome >= 60',
									'Safari >= 10.1',
									'iOS >= 10.3',
									'Firefox >= 54',
									'Edge >= 15'
								]
							},
							modules: false
						}
					]
				],
				plugins: ['external-helpers']
			}
		}
	),
	createConfig(
		{
			input: 'src/angularjs/app.js',
			output: {
				file: 'dist/angularjs/js/app.js',
				format: 'iife'
			}
		},
		{
			babel: {
				presets: [
					[
						'env',
						{
							targets: {
								browsers: [
									'Chrome >= 60',
									'Safari >= 10.1',
									'iOS >= 10.3',
									'Firefox >= 54',
									'Edge >= 15'
								]
							},
							modules: false
						}
					]
				],
				plugins: ['external-helpers']
			}
		}
	)
];

// Add production configs when isProd.
if (isProd) {
	configs = configs.concat(
		createConfig({
			input: 'src/vanillajs/app.js',
			output: {
				file: 'dist/vanillajs/js/app-legacy.js',
				format: 'iife'
			}
		}),
		createConfig({
			input: 'src/angularjs/app.js',
			output: {
				file: 'dist/angularjs/js/app-legacy.js',
				format: 'iife'
			}
		})
	);
	configs.forEach((config) => {
		configs.push(createConfig(merge({}, config), { env: 'production' }));
	});
}

/**
 *  Create a new config.
 *
 *  @param   {Object}  config  Base configuration.
 *  @param   {Object}  options  Options.
 *  @return  {Object}  Config object.
 */
function createConfig(config = {}, options = {}) {
	// Default options.
	options = merge(
		[
			{
				env: 'development',
				commonjs: true,
				md: {
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
												(attrs
													? ' ' + attrs.slice(1, attrs.length - 1)
													: '') +
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
				},
				string: {
					include: ['**/*.tpl.html', '**/*.css']
				},
				templateLiteral: {
					include: '**/*.tplit.html'
				},
				ejs: {
					include: ['**/*.ejs*'],
					compilerOptions: { client: true, _with: false, localsName: 'data' }
				},
				babel: {
					include: '**/*.js',
					exclude: ['node_modules/**'],
					presets: [
						[
							'env',
							{
								targets: {
									browsers: ['last 2 versions', '> 2%']
								},
								useBuiltIns: true,
								modules: false
							}
						]
					],
					plugins: ['external-helpers']
				}
			},
			options
		],
		{ arrayStrategy: 'overwrite' }
	);

	// Build base config.
	config = merge(
		{
			moduleContext: (id) => {
				if (id.indexOf('.tplit.html') > -1) {
					return 'context';
				}
			},
			watch: {
				chokidar: true,
				exclude: 'node_modules/**',
				clearScreen: false
			}
		},
		config
	);

	// Build plugins.
	config.plugins = [
		resolve(),
		commonjs(),
		md(options.md),
		templateLiteral(options.templateLiteral),
		string(options.string),
		ejs(options.ejs),
		babel(options.babel)
	];
	if (options.env === 'production') {
		config.plugins = config.plugins.concat(uglify(options.uglify));
	}

	return config;
}

// ---------------
// Export configs.
//
export default configs;
