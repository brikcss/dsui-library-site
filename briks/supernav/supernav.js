import BrikElement from '../brik-element/brik.js';
import tpl from './supernav.tplit.html';
import baseStyles from './supernav.css';
import miniStyles from './supernav--mini.css';
import pinnedStyles from './supernav--pinned.css';

export default class SuperNav extends BrikElement {
	// Sets default props and observedAttributes.
	//
	// @param  {Boolean}  showMenus  Whether to permanently show supernav menus (false) or show them with a show/hide toggle.
	// @param  {String}  homePath  Path to home page.
	// @param  {String}  headerBackground  Path to header background-image.
	// @param  {Object}  user  User object to display in header, including user.name and user.id.
	// @param  {Objects Array}  links  Array of Objects which build the links and sublinks for the supernav.
	static get defaults() {
		return {
			showMenus: false,
			homePath: '#!/home',
			headerBackground:
				'https://az706994.vo.msecnd.net/wakaya/images/3751a9f5-5ea2-4f60-8b9d-71ab358d59cd',
			user: {
				name: 'Sam Space',
				id: '16D21'
			},
			links: [
				{
					label: 'Home',
					href: '#!/home',
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
			nav: this.shadowRoot.querySelector('.brik-supernav__item')
		};
		const sidebar = this.$.sidebar;
		// Cache miniAt and pinAt min/max query values to create proper media queries.
		this.props.miniAt = {
			min: sidebar.miniAt ? parseInt(sidebar.miniAt, 10) : false,
			max: false
		};
		this.props.pinAt = {
			min: sidebar.pinAt ? parseInt(sidebar.pinAt, 10) : false,
			max: false
		};
		if (this.props.miniAt.min && this.props.pinAt.min > this.props.miniAt.min) {
			this.props.miniAt.max = this.props.pinAt.min - 1;
		}
		if (this.props.pinAt.min && this.props.miniAt.min > this.props.pinAt.min) {
			this.props.pinAt.max = this.props.miniAt.min - 1;
		}
		this.updateState();
		['miniAt', 'pinAt'].forEach((key) => {
			const prop = this.props[key];
			prop.query = false;
			if (prop.min) {
				prop.query = `(min-width: ${prop.min}px)`;
				if (prop.max) {
					prop.query += ` and (max-width: ${prop.max}px)`;
				}
			}
		});
		// On window resize, if it's mini, remove any active state.
		window.addEventListener('resize', this.handleWindowResize);
		// Render it.
		this.render();
		this.router = this.$.page.router;
		this.$.page.addEventListener('page.root', this.handleRouteChange);
		this.$.page.addEventListener('on.sidebar-toggle', this.handleOnSidebarToggle);
	}

	// Clean up.
	disconnectedCallback() {
		window.removeEventListener('resize', this.handleWindowResize);
		this.$.page.removeEventListener('page.root', this.handleRouteChange);
		this.$.page.removeEventListener('on.sidebar-toggle', this.handleOnSidebarToggle);
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render() {
		this.props.css = baseStyles;
		if (this.props.miniAt.query) {
			this.props.css += `@media ${this.props.miniAt.query} {${miniStyles}}`;
		}
		if (this.props.pinAt.query) {
			this.props.css += `@media ${this.props.pinAt.query} {${pinnedStyles}}`;
		}
		return tpl(this.html, this, { wire: BrikElement.wire });
	}

	buildLinks(links = []) {
		this.props.links = links;
		this.render();
	}

	updateState() {
		const wasMini = this.props.isMini;
		const wasPinned = this.props.isPinned;
		// isMini?
		if (this.props.miniAt.min) {
			const windowWidth = window.innerWidth;
			this.props.isMini =
				windowWidth >= this.props.miniAt.min &&
				(this.props.miniAt.max === false || windowWidth <= this.props.miniAt.max);
		} else {
			this.props.isMini = false;
		}
		// isPinned?
		if (this.props.pinAt.min) {
			const windowWidth = window.innerWidth;
			this.props.isPinned =
				windowWidth >= this.props.pinAt.min &&
				(this.props.pinAt.max === false || windowWidth <= this.props.pinAt.max);
		} else {
			this.props.isPinned = false;
		}
		// active?
		if (this.props.isMini || this.props.isPinned) {
			this.props.active = true;
		} else if ((wasMini && !this.props.isMini) || (wasPinned && !this.props.isPinned)) {
			this.props.active = false;
		}
		// state?
		this.props.state = this.props.isPinned ? 'pinned' : this.props.isMini ? 'mini' : 'default';
		// If active menu does not have focus, close it.
		this.props.links.filter((link) => link.active).map((link) => {
			if (!link.focused || this.props.state === 'default') link.active = false;
			return link;
		});
	}

	handleRouteChange() {
		// console.log('ROOT PATH:', event.detail);
	}

	handleOnSidebarToggle(event) {
		this.props.active = event.detail === 'left';
		if (this.props.active) {
			this.shadowRoot.querySelector('.brik-supernav__close-button').focus();
		}
		this.render();
	}

	handleWindowResize() {
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
		this._resizeTimeout = setTimeout(() => {
			const wasMini = this.props.isMini;
			this.updateState();
			if (this.props.isMini || this.props.isPinned) {
				this.$.page.toggleSidebar('');
			}
			if (this.props.isMini !== wasMini) {
				this.render();
			}
		}, 200);
	}

	handleClose() {
		this.$.page.toggleSidebar('');
	}
}
