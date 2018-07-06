import { bind, wire } from 'hyperhtml';

export const renderMixin = (Base = HTMLElement) => {
	return class extends Base {
		render(root, id) {
			root = root || this.root || this.shadowRoot || this;
			// If this.tpl doesn't exist, return the hyperhtml render (bind) function.
			if (!this.tpl) return this.bind(root, id);
			// Otherwise, this.tpl() is called with a custom render function.
			const html = this.tpl((string, ...values) => ({ string, values }), this);
			return this.bind(root, id)(html.string, ...html.values);
		}

		updated(...args) {
			super.updated && super.updated(...args);
			this.rendering && this.rendering(this._prevProps, this._prevState);
			this.render();
			this.rendered && this.rendered(this._prevProps, this._prevState);
		}

		bind(...args) {
			return bind(...args);
		}

		wire(...args) {
			return wire(...args);
		}
	};
};
