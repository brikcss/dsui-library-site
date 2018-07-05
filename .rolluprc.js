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
// import markdownit from 'markdown-it';
import md from './lib/rollup-plugin-md';
import replace from 'rollup-plugin-replace';
// import mdplus from './lib/rollup-plugin-mdplus';
import mdAttrs from 'markdown-it-attrs';
import mdContainer from 'markdown-it-container';
import mdTasks from 'markdown-it-task-lists';
import mdInclude from 'markdown-it-include';
// import mdMark from 'markdown-it-mark';
// import mdSpan from 'markdown-it-span';
// import mdHighlightLines from 'markdown-it-highlight-lines';
// import mdElement from 'markdown-it-custom-block';
import templateLiteral from './lib/rollup-plugin-template-literal';
// import css from 'modular-css-rollup';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssApply from 'postcss-apply';
import postcssPx2Rem from 'postcss-pxtorem';
const postcssConfig = require('./.postcssrc.js');
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
			input: 'src/app.js',
			output: {
				file: 'dist/js/app.js',
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
			input: 'src/app.js',
			output: {
				file: 'dist/js/app-legacy.js',
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
				replace: {
					// @NOTE: This is required to transpile jss from its source.
					'process.env.NODE_ENV': process.env.NODE_ENV
				},
				md: {
					include: '**/*.md',
					markdownit: {
						langPrefix: '',
						rules: [
							{
								name: 'fence',
								fn(tokens, idx, options, env, self) {
									var token = tokens[idx];

									return `<brik-code lang="${
										token.info.trim().split(/\s+/g)[0]
									}" ${self.renderAttrs(token)}>${tokens[idx].content.replace(
										/</g,
										'&lt;'
									)}</brik-code>`;
								}
							}
						],
						init(md) {
							return md
								.use(mdInclude, 'src')
								.use(mdContainer, 'any', {
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
								})
								.use(mdTasks)
								.use(mdAttrs);
						}
					}
				},
				// mdplus: {
				// 	include: ['**/*.mdp'],
				// 	markdownit: {
				// 		langPrefix: '',
				// 		rules: [
				// 			{
				// 				name: 'fence',
				// 				fn(tokens, idx, options, env, self) {
				// 					var token = tokens[idx];

				// 					return `<brik-code lang="${
				// 						token.info.trim().split(/\s+/g)[0]
				// 					}" ${self.renderAttrs(token)}>${tokens[idx].content.replace(
				// 						/</g,
				// 						'&lt;'
				// 					)}</brik-code>`;
				// 				}
				// 			}
				// 		],
				// 		init(md) {
				// 			return (
				// 				md
				// 					.use(mdInclude, 'src')
				// 					// .use(mdContainer, 'tabs', {
				// 					// 	validate(name) {
				// 					// 		return name.trim().match(/^tabs\s(.*)$/);
				// 					// 	},
				// 					// 	render(tokens, idx) {
				// 					// 		const tags = [];
				// 					// 		if (tokens[idx].nesting === 1) {
				// 					// 			const info = tokens[idx].info.trim();
				// 					// 			const attrs = info.match(/\(.*\)/)
				// 					// 				? info.match(/\(.*\)/)[0]
				// 					// 				: null;
				// 					// 			const tag = info.split('(')[0];
				// 					// 			tags.push(tag);
				// 					// 			return (
				// 					// 				'<' +
				// 					// 				tag +
				// 					// 				(attrs
				// 					// 					? ' ' + attrs.slice(1, attrs.length - 1)
				// 					// 					: '') +
				// 					// 				'>\n'
				// 					// 			);
				// 					// 		} else {
				// 					// 			const html = '</' + tags[tags.length - 1] + '>\n';
				// 					// 			tags.pop();
				// 					// 			return html;
				// 					// 		}
				// 					// 	}
				// 					// })
				// 					.use(mdTasks)
				// 					.use(mdAttrs)
				// 					.use(mdContainer, 'any', {
				// 						validate(name) {
				// 							return name.trim().match(/([a-z|-])+(\s+)?(.*)$/);
				// 						},
				// 						render(tokens, idx) {
				// 							const token = tokens[idx];
				// 							const tag = token.info.trim();
				// 							if (token.nesting === 1) {
				// 								const attrs = (tokens[idx].attrs || []).map(
				// 									(attr) => attr[0] + '="' + attr[1] + '"'
				// 								);
				// 								return `<${tag}${
				// 									attrs.length ? ' ' + attrs.join(' ') : ''
				// 								}>\n`;
				// 							} else {
				// 								return `</${tag}>`;
				// 							}
				// 						}
				// 					})
				// 			);
				// 		}
				// 	}
				// },
				string: {
					include: ['**/*.tpl.html']
				},
				postcss: {
					extensions: ['.css'],
					inject: false,
					config: false,
					plugins: [
						postcssImport(postcssConfig['postcss-import']),
						postcssApply(postcssConfig['postcss-apply']),
						postcssPx2Rem(postcssConfig['postcss-pxtorem']),
						autoprefixer(postcssConfig['autoprefixer'])
					]
				},
				css: {},
				templateLiteral: {
					include: '**/*.tplit.html'
				},
				ejs: {
					include: ['**/*.ejs*'],
					options: { cache: false, client: false, _with: false, localsName: 'data' }
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
		commonjs(options.commonjs),
		replace(options.replace),
		md(options.md),
		// mdplus(options.mdplus),
		postcss(options.postcss),
		// css(options.css),
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
