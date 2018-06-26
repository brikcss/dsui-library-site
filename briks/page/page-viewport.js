import BrikElement from '../brik-element/brik.js';
import { jss } from '../styles/styles.js';

export default class PageViewport extends BrikElement {
	created() {
		this.attachShadow({ mode: 'open' });
		this.props.css = jss
			.createRule({
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				minHeight: '100vh',
				width: '100%',
				transform: 'translate3d(0, 0, 0)',
				transition: 'transform 350ms cubic-bezier(0.6, 0, 0.2, 1.2)'
			})
			.applyTo(this);
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render(activeSidebar = '') {
		this.props.css.prop(
			'transform',
			activeSidebar === 'left'
				? 'translate3d(var(--sidebar-left-push), 0, 0);'
				: activeSidebar === 'right'
					? 'translate3d(calc(-1 * var(--sidebar-right-push)), 0, 0);'
					: ''
		);
		return this.html`<slot></slot>`;
	}
}
