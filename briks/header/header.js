import BrikElement from '../brik-element/brik.js';

export default class Header extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			height: 'var(--header-height, 8rem)',
			padding: 'var(--header-padding, 0 4rem)',
			bg: 'var(--header-fill, hsl(194, 76%, 65%))',
			color: 'var(--header-color, hsl(0, 0%, 100%))'
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
			display: flex;
			align-items: center;
			position: relative;
			height: ${this.props.height};
			min-height: ${this.props.height};
			padding: ${this.props.padding};
			background-color: ${this.props.bg};
			color: ${this.props.color};
			box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.3);
		}`;
		this.html`<slot></slot><style>${this.props.css}</style>`;
	}
}
