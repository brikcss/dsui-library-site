function camelCase(string, pascal) {
	string = string.replace(/\W+(.)/g, (x, char) => char.toUpperCase());
	if (!pascal) string = string.replace(/^(.)/, ($1) => $1.toLowerCase());
	return string;
}

function dashCase(str) {
	return typeof str === 'string'
		? str.split(/([_A-Z])/).reduce((one, two, idx) => {
				const dash = !one || idx % 2 === 0 ? '' : '-';
				two = two === '_' ? '' : two;
				return `${one}${dash}${two.toLowerCase()}`;
		  })
		: str;
}

const empty = (val) => val == null;

function keys(obj) {
	obj = obj || {};
	const names = Object.getOwnPropertyNames(obj);
	return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(obj)) : names;
}

let symbolCount = 0;
function sym(description) {
	description = String(description || ++symbolCount);
	return typeof Symbol === 'function' ? Symbol(description) : `__skate_${description}`;
}

export { dashCase, camelCase, empty, keys, sym };
