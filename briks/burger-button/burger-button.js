import BrikElement from '../brik-element/brik.js';
import stylesheet from './burger-button.css';

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
		window.addEventListener('sidebars.toggled', this.handleToggle);
		this.render();
	}

	disconnectedCallback() {
		window.removeEventListener('sidebars.toggled', this.handleToggle);
	}

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback() {
		this.render();
	}

	handleToggle(event) {
		const isActive = event && event.detail ? event.detail === this.props.sidebar : false;
		this.active = isActive;
	}

	onclick() {
		this.dispatchEvent(
			new CustomEvent('sidebars.toggle', {
				detail: this.props.sidebar,
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
		return this.html`<button class="button" type="button" onclick="${this}">
				<span class=top />
				<span class=toppings />
				<span class=bottom />
			</button>
			<style>${stylesheet}</style>`;
	}
}
