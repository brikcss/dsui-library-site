import BrikElement from '../brik-element/brik.js';
import tpl from './icon.tplit.html';

export default class Icon extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
			name: '',
			size: '2rem',
			svgDir: './svg/',
			fill: 'hsla(0, 0%, 0%, 0.54)',
			fillProp: '--icon-fill',
			stroke: 'transparent',
			strokeProp: '--icon-stroke'
		};
	}

	// Element constructor.
	created() {
		window.brikcss.icons = window.brikcss.icons || {};
		this.attachShadow({ mode: 'open' });
		this.props.name = this.getAttribute('name');
		this.render();
	}

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback(prop, oldValue, value) {
		if (prop === 'name' && value !== oldValue) this.updateSvg();
		if (!this._initialized) return;
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
								new Request(this.props.svgDir + this.props.name + '.svg', {
									method: 'GET',
									headers: new Headers({
										'Content-Type': 'text/plain'
									})
								})
						  ).then((result) => {
								if (!result.ok) {
									return '';
								}
								return (cachedSvg = result.text());
						  }))
		};

		return this.props.svg;
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.props.css = `:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: ${this.props.size};
			width: ${this.props.size};
			fill: var(${this.props.fillProp}, ${this.props.fill});
			stroke: var(${this.props.strokeProp}, ${this.props.stroke});
		}
		:host svg {
			height: 100%;
			width: 100%;
		}`;
		return tpl(BrikElement.bind(this.shadowRoot), this, BrikElement);
	}
}
