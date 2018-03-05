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
					// Core component abstracts.
					'./src/briks/rhythm/_rhythm.abstract.scss',
					'./src/briks/colors/_colors.abstract.scss',
					'./src/briks/typography/_typography.abstract.scss',
					// None-core component abstracts.
					'./src/briks/**/*.abstract.scss',
					// Core components init.
					'./src/briks/reset/_reset.init.scss',
					'./src/briks/typography/_typography.init.scss',
					// Other components init.
					'./src/briks/**/*.init.scss',
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
