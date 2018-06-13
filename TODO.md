# To dos

## In Progress

- Split core components up into smaller pieces with abstracts and css producing code so they can be imported to shadow doms as well as consumed by the app layer.
- Update typography font styles.
- Review: pages and documentation for accuracy.

## Next

- Fix live preview in editor / code components. On colors playground tab, live preview content is locked in shadow dom, so doesn't receive app layer styles. Needs to be open to app layer.
- Components (test, publish, import, and document):
	- Do the following for each:
		- Standardize variable and class names to match BEM.
		- Add unit tests?
		- Publish.
		- Install to dsui-library-site and test that it works.
		- Update docs on dsui-library-site for how to install.
		- Roll dsui-site.
	- Components list:
		- BrikElement (fork from HyperHTML?)
		- supernav
		- header
		- page
			- page
			- content
			- overlay
			- viewport
		- burger button
		- icons
		- icon button
		- sidebars
		- tabs:
			- Feature: Make URL friendly.
- Add polyfills:
	- Custom Elements (document-register).
	- Shadow DOM
	- Templates / slots.
	- Fetch?
	- Promise?
	- Proxy object (https://github.com/tvcutsem/harmony-reflect)
	- ES6 (Class?)
- Cross browser test DSUI site.
- Add MD ripple which can be added to any button / component.

## Committed

- Prepare DSUI site for production:
	- Conform DSUI site to starter-module:
		- Config files.
		- Set up Travis CI / Semantic Release:
			- Run linters for tests.
			- On pass, release to github pages.
	- Minify code in production (when publishing).
	- Organize site data.
- Feature: FAQ documentation page.
- Evaluate skatejs to see how to improve brikElement.js.

## Maybe

- Publish `@brikcss/rollup-plugin-ejs` to NPM.
- Look into [Styled Components](https://www.styled-components.com/)?
