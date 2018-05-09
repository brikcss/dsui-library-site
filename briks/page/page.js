import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';
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
		// Cache sidebars.
		this.$ = {
			overlay: this.shadowRoot.querySelector('brik-page-overlay'),
			sidebars: {}
		};
		this.querySelectorAll('brik-sidebar').forEach((sidebar) => {
			this.$.sidebars[sidebar.getAttribute('side')] = sidebar;
		});
		this.addEventListener('sidebars.toggle', this.toggleSidebar);
		this.render();
	}

	connectedCallback() {
		this.router = this.buildRoutes(
			[
				{
					name: 'home',
					path: '/home'
				},
				{
					name: 'about',
					path: '/about'
				},
				{
					name: 'not-found',
					path: '/not-found'
				},
				{
					name: 'user',
					path: '/:userid'
				},
				{
					name: 'user.edit',
					path: '/:userid/edit'
				},
				{
					name: 'users',
					path: '/users'
				}
			],
			{
				allowNotFound: false,
				autoCleanUp: true,
				defaultRoute: 'home',
				defaultParams: {},
				queryParams: {
					arrayFormat: 'default',
					nullFormat: 'default',
					booleanFormat: 'default'
				},
				queryParamsMode: 'default',
				trailingSlashMode: 'default',
				strictTrailingSlash: false,
				caseSensitive: true
			}
		)
			.usePlugin(
				browserPlugin({
					useHash: true,
					hashPrefix: '!',
					// base:
					preserveHash: true,
					mergeState: false
				})
			)
			.usePlugin(listenersPlugin())
			.start();

		// this.router.addNodeListener('', (to, from) => {
		// 	console.log('PAGE LISTENER:', to, from);
		// });

		setTimeout(() => {
			this.toggleSidebar('right');
		}, 1000);
		setTimeout(() => {
			this.toggleSidebar('');
		}, 2000);
		setTimeout(() => {
			this.toggleSidebar('left');
		}, 3000);
		setTimeout(() => {
			this.toggleSidebar('');
		}, 4000);
	}

	disconnectedCallback() {
		this.removeEventListener('sidebars.toggle', this.toggleSidebar);
		this.$.overlay.removeEventListener('click', this.handleOverlayClick);
	}

	buildRoutes(routes = [], options = {}) {
		return createRouter(routes, options);
	}

	handleOverlayClick() {
		this.toggleSidebar('');
	}

	toggleSidebar(side) {
		// Side can come from event.detail or be passed explicitly as a string.
		side =
			typeof side === 'object'
				? event.detail
				: side === undefined ? this.activeSidebar : side;
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
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		this.props.css = `:host {
			--sidebar-bg: hsl(0, 0%, 100%);
			--sidebar-width: 30rem;
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
