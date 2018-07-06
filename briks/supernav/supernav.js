import { Brik, propsMixin, renderMixin, eventsMixin, types, type } from '../brik-element';
import tpl from './supernav.tplit.html';
import styles from '../styles/styles.js';
import css, { miniNav, pinnedNav } from './supernav.css.js';

export default class Supernav extends Brik().with(propsMixin, renderMixin, eventsMixin) {
	static get props() {
		return {
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
		};
	}

	connectedCallback() {
		if (document.querySelectorAll('brik-super-nav').length > 1) {
			throw new Error('Only one <brik-super-nav/> element allowed on a page.');
		}
		this.attachShadow({ mode: 'open' });
		this.dom = {
			sidebar: this.parentNode,
			page: this.parentNode.parentNode,
			viewport: document.querySelector('brik-viewport'),
			nav: this.shadowRoot.querySelector('.brik-supernav__item')
		};
		// Add events.
		this.dom.sidebar.addEventListener('on.toggle-left-sidebar', this.events.onToggle);
		// Create stylesheet.
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-supernav-' });
		// Render it.
		this.render();
	}

	disconnectedCallback() {
		this.dom.sidebar.removeEventListener('on.toggle-left-sidebar', this.events.onToggle);
	}

	get events() {
		return {
			onToggle: () => {
				this.render();
				if (this.state.active && !this.state.isMini) {
					this.shadowRoot.querySelector('.' + this.css.classes.close).focus();
				}
			},
			click: () => {
				this.dom.sidebar.active = false;
			}
		};
	}

	get tpl() {
		return tpl;
	}

	render() {
		const sidebar = this.dom.sidebar;
		this.state.active = sidebar.active;
		this.state.mode = sidebar.state.mode;
		this.state.isMini = sidebar.state.mode === 'mini';
		this.state.miniAtQuery = '';
		this.state.miniAtRule = '';
		this.state.pinAtQuery = '';
		this.state.pinAtRule = '';
		this.state.isPinned = sidebar.state.mode === 'pinned';
		this.state.theme = 'dark';
		// Add mini modifier.
		if (sidebar.state.miniAtQuery && sidebar.state.miniAtQuery !== this.state.miniAtRule) {
			if (this.state.miniAtRule) this.css.deleteRule(this.state.miniAtRule);
			this.state.miniAtRule = sidebar.state.miniAtQuery;
			this.css.addRule(this.state.miniAtRule, miniNav);
		}
		// Add pinned modifier.
		if (sidebar.state.pinAtQuery && sidebar.state.pinAtQuery !== this.state.pinAtRule) {
			if (this.state.pinAtRule) this.css.deleteRule(this.state.pinAtRule);
			this.state.pinAtRule = sidebar.state.pinAtQuery;
			this.css.addRule(this.state.pinAtRule, pinnedNav);
		}
		this.css.update(this.props);
		return super.render();
	}

	buildLinks(links = []) {
		this.links = links;
		this.render();
	}
}
