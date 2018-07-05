import { bind, wire } from 'hyperhtml';

export const renderMixin = (Base = HTMLElement) => {
	return class extends Base {
		renderer(root, html) {
			if (super.renderer) {
				super.renderer(root, html && html());
			} else {
				this.render();
			}
		}

		updated(...args) {
			super.updated && super.updated(...args);
			this.rendering && this.rendering(this._prevProps, this._prevState);
			this.renderer(this.root || this.shadowRoot || this, this.render);
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
