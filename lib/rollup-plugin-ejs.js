const rollupPluginutils = require('rollup-pluginutils');
const ejs = require('ejs');

export default ({ include, exclude, compilerOptions = { client: true, strict: true } } = {}) => {
	const filter = rollupPluginutils.createFilter(include || ['**/*.ejs'], exclude);

	return {
		name: 'ejs',
		transform: function transform(code, tplFilePath) {
			if (filter(tplFilePath)) {
				compilerOptions.filename = tplFilePath;
				const templateFn = ejs.compile(code, compilerOptions);

				return {
					code: `export default ${templateFn.toString()};`,
					map: { mappings: '' }
				};
			}
		}
	};
};
