import BrikElement from '../brik-element/brik.js';
import tpl from './header.tplit.html';
import css from './header.shadow.css';

export default class Header extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			title: 'Header',
			hideBurgerAt: '768px'
		};
	}

	attributeChangedCallback() {
		this.render();
	}

	// Element constructor.
	created() {
		this.attachShadow({ mode: 'open' });
		this.props.css = css;
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		if (this.props.hideBurgerAt) {
			this.props.css += `@media (min-width: ${this.props.hideBurgerAt}) {
				.brik-burger { display: none; }
			}`;
		}
		return tpl(this.html, this, BrikElement);
	}
}
