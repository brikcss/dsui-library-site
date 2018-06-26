import BrikElement from '../brik-element/brik.js';
import css from './sidebar.css.js';
import styles from '../styles/styles.js';

export default class Sidebar extends BrikElement {
	static get defaults() {
		return {
			side: 'left',
			active: false,
			group: 'page',
			pinAt: '',
			pinAtMax: '',
			miniAt: '',
			miniAtMax: '',
			state: '' // 'mini' || 'pinned' || 'off-canvas'
		};
	}

	static get observedAttributes() {
		return ['active'];
	}

	attributeChangedCallback() {
		const activeSidebar = window.brikcss.sidebars[this.props.group].active;
		if (
			activeSidebar &&
			(activeSidebar.props.group !== this.props.group ||
				activeSidebar.props.side !== this.props.side)
		) {
			activeSidebar.active = false;
			window.brikcss.sidebars[this.props.group].active = null;
		}
		// this.active = value === true || value === 'true';
		if (this.active) window.brikcss.sidebars[this.props.group].active = this;
		this.render();
		this.dom.overlay.active = this.active;
		this.dispatchEvent(this._toggleEvent);
	}

	// Element constructor.
	created() {
		// Set up.
		window.brikcss.sidebars = window.brikcss.sidebars || {};
		window.brikcss.sidebars[this.props.group] = window.brikcss.sidebars[this.props.group] || {
			active: null,
			all: []
		};
		// Create stylesheet and build dom.
		this.css = styles.createStyleSheet(css(this.props), { classNamePrefix: 'brik-' });
		this.attachShadow({ mode: 'open' });
		this.style.display = 'inline-flex';
		this.dom = {
			parent: this.parentNode,
			overlay: this.parentNode.querySelector('brik-overlay'),
			viewport: document.querySelector('brik-page-viewport')
		};
		if (!this.dom.overlay) {
			this.dom.overlay = document.createElement('brik-overlay');
			this.dom.parent.appendChild(this.dom.overlay);
		}
		// Cache this sidebar to the page element.
		if (this.tagName !== 'BRIK-SIDEBAR') {
			this.dom.parent.$.sidebars[this.props.side] = this;
		}
		// Update the state.
		this.updateState(true);
		// Add events.
		this._toggleEvent = new CustomEvent('on.toggle-' + this.props.side + '-sidebar', {
			detail: this.props.side,
			composed: true,
			bubbles: true
		});
		this.dom.overlay.addEventListener('click', this.handleOverlayClick);
		window.addEventListener('resize', this.handleWindowResize);
		window.addEventListener('sidebar.' + this.props.side + '.toggle', this.handleToggle);
		// Render to dom.
		this.render();
	}

	disconnectedCallback() {
		this.dom.overlay.removeEventListener('click', this.handleOverlayClick);
		window.removeEventListener('resize', this.handleWindowResize);
		window.removeEventListener('sidebar.' + this.props.side + '.toggle', this.handleToggle);
	}

	handleToggle(event) {
		this.active = typeof event.detail === 'boolean' ? event.detail : !this.active;
	}

	handleOverlayClick() {
		window.brikcss.sidebars[this.props.group].active.active = false;
	}

	handleWindowResize() {
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
		this._resizeTimeout = setTimeout(() => {
			const wasMini = this.props.state === 'mini';
			this.updateState();
			if (this.active) this.active = false;
			if (this.props.state !== wasMini) {
				this.render();
				// @todo  For some reason, Firefox was not firing another window resize event listener in the supernav element, which is why this was moved here. This should really be moved back inside supernav somehow, but needs to work with Firefox.
				const supernav =
					this.querySelector('brik-super-nav') ||
					this.shadowRoot.querySelector('brik-super-nav');
				if (supernav) {
					supernav.render();
				}
			}
		}, 200);
	}

	updateState(buildQueries) {
		const windowWidth = window.innerWidth;
		this.props.miniAtMax =
			this.props.miniAtMax || this.props.pinAt
				? parseInt(this.props.pinAt, 10) - 1 + 'px'
				: undefined;
		// Build queries.
		if (buildQueries) {
			this.props.miniAtMax =
				this.props.miniAtMax || this.props.pinAt
					? parseInt(this.props.pinAt, 10) - 1 + 'px'
					: undefined;
			['mini', 'pin'].forEach((key) => {
				if (!this.props[key + 'At']) return;
				this.props[key + 'AtQuery'] = `@media (min-width: ${this.props[key + 'At']})${
					this.props[key + 'AtMax']
						? ` and (max-width: ${this.props[key + 'AtMax']})`
						: ''
				}`;
			});
		}
		// Determine current state.
		if (
			windowWidth >= parseInt(this.props.miniAt, 10) &&
			(!this.props.miniAtMax || windowWidth <= parseInt(this.props.miniAtMax, 10))
		) {
			this.props.state = 'mini';
		} else if (
			windowWidth >= parseInt(this.props.pinAt, 10) &&
			(!this.props.pinAtMax || windowWidth <= parseInt(this.props.pinAtMax, 10))
		) {
			this.props.state = 'pinned';
		} else {
			this.props.state = 'off-canvas';
		}
		// Determine if it is currently active.
		if (['mini', 'pinned'].includes(this.props.state)) {
			this.dom.viewport.width = `calc(100% - var(--sidebar-${this.props.state}-width))`;
		} else {
			this.dom.viewport.width = '100%';
		}
		// If active menu does not have focus, close it.
		// @todo Need to fix this.
		// this.props.links.filter((link) => link.active).map((link) => {
		// 	if (!link.focused || this.props.state === 'default') link.active = false;
		// 	return link;
		// });
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		return this.html`<div class="${`${this.css.classes.sidebar} ${
			this.active ? this.css.classes.active : ''
		}`}">
			<slot></slot>
		</div>
		<style>${this.css.toString()}</style>`;
	}
}
