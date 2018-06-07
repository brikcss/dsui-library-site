import BrikElement from '../brik-element/brik.js';
import tpl from './page.tplit.html';

export default class Page extends BrikElement {
	static get defaults() {
		return {
			activeSidebar: ''
		};
	}

	// Create the Custom Element.
	created() {
		if (!document.querySelector('brik-page')) {
			throw new Error('Only one <brik-page/> element allowed on a page.');
		}
		this.attachShadow({ mode: 'open' });
		this.render();
		// Create empty cache for sidebars. Sidebars will populate these as they are created.
		// @todo  Is there a better way to have the page cache sidebars itself? The problem is light DOM props are not available yet (on child sidebars).
		this.$ = {
			overlay: this.shadowRoot.querySelector('.brik-page__overlay'),
			sidebars: {}
		};
		Array.from(this.children).forEach((element) => {
			if (element.tagName === 'BRIK-SIDEBAR') {
				this.$.sidebars[element.getAttribute('side')] = element;
			}
		});
		this.addEventListener('sidebars.toggle', this.toggleSidebar);
	}

	connectedCallback() {
		// setTimeout(() => {
		// 	this.toggleSidebar('right');
		// }, 1000);
		// setTimeout(() => {
		// 	this.toggleSidebar('');
		// }, 2000);
		// setTimeout(() => {
		// 	this.toggleSidebar('left');
		// }, 3000);
		// setTimeout(() => {
		// 	this.toggleSidebar('');
		// }, 4000);
	}

	disconnectedCallback() {
		this.removeEventListener('sidebars.toggle', this.toggleSidebar);
		this.$.overlay.removeEventListener('click', this.handleOverlayClick);
	}

	attributeChangedCallback(prop, oldValue, value) {
		const falsy = ['', null];
		if (oldValue === value || (falsy.indexOf(oldValue) > -1 && falsy.indexOf(value) > -1))
			return;
		if (prop === 'activeSidebar') {
			this.dispatchEvent(
				new CustomEvent('on.sidebar-toggle', {
					detail: this.props.activeSidebar,
					composed: true,
					bubbles: true
				})
			);
		}
	}

	handleOverlayClick() {
		this.toggleSidebar('');
	}

	toggleSidebar(side) {
		// Side can come from event.detail or be passed explicitly as a string.
		side =
			typeof side === 'object'
				? event.detail
				: side === undefined
					? this.activeSidebar
					: side;
		// If side is already '', don't do anything.
		if (side === '' && this.activeSidebar === '') return;
		// Get values.
		const windowWidth = window.innerWidth;
		const sidebar = this.$.sidebars[side];
		const isPinned = sidebar && sidebar.pinAt && parseInt(sidebar.pinAt, 10) <= windowWidth;
		const isMini = sidebar && sidebar.miniAt && parseInt(sidebar.miniAt, 10) <= windowWidth;
		// Don't do anything if the sidebar is pinned.
		if (isPinned || isMini) {
			return;
		}
		// Otherwise set the active sidebar prop.
		this.activeSidebar = this.activeSidebar === side ? '' : side;
		if (this.activeSidebar === '') this.removeAttribute('active-sidebar');
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		this.props.css = `:host {
			--sidebar-bg: hsl(0, 0%, 100%);
			--sidebar-width: 35rem;
			--sidebar-mini-width: 12rem;
			--sidebar-push-content: 0;
			--sidebar-left-bg: var(--sidebar-bg);
			--sidebar-left-width: var(--sidebar-width);
			--sidebar-left-push: var(--sidebar-push-content);
			--sidebar-right-bg: var(--sidebar-bg);
			--sidebar-right-width: var(--sidebar-width);
			--sidebar-right-push: var(--sidebar-push-content);
			display: flex;
			height: 100vh;
			width: 100vw;
			overflow: hidden;
		}`;
		return tpl(BrikElement.bind(this.shadowRoot), this);
	}
}
