/** ------------------------------------------------------------------------------------------------
 *  .brikcssrc.js
 *  -------------
 *  @author  brikcss  <https://github.com/brikcss>
 *  @homepage  https://github.com/brikcss/dsui-library-site
 *  @description  UI Library site for DirectScale, utilizing BrikCSS UI components.
 ** --------------------------------------------------------------------------------------------- */

module.exports = {
	name: '@brikcss/dsui-library-site',
	bundles: {
		globals: {
			variants: {
				dev: {
					minify: false,
					sourcemap: true,
				},
				prod: {
					run: (bundleName) =>
						process.env.NODE_ENV === 'prod' && bundleName.indexOf('example') === -1,
					minify: true,
					sourcemap: false,
				},
			},
		},
		sass: {
			angularjs: {
				source: [
					// DS UI SASS config (variables).
					'./src/angularjs/config/_config.scss',
					// Core component abstracts.
					'./src/briks/colors/_colors.abstract.scss',
					'./src/briks/{reset,typography,rhythm}/*.abstract.scss',
					// Non-core component abstracts.
					'./src/briks/**/*.abstract.scss',
					// Core components init.
					'./src/angularjs/core/_core.init.scss',
					// Other components init.
					'./src/briks/{core,tabs,header,footer,sidebars,show-hide,burger-button,code-editor}/*.init.scss',
					// Utility classes.
					'./src/briks/rhythm/_rhythm.utilities.scss',
					// Site specific code.
					'./node_modules/highlight.js/styles/atom-one-dark',
					'./src/angularjs/**/*.scss',
				],
				output: './dist/angularjs/css/dsui-angularjs.css',
			},
		},
		js: {
			// 'example-umd': {
			// 	entry: './src/examples/vanilla/example-umd.js',
			// 	output: './examples/vanilla/example-umd.js'
			// },
			// umd: {
			// 	entry: './src/vanilla/spinner.js',
			// 	output: {
			// 		path: './dist/vanilla',
			// 		filename: 'spinner.js',
			// 		library: ['brikcss', 'spinner'],
			// 		libraryTarget: 'umd'
			// 	}
			// },
			angularjs: {
				entry: './src/angularjs/app.js',
				output: './dist/angularjs/js/app.js',
			},
		},
	},
	_boot: {
		extends: ['../brik-component'],
	},
	_briks: {
		'@brikcss/code-lint': {
			css: {
				mode: 'sass',
				exts: ['.scss'],
			},
		},
	},
};
