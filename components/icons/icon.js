import hyperhtml from 'hyperhtml';

const init = function(config = {}) {
	config = Object.assign(
		{
			cache: window.brikcss,
			size: '2rem',
			svgDir: './svg/',
			fill: 'hsla(0, 0%, 0%, 0.54)',
			fillProp: '--icon-fill',
			stroke: 'transparent',
			strokeProp: '--icon-stroke'
		},
		config
	);
	return class icon extends HTMLElement {
		constructor(...args) {
			super(...args);
			config.cache = config.cache || {};
			config.cache.icons = config.cache.icons || {};
			this.attachShadow({ mode: 'open' });
			this._state = {
				name: this.getAttribute('name') || '',
				size: this.getAttribute('size') || config.size,
				markup: ''
			};
		}

		static get observedAttributes() {
			return ['name', 'size'];
		}

		attributeChangedCallback(attr, oldValue, value) {
			if (oldValue !== value) {
				this.state[attr] = value;
				attr === 'name' ? this.updateSvg() : this.render();
			}
		}

		get state() {
			return this._state;
		}
		set state(state = {}) {
			Object.keys(state).forEach((key) => {
				if (key !== 'markup' && this.getAttribute(key) !== state[key]) {
					this.setAttribute(key, state[key]);
				}
				if (this._state[key] !== state[key]) {
					this._state[key] = state[key];
				}
			});
			this.render();
		}

		updateSvg() {
			if (!config.cache.icons[this.state.name]) {
				return (config.cache.icons[this.state.name] = fetch(
					new Request(config.svgDir + this.state.name + '.svg', {
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
						config.cache.icons[this.state.name] = svg;
						this.state = { markup: svg };
						return svg;
					}));
			} else if (config.cache.icons[this.state.name] instanceof Promise) {
				return (config.cache.icons[this.state.name] = config.cache.icons[
					this.state.name
				].then((svg) => {
					this.state = { markup: svg };
					return svg;
				}));
			} else {
				this.state = { markup: config.cache.icons[this.state.name] };
			}
		}

		updateCss(state = {}) {
			return `:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: ${state.size};
			width: ${state.size};
			fill: var(${config.fillProp}, ${config.fill});
			stroke: var(${config.strokeProp}, ${config.stroke});
		}
		:host svg {
			height: 100%;
			width: 100%;
		}`;
		}

		render() {
			return hyperhtml.bind(this.shadowRoot)`${[this.state.markup]}<style>${this.updateCss(
				this.state
			)}</style>`;
		}
	};
};

export { init };
export default init();
