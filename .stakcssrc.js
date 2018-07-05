/** ================================================================================================
 *  Setup.
 ** ------ */

const env = process.env.NODE_ENV;
const isProd = ['production', 'prod', 'test'].includes(env);
const postcssConfig = require('./.postcssrc.js');
const loadPostcssPlugins = (...plugins) => {
	return plugins.map((plugin) => {
		return require(plugin)(postcssConfig[plugin]);
	});
};
const basePostcssPlugins = [
	'postcss-import',
	'postcss-mixins',
	'postcss-font-magician',
	'postcss-apply',
	'postcss-preset-env',
	'postcss-pxtorem',
	'autoprefixer',
	isProd ? 'postcss-csso' : 'postcss-reporter'
];

/** ================================================================================================
 *  Config export object.
 ** --------------------- */

const config = {
	html: {
		source: 'src/*.html',
		output: 'dist/[name].html',
		bundlers: ['@brikcss/stakcss-bundler-ejs'],
		watchPaths: './src/briks/**/*.ejs.html'
	},
	css: {
		source: 'src/app.css',
		output: './dist/css/app.css',
		bundlers: [
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: { skipConfig: true, map: false },
				plugins: loadPostcssPlugins(...basePostcssPlugins)
			}
		]
	},
	assets: {
		source: 'static/**/*',
		output: 'dist/assets/',
		root: 'static',
		bundlers: ['@brikcss/stakcss-bundler-copy']
	},
	svg: {
		source: './node_modules/@mdi/svg/svg/**',
		output: 'dist/svg/',
		root: 'node_modules/@mdi/svg/svg',
		bundlers: [
			{
				run: './lib/stakcss-bundler-svg.js',
				options: { plugins: [{ removeViewBox: false }, { removeDimensions: true }] }
			}
		]
	}
};

module.exports = config;
