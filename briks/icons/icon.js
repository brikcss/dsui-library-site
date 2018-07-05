import { Brik, propsMixin, renderMixin, types } from '../brik-element';
import css from './icon.css.js';
import styles from '../styles/styles.js';

export default class Icon extends Brik().with(propsMixin, renderMixin) {
	static get props() {
		return {
			name: types.string,
			size: types.string,
			fill: types.string,
			stroke: types.string
		};
	}

	connectedCallback() {
		window.brikcss.icons = window.brikcss.icons || {};
		this.name = this.getAttribute('name');
		this.attachShadow({ mode: 'open' });
		this.updateSvg();
		this.render();
	}

	updateSvg() {
		let cachedSvg = window.brikcss.icons[this.name];
		this.svg = {
			placeholder: '',
			html:
				typeof cachedSvg === 'string'
					? cachedSvg
					: cachedSvg
						? cachedSvg
						: (cachedSvg = fetch(
								new Request('./svg/' + this.name + '.svg', {
									method: 'GET',
									headers: new Headers({
										'Content-Type': 'text/plain'
									})
								})
						  )
								.then((result) => {
									if (!result.ok) {
										return '';
									}
									return result.text();
								})
								.then((svg) => {
									window.brikcss.icons[this.name] = svg.replace(
										'<svg',
										'<svg style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; fill: inherit; stroke: inherit;"'
									);
									this.ready = true;
									return window.brikcss.icons[this.name];
								}))
		};

		return this.svg;
	}

	rendering() {
		styles.createRule(css(this.props)).applyTo(this);
	}

	render() {
		return this.bind(this.root)`${this.svg}`;
	}
}
