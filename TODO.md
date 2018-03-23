# To dos

- Core: Publish each core component:
	- Standardize variable names to match BEM.
	- Convert to PostCSS?
	- Add unit tests?
	- Publish.
	- Install to dsui-library-site and test that it works.
	- Update docs on dsui-library-site for how to install.
	- Roll dsui-site.
- Set up Travis CI / Semantic Release:
	- Run linters for tests.
	- On pass, release to github pages.
- Page tabs:
	- Create URLs for page tabs and add links for each.
- Site data:
	- Move page data to external data file(s).
- Apply Elise's page layout design.
- Update Home page.
- Add pages to "About DS UI":
	- How to include assets.
		- File types:
			- *.abstract.scss
			- *.init.scss
			- *.utilities.scss
	- How to install from NPM.
	- FAQ

## With every component

- All projects:
    - Git hooks:
        - git-precommit-linter
        - add-branch-stamp
        - check-stage
    - Git commit linter
        - commitlint.config.js
    - Dotfiles:
        - .browserslistrc
        - .editorconfig
        - .gitignore
- Some projects:
    - Semantic Release (if publishing releases to NPM or GitHub)
        - .releaserc.js
        - .travis.yml
    - Linters:
        - eslint (if js)
            - .eslintrc
            - .eslintignore
        - stylelint (if css/sass/etc)
            - .stylelintrc
            - .stylelintignore
        - prettier (if js/css/json)
            - .prettierrc
    - Browser Sync (if local browser)
        - .browsersync.js (if browser-sync)
    - Babel (if compiling modules)
        - .babelrc (if babel)
    - Dotfiles:
        - .htmlhintrc (if html)

## Packages needed for DS UI Site

Custom packages:

- [ ] tim.path
- [ ] tim.sortObject
- [ ] tim.getCliArgs
- [x] git-precommit-linter (lint-staged-files)
- [ ] EJS bundler
- [ ] Webpack (JS) bundler
- [ ] XJSON bundler
- [ ] SASS bundler

NPM packages:

- [ ] tim.globby
- [ ] tim.fs
- [ ] tim.log
- [ ] tim.minimist
- [ ] tim.shell
