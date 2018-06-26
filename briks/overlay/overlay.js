import BrikElement from '../brik-element/brik.js';
import styles from '../styles/styles.js';

export default class Overlay extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			active: false,
			styles: {
				backgroundColor: 'transparent',
				position: 'fixed',
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
				zIndex: -1,
				transition: 'background-color 350ms, z-index 0ms 350ms'
			},
			activeStyles: {
				backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
				zIndex: 9,
				transition: 'background-color 350ms, z-index 350ms 0ms'
			}
		};
	}

	static get observedAttributes() {
		return ['active'];
	}

	created() {
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

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback() {
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.classList[this.active ? 'add' : 'remove'](this.css.classes.active);
		this.html`<style>${this.css.toString()}</style>`;
	}
}
