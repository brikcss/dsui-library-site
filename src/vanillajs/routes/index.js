/** ================================================================================================
 *  Dependencies
 ** ------------ */

// Root level pages.
import homePage from '../../pages/home.page.md';
import getStartedPage from '../../pages/getting-started.page.md';
// About pages.
// import includingAssetsPage from '../../pages/about/including-assets.page.md';
import workingWithNpmPage from '../../pages/about/working-with-npm.page.md';
// import packageStructurePage from '../../pages/about/package-structure.page.md';
// Core component pages.
import browserResetPage from '../../pages/core/browser-reset.html.ejs';
import typographyPage from '../../pages/core/typography.html.ejs';
import colorsPage from '../../pages/core/colors.html.ejs';
import rhythmPage from '../../pages/core/rhythm.html.ejs';
// // Component pages.
import spinnerPage from '../../pages/components/spinner.html.ejs';
import iconsPage from '../../pages/components/icons.html.ejs';

/** ================================================================================================
 *  Routes
 ** ------ */

export default [
	{
		name: 'home',
		label: 'Home',
		path: '/',
		icon: 'home',
		render: (app) => app.content.render(homePage),
		data: {
			pageTitle: 'DS UI Library'
		}
	},
	{
		name: '404',
		label: 'Error',
		path: '/error',
		hide: true,
		render: (app) =>
			app.content.render(
				'<h2 class="font__title2 mt-0">Uh oh... we couldn\'t find that page!</h2><p class="font__subtitle">Wanna try again?</p>'
			)
	},
	{
		name: 'getting-started',
		label: 'Get Started',
		path: '/getting-started',
		icon: 'clock-start',
		render: (app) => app.content.render(getStartedPage)
	},
	{
		name: 'learn',
		label: 'Learn',
		path: '/learn',
		icon: 'school',
		children: [
			{
				name: 'npm',
				label: 'Working with NPM',
				path: '/working-with-npm',
				render: (app) => app.content.render(workingWithNpmPage)
			}
			// {
			// 	name: 'structure',
			// 	label: 'Package Structure',
			// 	path: '/package-structure',
			// 	render: (app) => app.content.render(packageStructurePage)
			// },
			// {
			// 	name: 'assets',
			// 	label: 'Including assets',
			// 	path: '/including-assets',
			// 	render: (app) => app.content.render(includingAssetsPage)
			// }
		]
	},
	{
		name: 'core',
		label: 'Core',
		path: '/core',
		icon: 'atom',
		children: [
			{
				name: 'reset',
				label: 'Browser Reset',
				path: '/browser-reset',
				render: (app) => app.content.render(browserResetPage, '0')
			},
			{
				name: 'typography',
				label: 'Typography',
				path: '/typography',
				render: (app) => app.content.render(typographyPage, '0')
			},
			{
				name: 'colors',
				label: 'Colors',
				path: '/colors',
				render: (app) => app.content.render(colorsPage, '0')
			},
			{
				name: 'rhythm',
				label: 'Rhythm & Spacing',
				path: '/rhythm',
				render: (app) => app.content.render(rhythmPage, '0')
			}
		]
	},
	{
		name: 'components',
		label: 'Components',
		path: '/components',
		icon: 'widgets',
		children: [
			{
				name: 'spinner',
				label: 'Spinner',
				path: '/spinner',
				render: (app) => app.content.render(spinnerPage, '0')
			},
			{
				name: 'icons',
				label: 'Icons',
				path: '/icons',
				render: (app) => app.content.render(iconsPage, '0')
			}
		]
	},
	{
		name: 'patterns',
		label: 'Patterns',
		path: '/patterns',
		icon: 'matrix'
	}
];
