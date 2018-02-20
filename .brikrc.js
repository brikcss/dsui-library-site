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
					// Abstract code.
					'./src/briks/rhythm/_rhythm.abstract.scss',
					'./src/briks/font/_font.abstract.scss',
					'./src/briks/footer/_footer.abstract.scss',
					'./src/briks/header/_header.abstract.scss',
					'./src/briks/elevation/_elevation.abstract.scss',
					'./src/briks/sidebars/_sidebars.abstract.scss',
					'./src/briks/show-hide/_show-hide.abstract.scss',
					'./src/briks/burger-button/_burger-button.abstract.scss',
					// CSS producing code.
					'./src/briks/reset/reset.scss',
					'./src/briks/**/*.init.scss',
					// Site specific code.
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
