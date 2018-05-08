import BrikElement from '../brik-element/brik.js';

export default class PageContent extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {};
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
		return this.html`<slot></slot>`;
	}

	get router() {
		return this.parentNode.host.router;
	}
}
