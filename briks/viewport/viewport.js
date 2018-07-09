import { Brik, renderMixin, propsMixin, types, type } from '../brik-element';
import styles from '../styles/styles.js';

export default class Viewport extends Brik().with(renderMixin, propsMixin) {
	static get props() {
		return {
			width: type(Object.assign({}, types.string, { default: '100%' }))
		};
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.css = styles
			.createRule({
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				minHeight: '100vh',
				width: this.width,
				transform: 'translate3d(0, 0, 0)',
				transition: 'transform 350ms cubic-bezier(0.6, 0, 0.2, 1.2)'
			})
			.applyTo(this);
		this.render();
	}

	rendering(activeSidebar = '') {
		this.css.prop(
			'transform',
			activeSidebar === 'left'
				? 'translate3d(var(--sidebar-left-push), 0, 0);'
				: activeSidebar === 'right'
					? 'translate3d(calc(-1 * var(--sidebar-right-push)), 0, 0);'
					: ''
		);
		this.css.prop('width', this.width);
		this.css.applyTo(this);
	}

	render() {
		return super.render()`<slot></slot>`;
	}
}
