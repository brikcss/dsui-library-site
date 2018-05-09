import BrikElement from '../brik-element/brik.js';

export default class PageViewport extends BrikElement {
	created() {
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		let css = `:host {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 100vh;
			width: 100%;
			transform: translate3d(0, 0, 0);
			transition: transform 350ms cubic-bezier(0.6, 0, 0.2, 1.2);
		}

		:host-context([active-sidebar='left']) {
			transform: translate3d(var(--sidebar-left-push), 0, 0);
		}

		:host-context([active-sidebar='right']) {
			transform: translate3d(calc(-1 * var(--sidebar-right-push)), 0, 0);
		}`;

		return this.html`<slot></slot><style>${css}</style>`;
	}
}
