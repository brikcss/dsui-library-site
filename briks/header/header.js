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
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	render() {
		this.css = styles.createStyleSheet(css(this.props.hideBurgerAt), {
			classNamePrefix: 'brik-'
		});
		return tpl(this.bind(this.root), this);
	}
}
