import BrikElement from '../brik-element/brik.js';

export default class PageOverlay extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			active: false
		};
	}

	// Element constructor.
	created() {
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.props.css = `:host {
			background-color: transparent;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;
			transition: background-color 350ms, z-index 0ms 350ms;
		}
		:host-context([active-sidebar="left"]),
		:host-context([active-sidebar="right"]) {
			background-color: hsla(0, 0%, 0%, 0.5);
			z-index: 9;
			transition: background-color 350ms, z-index 0ms 0ms;
		}`;
		return this.html`<slot></slot><style>${this.props.css}</style>`;
	}
}
