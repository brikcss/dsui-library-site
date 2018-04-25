// Root level pages.
import homeTpl from '../../../pages/home.page.md';
import getStartedTpl from '../../../pages/getting-started.tpl.html';
import errorTpl from '../../../pages/404.tpl.html';
// Core component pages.
import resetTpl from '../../../pages/core/browser-reset.tpl.ejs';
import colorsTpl from '../../../pages/core/colors.html.ejs';
import typographyTpl from '../../../pages/core/typography.html.ejs';
import rhythmTpl from '../../../pages/core/rhythm.html.ejs';
// Component pages.
import spinnerPage from '../../../pages/components/spinner.html.ejs';
import iconsPage from '../../../pages/components/icons.html.ejs';
// About pages.
import includingAssetsPage from '../../../pages/about/including-assets.page.md';
import workingWithNpmPage from '../../../pages/about/working-with-npm.page.md';
import packageStructurePage from '../../../pages/about/package-structure.page.md';

const pages = {
	Home: {
		tpl: homeTpl,
		data: {
			pageTitle: 'DS UI Library'
		}
	},
	'Getting Started': getStartedTpl,
	core: {
		'Browser Reset': {
			tpl: resetTpl({
				brik: {
					name: 'Browser Reset',
					npmPath: '@brikcss/reset',
					isCore: true,
					intro:
						'<p>Default styles for HTML elements can differ from browser to browser. The browser reset is a set of CSS rules that <em>resets</em> styles for all HTML elements so all browsers start with a consistent baseline.</p><p><em>Every DS app should include this in their codebase.</em></p>',
					related: ['Typography', 'Links', 'Rhythm'],
					setup: {
						hideIntro: true,
						summary:
							'<p>Make sure to <a ui-sref="including-assets">include the appropriate assets in your app</a>.</p> Make sure <code>_reset.init.scss</code> is the first CSS-producing file (after abstract code) included in your SASS build. No other steps are necessary.</p>'
					}
				}
			}),
			data: {
				version: '0.0.1'
			}
		},
		Colors: {
			tpl: colorsTpl({
				brik: {
					name: 'Colors',
					isCore: true,
					intro:
						'<p>DS UI Colors provide an easy way to apply and manage all of your app\'s colors. Define colors once and reuse them everywhere. It also helps manage a "live theme" (i.e., client colors) using native CSS variables.</p>',
					related: ['Typography'],
					npmPath: '@brikcss/colors',
					setup: {
						summary:
							'<p>Make sure to <a ui-sref="including-assets">include the appropriate assets in your app</a>.</p>'
					}
				},
				colors: [
					{
						heading: 'Dark (text, icons, borders)',
						description:
							'Dark colors are black with various applied levels of opacity. Dark colors can be used in text, icons, and borders on light backgrounds.',
						colors: [
							{
								name: 'dark | dark1',
								class: 'dark1',
								hsl: 'hsla(0, 0%, 0%, 0.87)',
								hex: '#000000, 87% opacity',
								usage: 'Primary dark text'
							},
							{
								name: 'dark2',
								hsl: 'hsla(0, 0%, 0%, 0.54)',
								hex: '#000000, 54% opacity',
								usage: 'Active dark icons, Secondary dark text'
							},
							{
								name: 'dark3',
								hsl: 'hsla(0, 0%, 0%, 0.38)',
								hex: '#000000, 38% opacity',
								usage: 'Inactive dark icons, Disabled / hint dark text'
							},
							{
								name: 'dark4',
								hsl: 'hsla(0, 0%, 0%, 0.12)',
								hex: '#000000, 12% opacity',
								usage: 'Dark borders / dividers'
							}
						]
					},
					{
						heading: 'Light (text, icons, borders)',
						description:
							'Light colors are white with various applied levels of opacity. Light colors can be used in text, icons, and borders on dark backgrounds.',
						darkBg: true,
						colors: [
							{
								name: 'light | light1',
								class: 'light1',
								hsl: 'hsla(0, 0%, 100%, 1)',
								hex: '#ffffff, 100% opacity',
								usage: 'Primary light text'
							},
							{
								name: 'light2',
								hsl: 'hsla(0, 0%, 100%, 0.7)',
								hex: '#ffffff, 70% opacity',
								usage: 'Active light icons, Secondary light text'
							},
							{
								name: 'light3',
								hsl: 'hsla(0, 0%, 100%, 0.5)',
								hex: '#ffffff, 50% opacity',
								usage: 'Inactive light icons, Disabled / hint light text'
							},
							{
								name: 'light4',
								hsl: 'hsla(0, 0%, 100%, 0.12)',
								hex: '#ffffff, 12% opacity',
								usage: 'Light borders / dividers'
							}
						]
					},
					{
						heading: 'App colors',
						description: 'Background colors with specific use cases.',
						colors: [
							{
								name: 'gray',
								hsl: 'hsl(0, 0%, 90%)',
								hex: '#000000',
								usage: 'Neutral background'
							},
							{
								name: 'supernav',
								hsl: 'hsl(209, 24%, 30%)',
								hex: '#3a4d5f',
								usage: 'Sidebar header'
							},
							{
								name: 'supernav-icon',
								hsl: 'hsl(208, 11%, 65%)',
								hex: '#9ca6b0',
								usage: 'Sidebar icons'
							}
						]
					},
					{
						heading: 'Dynamic client colors',
						description:
							'Dynamic client colors are four theme colors chosen by the client. <strong>These specific color values are NOT UX approved; they are provided to illustrate how dynamic client colors work, and how developers can use dynamic client colors in their code.</strong>',
						colors: [
							{
								name: 'color1',
								hsl: 'hsl(194, 76%, 65%)',
								hex: '#62caea',
								usage: 'Primary app bar, text links, visual tree'
							},
							{
								name: 'color2',
								hsl: 'hsl(69, 67%, 51%)',
								hex: '#bdd62e',
								usage: 'Buttons, profile avatars'
							},
							{
								name: 'color3',
								hsl: 'hsl(36, 96%, 54%)',
								hex: '#faa019',
								usage:
									'Selections, checkboxes, selected state for dropdowns, active tab underlines'
							},
							{
								name: 'color4',
								hsl: 'hsl(205, 7%, 45%)',
								hex: '#6b747b',
								usage:
									'Distributor profile avatars, selected item in sidebar list, secondary color for visual tree'
							}
						]
					}
				]
			}),
			data: {
				version: '0.0.1'
			}
		},
		Typography: {
			tpl: typographyTpl({
				brik: {
					name: 'Typography',
					npmPath: '@brikcss/typography',
					isCore: true,
					intro:
						'<p>Instead of pixels, Material Design specs use <a href="https://material.io/guidelines/layout/units-measurements.html" title="Material Design sp and dp units">"sp" and "dp" units</a> to make pixels more responsive to various devices. DS UI Typography provides the mechanism for applying and managing responsive typography based on MD specs.</p>',
					related: ['Colors', 'Lists', 'Links', 'Rhythm'],
					setup: {
						list: [
							'Copy <code>typography/*.{woff,woff2}</code> files to your <code>&lt;build&gt;/css/fonts</code> folder. This can be automated for you by putting it into your build.',
							'<a ui-sref="including-assets">Include <code>_typography.abstract.scss</code></a> in your SASS build.',
							{
								class: 'bullets',
								intro:
									'Initialize typography styles by doing one of the following:',
								list: [
									'<em>Basic</em>: Include <code>_typography.init.scss</code> into your SASS build.',
									'<em>Advanced</em>: Use <code>_typography.init.scss</code> as an example to initialize typography styles on your own.'
								]
							}
						]
					}
				}
			}),
			data: {
				version: '0.0.1'
			}
		},
		Rhythm: {
			tpl: rhythmTpl({
				brik: {
					name: 'Rhythm',
					npmPath: '@brikcss/rhythm',
					isCore: true,
					intro:
						'<p>DS UI Rhythm provides an easy way to apply and manage vertical and horizontal spacing anywhere. Rhythm is founded on <a href="https://www.creativebloq.com/how-to/the-rules-of-responsive-web-typography">good principles of typography</a>, fosters <a href="https://zellwk.com/blog/why-vertical-rhythms/">repetition and familiarity</a> throughout the UI, and makes any layout more <a href="https://blog.alexdevero.com/6-simple-secrets-perfect-web-typography/#no5-focus-on-vertical-rhythm">balanced, beautiful, and readable</a>.</p><p>For a demonstration of Rhythm in action: <br><button class="<%= data.baseClass %>__button font__button" ng-click="appCtrl.showRhythmGrid = !appCtrl.showRhythmGrid" type="button">Toggle Rhythm grid</button></p><p class="font__reset">Notice how <em>everything</em> has consistent dimensions and spacing: font, line height, element heights, margins, padding, and so forth. Even elements which are completely disconnected from each other are "in rhythm". That\'s Rhythm.</p>',
					related: ['Typography'],
					setup: {
						summary:
							'<p>Make sure to <a ui-sref="including-assets">include the appropriate assets in your app</a>.</p>'
					}
				}
			}),
			data: {
				version: '0.0.1'
			}
		}
	},
	components: {
		Spinner: {
			tpl: spinnerPage({
				brik: {
					name: 'Spinner',
					npmPath: '@brikcss/spinner',
					intro:
						'<p>Spinner is a visual indicator that content on the page is loading. Spinner can optionally display the progress of an operation.</p>',
					related: [],
					setup: {
						summary:
							'<p>Make sure to <a ui-sref="including-assets">include the appropriate assets in your app</a>.</p>'
					}
				}
			}),
			data: {
				version: '0.0.1'
			}
		},
		Icons: {
			tpl: iconsPage({
				brik: {
					name: 'Icons',
					npmPath: '@brikcss/icons',
					intro: '<p>Icons communicate something without text.</p>',
					related: [],
					setup: {
						summary:
							'<p>Make sure to <a ui-sref="including-assets">include the appropriate assets in your app</a>.</p>'
					}
				}
			}),
			data: {
				version: '0.0.1'
			}
		}
	},
	about: {
		'Working with NPM': workingWithNpmPage,
		'Package Structure': packageStructurePage,
		'Including Assets': includingAssetsPage
	},
	404: errorTpl
};

pageConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function pageConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/home');
	$urlRouterProvider.when('/', '/home');
	$urlRouterProvider.otherwise('404');

	// Iterate through pages object and create pages.
	const sections = ['core', 'components', 'about'];
	Object.keys(pages).forEach((section) => {
		if (sections.indexOf(section) > -1) {
			// Sections of pages.
			Object.keys(pages[section]).forEach((page) => {
				let pageData = Object.assign({ section }, pages[section][page]);
				if (typeof pages[section][page] === 'string') {
					pageData.tpl = pages[section][page];
				}
				createRoute(page, pageData);
			});
		} else {
			// Pages.
			createRoute(section, pages[section]);
		}
	});

	// Create a route.
	function createRoute(name, page = {}) {
		if (typeof page === 'string') {
			page = {
				tpl: page
			};
		}
		page.data = Object.assign(
			{
				pageTitle: page.section === 'about' ? 'About DS UI' : name
			},
			page.data || {}
		);
		page.url = page.url || '/' + name.replace(/\s+/g, '-').toLowerCase();
		if (typeof page.tpl === 'function') {
			page.tpl = page.tpl(page.data);
		}
		const pageName = name.replace(/\s+/g, '-').toLowerCase();
		if (!page.tpl) {
			page.tpl = `<h2 class="font__headline">${name}</h2><p class="font__subheading">We are working on documentation for this page. Come back soon!</p>`;
		}
		const routeConfig = {
			url: page.url,
			views: {
				content: {
					template: page.tpl,
					controller: 'appCtrl as app'
				}
			},
			// @todo  Find way to split ejs and angularjs data so 1) we don't have to provide all
			//     ejs data here, and 2) it stays DRY.
			data: page.data
		};
		$stateProvider.state(pageName, routeConfig);
	}
}

export default pageConfig;
