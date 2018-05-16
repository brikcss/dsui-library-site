const { createFilter } = require('rollup-pluginutils');

export default ({ include = '**/*.tplit.html', exclude }) => {
	const filter = createFilter(include || '**/*.tplit.html', exclude);

	return {
		name: 'string',
		transform(code, id) {
			if (filter(id)) {
				return {
					code:
						'export default (render, context = {}, hyperhtml = {}, _ = {}) => render`' +
						code +
						'`;',
					map: { mappings: '' }
				};
			}
		}
	};
};
