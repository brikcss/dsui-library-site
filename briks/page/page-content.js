import BrikElement from '../brik-element/brik.js';

export default class PageContent extends BrikElement {
	created() {
		this.render();
		this.setAttribute('style', 'overflow-y: auto;');
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render(content = '', padding = '4rem') {
		let css = `brik-page-content { padding: ${padding}; }`;
		this.props.content = content;
		return this.html`${[content]}<style>${css}</style>`;
	}
}
