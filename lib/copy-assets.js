const tim = require('@brikcss/tim');

tim.getCliArgs({
	mainKey: 'source',
	scriptPath: __filename,
	callback: copyAssets,
});

module.exports = copyAssets;

function copyAssets(options = {}) {
	return tim.globby(options.source).then((filepaths) => {
		const promises = [];
		filepaths.forEach((filepath) => {
			promises.push(
				tim.fs.copy(filepath, tim.path.join(options.output, tim.path.basename(filepath)))
			);
		});
		return Promise.all(promises).catch(tim.log.error);
	});
}
