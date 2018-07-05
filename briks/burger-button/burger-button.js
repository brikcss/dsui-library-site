import { Brik, propsMixin, renderMixin, eventsMixin, types } from '../brik-element';
import css from './burger-button.css.js';
import styles from '../styles/styles.js';

export default class BurgerButton extends Brik().with(propsMixin, renderMixin, eventsMixin) {
	static get props() {
		return {
			active: types.boolean,
			sidebar: types.string
		};
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.setAttribute(
			'style',
			'height: var(--burger-size, 3rem); width: var(--burger-size, 3rem); display: flex;'
		);
		this.stylesheet = styles.createStyleSheet(css, {
			meta: 'burger-button',
			classNamePrefix: 'brik-'
		});
		this.classes = this.stylesheet.classes;
		this.css = this.stylesheet.toString();
		window.addEventListener('on.toggle-' + this.sidebar + '-sidebar', this.events.toggle);
		this.render();
	}

	disconnectedCallback() {
		window.removeEventListener('on.toggle-' + this.sidebar + '-sidebar', this.events.toggle);
		window.removeEventListener('click', this);
	}

	get events() {
		return {
			click: () => {
				this.dispatchEvent(
					new CustomEvent('sidebar.' + this.sidebar + '.toggle', {
						detail: !this.active,
						composed: true,
						bubbles: true
					})
				);
			},
			toggle: () => {
				this.active = !this.active;
				this.render();
			}
		};
	}

	render() {
		this.sidebar = this.getAttribute('sidebar');
		return this.bind(this.root)`<button class="${this.classes.button +
			(this.active ? ` ${this.classes.active}` : '')}" type="button" onclick="${this}">
				<span class=${this.classes.top} />
				<span class=${this.classes.toppings} />
				<span class=${this.classes.bottom} />
			</button>
			<style>${this.css}</style>`;
	}
}
