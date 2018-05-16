import BrikElement from '../brik-element/brik.js';

export default class Sidebar extends BrikElement {
	static get defaults() {
		return {
			pinAt: '',
			miniAt: ''
		};
	}

	// Element constructor.
	created() {
		this.props.side = this.getAttribute('side');
		this.attachShadow({ mode: 'open' });
		this.classList.add('brik-sidebar', 'brik-sidebar__' + this.props.side);
		this.$ = {
			page: this.parentNode
		};
		if (this.tagName !== 'BRIK-SIDEBAR') {
			this.$.page.$.sidebars[this.props.side] = this;
		}
		this.render();
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		let css = `:host {
			background-color: var(--sidebar-${this.props.side}-bg);
			height: 100vh;
			width: var(--sidebar-${this.props.side}-width);
			margin-${this.props.side}: calc(-1 * var(--sidebar-${this.props.side}-width));
			position: relative;
			will-change: transform, box-shadow;
			transform: translate3d(0, 0, 0);
			transition-property: transform, box-shadow;
			transition-duration: 350ms;
			transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);
			z-index: 10;
		}

		:host:before {
			content: '';
			background-color: inherit;
			position: absolute;
			top: 0;
			bottom: 0;
			${this.props.side}: -40px;
			/* stylelint-disable-next-line declaration-property-unit-whitelist */
			width: 40px;
		}

		:host-context([active-sidebar='${this.props.side}']) {
			box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
			transform: translate3d(${
				this.props.side === 'right'
					? 'calc(-1 * var(--sidebar-right-width))'
					: 'var(--sidebar-left-width)'
			}, 0, 0);
		}

		:host-context([active-sidebar='${this.props.side === 'left' ? 'right' : 'left'}']) {
			transform: translate3d(${
				this.props.side === 'left'
					? 'calc(-1 * var(--sidebar-left-push))'
					: 'var(--sidebar-right-push)'
			}, 0, 0);
		}`;
		if (this.props.miniAt) {
			css += `@media (min-width: ${this.props.miniAt}) {
				:host {
					width: var(--sidebar-mini-width);
					box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
					margin-${this.props.side}: 0;
					z-index: 1;
				}
				:host-context([active-sidebar]) {
					box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
				}
				:host-context([active-sidebar='${this.props.side}']) {
					transform: none;
				}
			}`;
		}
		if (this.props.pinAt) {
			css += `@media (min-width: ${this.props.pinAt}) {
				:host {
					box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.12);
					width: var(--sidebar-${this.props.side}-width);
					margin-${this.props.side}: 0;
					z-index: 1;
				}
				:host-context([active-sidebar='${this.props.side}']) {
					transform: none;
				}
				:host-context([active-sidebar]) {
				}
			}`;
		}
		return this.html`<slot></slot><style>${css}</style>`;
	}
}
