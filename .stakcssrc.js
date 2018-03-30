module.exports = {
	homepage: {
		source: 'src/angularjs/home.html',
		output: 'dist/angularjs/index.html',
		bundlers: ['@brikcss/stakcss-bundler-ejs'],
		watchPaths: './src/briks/{sidebars,header,footer,rightbar}/*.ejs.html'
	},
	sass: {
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
			'./node_modules/highlight.js/styles/atom-one-dark.css',
			'./src/angularjs/**/*.scss'
		],
		output: './dist/angularjs/css/dsui-angularjs.css',
		bundlers: [
			{ run: '@brikcss/stakcss-bundler-sass', options: { sourceMap: false } },
			{
				run: '@brikcss/stakcss-bundler-postcss',
				options: {},
				plugins: [
					require('autoprefixer')({ cascade: false }),
					require('postcss-reporter')({ clearReportedMessages: true })
				]
			}
		]
	},
	fonts: {
		source: './src/briks/typography/*.{woff,woff2,ttf}',
		output: 'dist/angularjs/css/fonts/',
		bundlers: ['@brikcss/stakcss-bundler-copy']
	},
	assets: {
		source: './static/**/*',
		output: 'dist/angularjs/assets/',
		cwd: './static',
		bundlers: ['@brikcss/stakcss-bundler-copy']
	}
};
