const { createFilter } = require('rollup-pluginutils');

export default ({ include = '**/*.tplit.html', exclude }) => {
	const filter = createFilter(include || '**/*.tplit.html', exclude);

	return {
		name: 'string',
		transform(source, id) {
			if (!filter(id)) return;
			return {
				code: `export default (render, context = {}, _ = {}) => render\`${source}\`;`,
				map: { mappings: '' }
			};
		}
	};
};
