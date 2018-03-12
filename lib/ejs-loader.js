var ejs = require('ejs');
var path = require('path');

module.exports = function(source) {
	this.cacheable && this.cacheable();

	// // Parse query string.
	var query = this.query;
	if (typeof query !== 'object') {
		query = query
			.replace(/(^\?)/, '')
			.split('&')
			.map(
				function(n) {
					return (n = n.split('=')), (this[n[0]] = n[1]), this;
				}.bind({})
			)[0];
	}

	// Merge query options with options.
	var options = Object.assign(
		{ _with: false, localsName: 'data' },
		this.options.ejsLoader || {},
		query,
		{ client: true }
	);

	// Add filename, relative to cwd.
	options.filename = path.relative(process.cwd(), this.resourcePath);

	var template = ejs.compile(source, options);
	return 'module.exports = ' + template;
};
