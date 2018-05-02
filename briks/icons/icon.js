import BrikElement from '../brik-element/brik.js';
import tpl from './icon.tplit.html';

export default class Icon extends BrikElement {
	// Sets default props and observedAttributes.
	static get defaults() {
		return {
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
		this.updateSvg();
	}

	// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
	attributeChangedCallback(attr) {
		attr === 'name' ? this.updateSvg() : this.render();
	}

	updateSvg() {
		if (!window.brikcss.icons[this.props.name]) {
			return (window.brikcss.icons[this.props.name] = fetch(
				new Request(this.props.svgDir + this.props.name + '.svg', {
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
					window.brikcss.icons[this.props.name] = svg;
					this.render();
					return svg;
				}));
		} else if (window.brikcss.icons[this.props.name] instanceof Promise) {
			return (window.brikcss.icons[this.props.name] = window.brikcss.icons[
				this.props.name
			].then((svg) => {
				this.render();
				return svg;
			}));
		} else {
			this.render();
		}
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
		return tpl(
			BrikElement.bind(this.shadowRoot),
			Object.assign({ svg: [window.brikcss.icons[this.props.name]] }, this.props)
		);
	}
}
