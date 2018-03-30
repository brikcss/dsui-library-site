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
			string({
				include: '**/*.tpl.html'
			}),
			ejs({
				include: ['**/*.ejs*'],
				compilerOptions: { client: true, _with: false, localsName: 'data' }
			}),
			babel({
				exclude: 'node_modules/**',
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
