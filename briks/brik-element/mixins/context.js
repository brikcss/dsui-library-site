export const contextMixin = (Base = HTMLElement) => {
	return class extends Base {
		get context() {
			if (this._context) {
				return this._context;
			}
			let node = this;
			while ((node = node.parentNode || node.host)) {
				if ('context' in node) {
					return node.context;
				}
			}
			return {};
		}
		set context(context) {
			this._context = context;
		}
	};
};
