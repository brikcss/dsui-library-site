import BrikSidebar from '../sidebar/sidebar.js';
import { types, type } from '../brik-element';
import tpl from './supernav.tplit.html';
import styles from '../styles/styles.js';
import css, { miniNav, pinnedNav } from './supernav.css.js';

export default class Supernav extends BrikSidebar {
	static get props() {
		return Object.assign({}, super.props, {
			showSubmenus: types.boolean,
			homePath: type(Object.assign({}, types.string, { default: '#!/home' })),
			headerBackground: type(
				Object.assign({}, types.string, {
					default:
						'https://az706994.vo.msecnd.net/wakaya/images/3751a9f5-5ea2-4f60-8b9d-71ab358d59cd'
				})
			),
			user: type(
				Object.assign({}, types.object, {
					attribute: false,
					default: {
						name: 'Sam Space',
						id: '16D21'
					}
				})
			),
			linkPrefix: type(Object.assign({}, types.string, { default: '#!' })),
			links: type(
				Object.assign({}, types.array, {
					attribute: false,
					default: [
						{
							name: 'Home',
							path: '#!/home',
							icon: 'home'
						}
					]
				})
			)
		});
	}

	connectedCallback() {
		// Call the sidebar's connectedCallback().
		super.connectedCallback();
		if (document.querySelectorAll('brik-super-nav').length > 1) {
			throw new Error('Only one <brik-super-nav/> element allowed on a page.');
		}
		// Extend sidebar's dom.
		this.dom.nav = this.shadowRoot.querySelector('.brik-supernav__item');
		// Add events.
		this.addEventListener('on.toggle-left-sidebar', this.events.onToggle);
		// Create supernav stylesheet.
		this.cssNav = styles.createStyleSheet(css, { classNamePrefix: 'brik-supernav-' });
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('on.toggle-left-sidebar', this.events.onToggle);
	}

	get events() {
		return Object.assign({}, super.events, {
			onToggle: () => {
				this.render();
				if (this.active && !this.state.isMini) {
					this.shadowRoot.querySelector('.' + this.cssNav.classes.close).focus();
				}
			},
			click: () => {
				this.active = false;
			},
			onClickLink: (event) => {
				if (this.showSubmenus) return;
				const link = this.links[event.currentTarget.dataset.index];
				const lastActiveLink = this.links.find(
					(link, n) => n !== event.currentTarget.dataset.index && link.active
				);
				if (lastActiveLink) lastActiveLink.active = false;
				link.active = !link.active;
				this.render();
			},
			onFocusLink: (event) => {
				this.links[event.currentTarget.dataset.index].focused = true;
			},
			onBlurLink: (event) => {
				this.links[event.currentTarget.dataset.index].focused = false;
			},
			onFocusSublink: (event) => {
				const data = event.currentTarget.dataset;
				this.links[data.parent].focused = true;
				if (!this.state.isMini) return;
				this.links[data.parent].active = true;
				this.render();
			},
			onBlurSublink: (event) => {
				const data = event.currentTarget.dataset;
				this.links[data.parent].focused = false;
				if (!this.state.isMini) return;
				this.links[data.parent].active = false;
				this.render();
			},
			onClickSublink: (event) => {
				const data = event.currentTarget.dataset;
				if (this.activeMenuLink) this.activeMenuLink.active = false;
				this.links[data.parent].children[data.index].active = true;
				this.activeMenuLink = this.links[data.parent].children[data.index];
				if (this.state.isMini) {
					this.links[data.parent].focused = false;
					this.state.inactiveMenu = true;
					event.currentTarget.blur();
				}
				this.render();
			},
			onHoverNav: () => {
				this.state.inactiveMenu = false;
				this.render();
			}
		});
	}

	render() {
		this.state.isMini = this.state.mode === 'mini';
		this.state.isPinned = this.state.mode === 'pinned';
		this.state.theme = 'dark';
		// Add mini modifier.
		if (this.state.miniAtQuery && this.state.miniAtQuery !== this.state.miniAtRule) {
			if (this.state.miniAtRule) this.cssNav.deleteRule(this.state.miniAtRule);
			this.state.miniAtRule = this.state.miniAtQuery;
			this.cssNav.addRule(this.state.miniAtRule, miniNav);
		}
		// Add pinned modifier.
		if (this.state.pinAtQuery && this.state.pinAtQuery !== this.state.pinAtRule) {
			if (this.state.pinAtRule) this.cssNav.deleteRule(this.state.pinAtRule);
			this.state.pinAtRule = this.state.pinAtQuery;
			this.cssNav.addRule(this.state.pinAtRule, pinnedNav);
		}
		this.cssNav.update(this.props);
		return tpl(this.bind(this.root), this);
	}

	buildLinks(links = []) {
		this.links = links;
		this.render();
	}
}
