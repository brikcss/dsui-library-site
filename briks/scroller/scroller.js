import BrikElement from '../brik-element/brik.js';

export default class Scroller extends BrikElement {
	// Element constructor.
	created() {
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.props.css = ``;
		return this.html`<slot></slot><style>:host {
			overflow-y: auto;
		}</style>`;
	}
}
