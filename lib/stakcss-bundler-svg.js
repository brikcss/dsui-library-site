/** ------------------------------------------------------------------------------------------------
 *  @filename  stakcss-bundler-svg.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Stakcss bundler which optimizes svg files.
 ** --------------------------------------------------------------------------------------------- */

const fs = require('fs-extra');
const svgo = require('svgo');

module.exports = (config = {}, bundler = {}) => {
	if (!config.content) {
		const promises = [];
		config.source.forEach((filepath) => {
			promises.push(optimizeSvg(filepath, config, bundler));
		});
		return Promise.all(promises).then(() => config);
	}
	return config;
};

function optimizeSvg(filepath, config, bundler) {
	return fs.readFile(filepath).then((content) => {
		return new svgo(bundler.options).optimize(content, { path: filepath }).then((result) => {
			config.content += result.data;
			return config;
		});
	});
}
