# Component / package structure

<!-- @todo	Provide references here for clarity. -->
Source JS files are written as ES modules and compiled with [rollupjs](https://rollupjs.org/) to different bundles which you can include in your app. This process allows us to write the source code once and yet provide multiple "bundles" for different environments which you can use. In other words, whether you are using AngularJS, Vanilla JS (or jQuery), your own custom build system, or whatever else, this component will work for you. Each component will work in any "environment", no matter what framework or environment it is consumed in.

## Directory structure

Each component is distributed as an [NPM package](#!/working-with-npm) and is installed to `node_modules/<package name>`. Each package will have a source (`src`) and distribution (`dist`) folder, each which contain a "distro", or distributed bundle of assets. For example, a package may have the following structure:

- **dist**: Distributed / compiled bundles.
	- **angularjs**: Prebundled AngularJS file.
	- **commonjs**: CommonJS support (node/requirejs).
	- **css**: Vanilla CSS (compiled with default SASS/PostCSS configuration).
	- **umd**: Universal Module (commonjs/esmodule/vanillajs).
	- **vanillajs**: Vanilla JS for use in browser.
- **src**: Original source files.
	- **angularjs**: Source AngularJS files (ES modules).
	- **esmodule**: Source JS files (ES modules).
	- **sass**: Source CSS files (SASS).

## Which "distro" should I use?

The distro you include in your app totally depends on you and how your app is set up. Here are some guidelines to follow:

### JS distros

- Use a compiled distro (`dist/*`) for less/no configuration and easier setup:
	- Use `dist/angularjs` if your app uses AngularJS v1.
	- Use `dist/vanillajs` for vanilla JavaScript / browser globals.
	- (_Less common_) Use `dist/commonjs` if your app uses the CommonJS module system.
	- (_Less common_) Use `dist/umd` for the flexibility of a [Universal Module Definition (UMD)](https://github.com/umdjs/umd).
- Use a source distro (`src/*`) for full configuration options and the power of ES modules. Because these are ES modules, you will need to compile these with a build / bundler system such as [webpack](http://webpack.js.org/), [rollup](https://rollupjs.org/), or [parcel](https://parceljs.org).
	- Use `src/angularjs` if your app uses AngularJS v1.
	- Use `src/esmodule` for ES modules.

### CSS distros

- Use `dist/css` if you do not or do not wish to use SASS. Less flexibility.
- Use `dist/sass` if your app uses SASS and for configuration options.
