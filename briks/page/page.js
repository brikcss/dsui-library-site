import { Brik, renderMixin } from '../brik-element';
import styles from '../styles/styles.js';

export default class Page extends Brik().with(renderMixin) {
	connectedCallback() {
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

	render() {
		return this.bind(this.root)`<slot></slot>`;
	}
}
