import { Brik, propsMixin, renderMixin, eventsMixin, types, type } from '../brik-element';
import css from './sidebar.css.js';
import styles from '../styles/styles.js';

export default class Sidebar extends Brik().with(propsMixin, renderMixin, eventsMixin) {
	static get props() {
		return {
			side: type(Object.assign({}, types.string, { default: 'left' })),
			active: types.boolean,
			group: type(Object.assign({}, types.string, { default: 'page' })),
			pinAt: types.string,
			pinAtMax: types.string,
			miniAt: types.string,
			miniAtMax: types.string
		};
	}

	connectedCallback() {
		// Set up.
		window.brikcss.sidebars = window.brikcss.sidebars || {};
		window.brikcss.sidebars[this.group] = window.brikcss.sidebars[this.group] || {
			active: null,
			all: []
		};
		this.state.mode = 'off-canvas'; // 'mini' || 'pinned' || 'off-canvas'
		// Create stylesheet and build dom.
		this.css = styles.createStyleSheet(css(this), { classNamePrefix: 'brik-' });
		this.attachShadow({ mode: 'open' });
		this.style.display = 'inline-flex';
		this.dom = {
			parent: this.parentNode,
			overlay: this.parentNode.querySelector('brik-overlay'),
			viewport: document.querySelector('brik-viewport')
		};
		if (!this.dom.overlay) {
			this.dom.overlay = document.createElement('brik-overlay');
			this.dom.parent.appendChild(this.dom.overlay);
		}
		// Cache this sidebar to the page element.
		// if (this.tagName !== 'BRIK-SIDEBAR') {
		// 	this.dom.parent.$.sidebars[this.side] = this;
		// }
		// Update the state.
		this.updateState(true);
		// Add events.
		this.dom.overlay.addEventListener('click', this.events.clickOverlay);
		window.addEventListener('resize', this);
		window.addEventListener('sidebar.' + this.side + '.toggle', this.events.toggle);
		// Render to dom.
		this.render();
	}

	disconnectedCallback() {
		this.dom.overlay.removeEventListener('click', this.events.clickOverlay);
		window.removeEventListener('resize', this);
		window.removeEventListener('sidebar.' + this.side + '.toggle', this.events.toggle);
	}

	get events() {
		return {
			clickOverlay: () => {
				window.brikcss.sidebars[this.group].active.active = false;
			},
			resizeWindow: () => {
				if (this._resizeTimeout) {
					clearTimeout(this._resizeTimeout);
				}
				this._resizeTimeout = setTimeout(() => {
					const wasMini = this.state.mode === 'mini';
					this.updateState();
					if (this.active) this.active = false;
					if (this.state.mode !== wasMini) {
						this.render();
						// @todo  For some reason, Firefox was not firing another window resize event listener in the supernav element, which is why this was moved here. This should really be moved back inside supernav somehow, but needs to work with Firefox.
						const supernav = this.root.querySelector('brik-supernav');
						if (supernav) {
							supernav.render();
						}
					}
				}, 200);
			},
			toggle: (event) => {
				this.active = typeof event.detail === 'boolean' ? event.detail : !this.active;
			},
			onToggle: () => {
				this.dispatchEvent(
					new CustomEvent('on.toggle-' + this.side + '-sidebar', {
						detail: this.side,
						composed: true,
						bubbles: true
					})
				);
			}
		};
	}

	updateState(buildQueries) {
		const windowWidth = window.innerWidth;
		this.miniAtMax =
			this.miniAtMax || this.pinAt ? parseInt(this.pinAt, 10) - 1 + 'px' : undefined;
		// Build queries.
		if (buildQueries) {
			this.miniAtMax =
				this.miniAtMax || this.pinAt ? parseInt(this.pinAt, 10) - 1 + 'px' : undefined;
			['mini', 'pin'].forEach((key) => {
				if (!this[key + 'At']) return;
				this.state[key + 'AtQuery'] = `@media (min-width: ${this[key + 'At']})${
					this[key + 'AtMax'] ? ` and (max-width: ${this[key + 'AtMax']})` : ''
				}`;
			});
		}
		// Determine current state.
		if (
			windowWidth >= parseInt(this.miniAt, 10) &&
			(!this.miniAtMax || windowWidth <= parseInt(this.miniAtMax, 10))
		) {
			this.state.mode = 'mini';
		} else if (
			windowWidth >= parseInt(this.pinAt, 10) &&
			(!this.pinAtMax || windowWidth <= parseInt(this.pinAtMax, 10))
		) {
			this.state.mode = 'pinned';
		} else {
			this.state.mode = 'off-canvas';
		}
		// Determine if it is currently active.
		if (['mini', 'pinned'].includes(this.state.mode)) {
			this.dom.viewport.width = `calc(100% - var(--sidebar-${this.state.mode}-width))`;
		} else {
			this.dom.viewport.width = '100%';
		}
		// If active menu does not have focus, close it.
		// @todo Need to fix this.
		// this.props.links.filter((link) => link.active).map((link) => {
		// 	if (!link.focused || this.state.mode === 'default') link.active = false;
		// 	return link;
		// });
	}

	rendering() {
		const activeSidebar = window.brikcss.sidebars[this.group].active;
		if (
			activeSidebar &&
			(activeSidebar.group !== this.group || activeSidebar.side !== this.side)
		) {
			activeSidebar.active = false;
			window.brikcss.sidebars[this.group].active = null;
		}
		// this.active = value === true || value === 'true';
		if (this.active) window.brikcss.sidebars[this.group].active = this;
	}

	rendered(prevProps) {
		if (Boolean(prevProps.active) !== Boolean(this.active)) {
			this.dom.overlay.active = this.active;
			this.events.onToggle();
		}
	}

	render() {
		return this.bind(this.root)`<div class="${`${this.css.classes.sidebar} ${
			this.active ? this.css.classes.active : ''
		}`}">
			<slot></slot>
		</div>
		<style>${this.css.toString()}</style>`;
	}
}
