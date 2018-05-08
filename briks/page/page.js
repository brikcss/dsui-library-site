import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';
import BrikElement from '../brik-element/brik.js';
import tpl from './page.tplit.html';
import stylesheet from './page.css';

export default class Page extends BrikElement {
	static get defaults() {
		return {
			sidebarActive: '',
			pinLeftAt: '',
			pinRightAt: ''
		};
	}

	// Create the Custom Element.
	created() {
		if (!document.querySelector('brik-page')) {
			throw new Error('Only one <brik-page/> element allowed on a page.');
		}
		this.attachShadow({ mode: 'open' });
		this.addEventListener('sidebars.toggle', this.toggle);
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

		this.$overlay = this.shadowRoot.querySelector('brik-page-overlay');
		setTimeout(() => {
			// this.update({ sidebarActive: 'right' }, { setAttr: true });
			this.sidebarActive = 'right';
		}, 1000);
		setTimeout(() => {
			// this.update({ sidebarActive: '' }, { setAttr: true });
			this.sidebarActive = '';
		}, 2000);
		setTimeout(() => {
			// this.update({ sidebarActive: 'left' }, { setAttr: true });
			this.sidebarActive = 'left';
		}, 3000);
		setTimeout(() => {
			// this.update({ sidebarActive: '' }, { setAttr: true });
			this.sidebarActive = '';
		}, 4000);
	}

	disconnectedCallback() {
		this.removeEventListener('sidebars.toggle', this.toggle);
		this.$overlay.removeEventListener('click', this.handleOverlayClick);
	}

	buildRoutes(routes = [], options = {}) {
		return createRouter(routes, options);
	}

	onSidebarActive(value) {
		this.dispatchEvent(
			new CustomEvent('sidebars.toggled', {
				detail: value,
				composed: true,
				bubbles: true
			})
		);
	}

	handleOverlayClick() {
		this.sidebarActive = '';
	}

	toggle(event) {
		const sidebar = event && event.detail ? event.detail : '';
		this.sidebarActive = this.sidebarActive === sidebar ? '' : sidebar;
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		this.props.css = stylesheet;
		if (this.props.pinLeftAt) {
			this.props.css += `@media (min-width: ${this.props.pinLeftAt}) {
				brik-page-content {
					min-width: 0;
				}
				.brik-sidebar__left {
					margin-left: 0;
				}
				:host([sidebarActive='left']) brik-page-content {
					transform: translate3d(0, 0, 0);
				}
				:host([sidebarActive='left']) .brik-sidebar__left {
					box-shadow: none;
					transform: none;
				}
				:host([sidebarActive='left']) .brik-sidebar__right {
					transform: none;
				}`;
			if (parseInt(this.props.pinLeftAt, 10) < parseInt(this.props.pinRightAt, 10)) {
				this.props.css += `brik-page-overlay { display: none; }`;
			}
			this.props.css += `}`;
		}
		if (this.props.pinRightAt) {
			this.props.css += `@media (min-width: ${this.props.pinRightAt}) {
				brik-page-content {
					min-width: 0;
				}
				.brik-sidebar__right {
					margin-right: 0;
				}
				:host([sidebarActive='right']) brik-page-content {
					transform: translate3d(0, 0, 0);
				}
				:host([sidebarActive='right']) .brik-sidebar__right {
					box-shadow: none;
					transform: none;
				}
				:host([sidebarActive='right']) .brik-sidebar__left {
					transform: none;
				}`;
			if (parseInt(this.props.pinRightAt, 10) < parseInt(this.props.pinLeftAt, 10)) {
				this.props.css += `brik-page-overlay { display: none; }`;
			}
			this.props.css += `}`;
		}
		return tpl(BrikElement.bind(this.shadowRoot), this);
	}
}
