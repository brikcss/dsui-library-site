/**
 * .postcssrc.js
 * -------------
 * This file is used in combination with `.stakcssrc.js` (which runs postcss) to generate postcss
 * plugins for multiple postcss configurations.
 * =================================================================================================
 */

const env = process.env.NODE_ENV;
const isProd = ['production', 'test'].includes(env);

module.exports = {
	// Import CSS files for processing.
	'postcss-import': {
		// filter: (filepath) => {},
		// root: process.cwd(),
		path: ['node_modules', 'briks']
		// plugins: [],
		// resolve: (id, baseDir, importOptions) => {},
		// load: (filename, importOptions) => {},
		// skipDuplicates: true,
		// addModulesDirectories: []
	},

	// Create custom css/js mixins.
	'postcss-mixins': {
		mixinsFiles: ['src/mixins/*.js', 'node_modules/@brikcss/*/src/mixins/*.js']
		// mixinsDir: './src/mixins'
	},

	// Manage assets.
	'postcss-assets': {
		basePath: 'src/',
		baseUrl: '/',
		cachebuster: true,
		cache: true,
		loadPaths: [],
		relative: true
	},

	// Rebase, inline, or copy assets. Works with postcss-assets.
	'postcss-url': {},

	// Auto generate @font-face rules.
	'postcss-font-magician': {
		variants: {
			Roboto: {
				'300': ['woff2 woff eot'],
				'400': ['woff2 woff eot'],
				'500': ['woff2 woff eot']
			}
		}, // Download specific variants.
		// 	hosted: [], // Directory(ies) of self-hosted fonts.
		// 	aliases: {}, // Aliases for given fonts.
		// 	formats: 'local woff2 woff eot',
		foundries: 'google'
		// 	custom: {}, // Custom settings.
	},

	// Polyfills css variables/properties.
	'postcss-css-variables': {
		preserve: true
	},

	// Enables custom property sets.
	'postcss-apply': {},

	// Polyfill future css features based on supported browsers.
	'postcss-preset-env': {
		// Determines which css features to polyfill.
		stage: 1,
		// Toggle features.
		features: {
			'custom-properties': false,
			'custom-property-sets': false,
			'image-set-function': false,
			'logical-properties-and-values': false,
			'nesting-rules': true,
			'custom-media-queries': {
				extensions: {
					'--phone': '(min-width: 600px)',
					'--tablet': '(min-width: 900px)',
					'--desktop': '(min-width: 1200px)',
					'--wide': '(min-width: 1440px)'
				},
				preserve: true,
				appendExtensions: false
			},
			'media-query-ranges': false,
			// 'custom-selectors': { extensions: {}, transformMatches: false },
			'custom-selectors': false,
			'case-insensitive-attributes': false,
			'rebeccapurple-color': false,
			'hexadecimal-alpha-notation': false,
			'lab-function': false,
			'color-mod-function': true,
			'color-functional-notation': true,
			'system-ui-font-family': false,
			'font-variant-property': false,
			'all-property': false,
			'matches-pseudo-class': false,
			'not-pseudo-class': false,
			'any-link-pseudo-class': true,
			'dir-pseudo-class': false,
			'break-properties': false,
			'gap-properties': false,
			'overflow-property': false,
			'overflow-wrap-property': false,
			'place-properties': false,
			'focus-visible-pseudo-class': false,
			'focus-within-pseudo-class': false
		},
		// Determine which features to polyfill based on browserslist.
		browsers: ['last 2 versions', 'IE 11']
		// Insert plugins into the chain.
		// insertBefore: {
		// 	'nesting-rules': [
		// 		// Enables nested ancestor selectors.
		// 		require('postcss-nested-ancestors')({
		// 			placeholder: '^&'
		// 		})
		// 	]
		// },
		// insertAfter: {}
	},

	// Packs multiple media queries into one.
	'css-mqpacker': {},

	// Combines colors within a specificed threshold to reduce number of color values.
	colorguard: {
		// ignore: [],
		// threshold: 3,
		// whitelist: [[]]
	},

	// Convert pixel values to rems.
	'postcss-pxtorem': {
		rootValue: 8,
		unitPrecision: 5,
		propList: ['*'],
		selectorBlackList: [':root', 'html', 'body'],
		replace: true,
		mediaQuery: false,
		minPixelValue: 0
	},

	// Adds specified prefix to all classes and ids.
	'postcss-prefixer': {
		// prefix: '',
		// ignore: []
	},

	// Auto generates vendor prefixed properties based on browser support.
	autoprefixer: {},

	// Minify output css.
	'postcss-csso': {
		restructure: true,
		forceMediaMerge: false,
		comments: true, // 'exclamation' (true) | 'first-exclamation' | false
		usage: null,
		logger: null
	},

	// Log postcss output to console.
	'postcss-reporter': {
		clearReportedMessages: true,
		throwError: isProd,
		sortByPosition: true
	}
};
