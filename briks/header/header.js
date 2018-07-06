import { Brik, propsMixin, renderMixin, types, type } from '../brik-element';
import tpl from './header.tplit.html';
import css from './header.css.js';
import styles from '../styles/styles.js';

export default class Header extends Brik().with(propsMixin, renderMixin) {
	static get props() {
		return {
			title: types.string,
			hideBurgerAt: type(Object.assign(types.string, { default: '768px' }))
		};
	}

	connectedCallback() {
		this.css = {};
		this.attachShadow({ mode: 'open' });
	}

	get tpl() {
		return tpl;
	}

	rendering() {
		this.css = styles.createStyleSheet(css(this.props.hideBurgerAt), {
			classNamePrefix: 'brik-'
		});
	}
}

export { css, tpl };
