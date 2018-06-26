import BrikElement from '../brik-element/brik.js';
import tpl from './supernav.tplit.html';
import styles from '../styles/styles.js';
import css, { miniNav, pinnedNav } from './supernav.css.js';
// import baseStyles from './supernav.css';
// import miniStyles from './supernav--mini.css';
// import pinnedStyles from './supernav--pinned.css';

export default class Supernav extends BrikElement {
	static get defaults() {
		return {
			showSubmenus: false,
			homePath: '#!/home',
			headerBackground:
				'https://az706994.vo.msecnd.net/wakaya/images/3751a9f5-5ea2-4f60-8b9d-71ab358d59cd',
			user: {
				name: 'Sam Space',
				id: '16D21'
			},
			linkPrefix: '#!',
			links: [
				{
					name: 'Home',
					path: '#!/home',
					icon: 'home'
				}
			]
		};
	}

	static get observedAttributes() {
		return ['user', 'header-background', 'show-menus'];
	}

	// Element constructor.
	created() {
		if (document.querySelectorAll('brik-super-nav').length > 1) {
			throw new Error('Only one <brik-super-nav/> element allowed on a page.');
		}
		this.attachShadow({ mode: 'open' });
		this.$ = {
			sidebar: this.parentNode,
			page: this.parentNode.parentNode,
			viewport: document.querySelector('brik-viewport'),
			nav: this.shadowRoot.querySelector('.brik-supernav__item')
		};
		// Add events.
		this.$.sidebar.addEventListener('on.toggle-left-sidebar', this.handleToggle);
		// Create stylesheet.
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-supernav-' });
		// Render it.
		this.render();
	}

	// Clean up.
	disconnectedCallback() {
		this.$.sidebar.removeEventListener('on.toggle-left-sidebar', this.handleToggle);
	}

	handleToggle() {
		this.render();
		if (this.props.active && !this.props.isMini) {
			this.shadowRoot.querySelector('.' + this.css.classes.close).focus();
		}
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		const sidebar = this.$.sidebar;
		this.props.active = sidebar.active;
		this.props.state = sidebar.props.state;
		this.props.isMini = sidebar.props.state === 'mini';
		this.props.isPinned = sidebar.props.state === 'pinned';
		// Add mini modifier.
		if (sidebar.props.miniAtQuery && sidebar.props.miniAtQuery !== this.props.miniAtRule) {
			if (this.props.miniAtRule) this.css.deleteRule(this.props.miniAtRule);
			this.props.miniAtRule = sidebar.props.miniAtQuery;
			this.css.addRule(this.props.miniAtRule, miniNav);
		}
		// Add pinned modifier.
		if (sidebar.props.pinAtQuery && sidebar.props.pinAtQuery !== this.props.pinAtRule) {
			if (this.props.pinAtRule) this.css.deleteRule(this.props.pinAtRule);
			this.props.pinAtRule = sidebar.props.pinAtQuery;
			this.css.addRule(this.props.pinAtRule, pinnedNav);
		}
		this.css.update(this.props);
		return tpl(this.html, this, { wire: BrikElement.wire });
	}

	buildLinks(links = []) {
		this.props.links = links;
		this.render();
	}

	handleClose() {
		this.$.sidebar.active = false;
	}
}
