import BrikElement from '../brik-element/brik.js';
import styles from '../styles/styles.js';

export default class Page extends BrikElement {
	static get defaults() {
		return {};
	}

	// Create the Custom Element.
	created() {
		if (!document.querySelector('brik-page')) {
			throw new Error('Only one <brik-page/> element allowed on a page.');
		}
		this.attachShadow({ mode: 'open' });
		this.css = styles.createRule({
			display: 'flex',
			height: '100vh',
			width: '100vw',
			overflow: 'hidden'
		});
		this.css.applyTo(this);
		this.render();
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		return this.html`<slot></slot>`;
	}
}
