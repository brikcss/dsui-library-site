import { Brik, propsMixin, renderMixin, types, type } from '../brik-element';
import styles from '../styles/styles.js';

export default class Overlay extends Brik().with(propsMixin, renderMixin) {
	static get props() {
		return {
			active: types.boolean,
			styles: type(
				Object.assign({}, types.object, {
					attribute: false,
					default: {
						backgroundColor: 'transparent',
						position: 'fixed',
						left: 0,
						right: 0,
						bottom: 0,
						top: 0,
						zIndex: -1,
						transition: 'background-color 350ms, z-index 0ms 350ms'
					}
				})
			),
			activeStyles: type(
				Object.assign({}, types.object, {
					attribute: false,
					default: {
						backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
						zIndex: 9,
						transition: 'background-color 350ms, z-index 350ms 0ms'
					}
				})
			)
		};
	}

	connectedCallback() {
		this.css = styles.createStyleSheet(
			{
				overlay: this.props.styles,
				active: this.props.activeStyles
			},
			{ classNamePrefix: 'brik-' }
		);
		this.classList.add(this.css.classes.overlay);
		this.render();
	}

	rendering() {
		this.classList[this.active ? 'add' : 'remove'](this.css.classes.active);
	}

	render() {
		return this.bind(this.root)`<style>${this.css.toString()}</style>`;
	}
}
