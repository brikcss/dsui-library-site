const rollupPluginutils = require('rollup-pluginutils');
const ejs = require('ejs');
const yaml = require('gray-matter');
const merge = require('@brikcss/merge');

export default (options = {}) => {
	const filter = rollupPluginutils.createFilter(options.include || ['**/*.ejs'], options.exclude);
	options = merge(
		{
			cache: false,
			_with: false,
			localsName: 'page'
		},
		options,
		{
			client: false,
			rmWhitespace: false,
			escape: false
		}
	);

	return {
		name: 'ejs',
		transform(code, filepath) {
			if (filter(filepath)) {
				options.filename = filepath;
				code = yaml(code);
				code.content = ejs.render(code.content, code.data, options);

				return {
					code: `export default ${JSON.stringify(`${code.content}`)};`,
					map: { mappings: '' }
				};
			}
		}
	};
};
