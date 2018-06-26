import BrikElement from '../brik-element/brik.js';
import { jss } from '../styles/styles.js';

export default class PageOverlay extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			active: false
		};
	}

	attributeChangedCallback() {
		this.render();
	}

	// Element constructor.
	created() {
		this.attachShadow({ mode: 'open' });
		this.props.sheet = jss.createStyleSheet(
			{
				overlay: {
					backgroundColor: 'transparent',
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: -1,
					transition: 'background-color 350ms, z-index 0ms 350ms'
				}
			},
			{ meta: 'overlay', classNamePrefix: 'brik-overlay-' }
		);
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		return this.html`<div class="${this.props.sheet.classes.overlay}" style="${
			this.active
				? 'background-color: hsla(0, 0%, 0%, 0.5); z-index: 9; transition: background-color 350ms, z-index 0ms 0ms;'
				: ''
		}"></div><style>${this.props.sheet.toString()}</style>`;
	}
}
