import BrikElement from '../brik-element/brik.js';
import css from './icon.css.js';
import styles from '../styles/styles.js';

export default class Icon extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			name: '',
			size: null,
			fill: null,
			stroke: null
		};
	}

	// Element constructor.
	created() {
		window.brikcss.icons = window.brikcss.icons || {};
		this.props.name = this.getAttribute('name');
		this.attachShadow({ mode: 'open' });
		this.updateSvg();
		this.render();
	}

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback(prop, oldValue, value) {
		// Make sure created() has been called before this fires. For some icons, sometimes, there this fires before created() is called, which seems to be a bug in brik.js. This is intended as a temporary fix for that.
		if (!this.props.ready) return;
		// Update svg and render.
		if (prop === 'name' && value !== oldValue) {
			this.updateSvg();
		}
		this.render();
	}

	updateSvg() {
		let cachedSvg = window.brikcss.icons[this.props.name];
		this.props.svg = {
			placeholder: '',
			html:
				typeof cachedSvg === 'string'
					? cachedSvg
					: cachedSvg
						? cachedSvg
						: (cachedSvg = fetch(
								new Request('./svg/' + this.props.name + '.svg', {
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
									window.brikcss.icons[this.props.name] = svg.replace(
										'<svg',
										'<svg style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; fill: inherit; stroke: inherit;"'
									);
									this.props.ready = true;
									return window.brikcss.icons[this.props.name];
								}))
		};

		return this.props.svg;
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		styles.createRule(css(this.props)).applyTo(this);
		return this.html`${this.props.svg}`;
	}
}
