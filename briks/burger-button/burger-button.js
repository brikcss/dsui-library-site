import BrikElement from '../brik-element/brik.js';
import css from './burger-button.css.js';
import { jss } from '../styles/styles.js';

export default class BurgerButton extends BrikElement {
	static get defaults() {
		return {
			active: false,
			sidebar: 'left'
		};
	}

	// Element constructor.
	created() {
		this.attachShadow({ mode: 'open' });
		this.setAttribute(
			'style',
			'height: var(--burger-size, 3rem); width: var(--burger-size, 3rem); display: flex;'
		);
		this.props.sheet = jss.createStyleSheet(css, {
			meta: 'burger-button',
			classNamePrefix: 'brik-'
		});
		this.props.classes = this.props.sheet.classes;
		this.props.css = this.props.sheet.toString();
		window.addEventListener('on.toggle-' + this.props.sidebar + '-sidebar', this.handleToggle);
		this.render();
	}

	disconnectedCallback() {
		window.removeEventListener(
			'on.toggle-' + this.props.sidebar + '-sidebar',
			this.handleToggle
		);
	}

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback() {
		this.render();
	}

	handleToggle() {
		this.active = !this.active;
		this.render();
	}

	onclick() {
		this.dispatchEvent(
			new CustomEvent('sidebar.' + this.props.sidebar + '.toggle', {
				detail: !this.active,
				composed: true,
				bubbles: true
			})
		);
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.props.sidebar = this.getAttribute('sidebar');
		return this.html`<button class="${this.props.classes.button +
			(this.active ? ` ${this.props.classes.active}` : '')}" type="button" onclick="${this}">
				<span class=${this.props.classes.top} />
				<span class=${this.props.classes.toppings} />
				<span class=${this.props.classes.bottom} />
			</button>
			<style>${this.props.css}</style>`;
	}
}
