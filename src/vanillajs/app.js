/** ------------------------------------------------------------------------------------------------
 *  @filename  app.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  App entry for the vanillajs site.
 *  @tutorial  There are a few ways to import and define a Custom Element. Each module exports two
 *      methods, init(config) and define(tag, config). The init method configures the Custom Element
 *      and returns a configured class. The default export simply runs the init method with the
 *      default configuration. The define method calls the init method and then defines the Custom
 *      Element. This means you can import the module any of the following ways:
 *
 *      ```js
 *      // 1. Default export (custom config, auto definition):
 *  	import * as element from './element.js';
 *  	element.define({...});
 *  	// OR:
 *  	import {define as element} from './element.js';
 *  	element({...});
 *
 *  	// 2. Config method (custom config, manual definition):
 *  	import {config as element} from './element.js';
 *  	customElements.define(<tag name>, element({...}));
 *
 *  	// 3. Default export (default config, manual definition):
 *      import element from './element.js';
 *      customElements.define(<tag name>, element);
 *  	```
 *  @note  Polyfills needed:
 *         	- Custom Elements
 *         	- Shadow DOM
 *         	- Templates / slots
 *         	- Fetch
 *         	- Promise??
 *         	- Proxy object (https://github.com/tvcutsem/harmony-reflect)
 *         	- ES6 (Class?)
 ** --------------------------------------------------------------------------------------------- */

// -------------------
// Import dependencies.
//
// import 'document-register-element';
//
import Page from '../../briks/page/page.js';
import PageViewport from '../../briks/page/page-viewport.js';
import PageOverlay from '../../briks/page/page-overlay.js';
import Sidebar from '../../briks/page/sidebar.js';
import SuperNav from '../../briks/supernav/supernav.js';
import Icon from '../../briks/icons/icon.js';
import Header from '../../briks/header/header.js';
import BurgerButton from '../../briks/burger-button/burger-button.js';
import Scroller from '../../briks/scroller/scroller.js';
import BrikElement from '../../briks/brik-element/brik.js';

// ---------------------
// Global configuration.
//
window.brikcss = window.brikcss || {};

// -----------------------
// Define custom elements.
//
Page.define();
PageViewport.define();
PageOverlay.define();
Sidebar.define();
SuperNav.define();
Scroller.define();
// Icon.define({ size: '4rem' });
BrikElement.define(
	class extends Icon {
		get defaults() {
			return Object.assign({}, Icon.defaults, {
				size: '4rem'
			});
		}
	}
);
BurgerButton.define();

BrikElement.define(
	class Test extends BrikElement {
		get defaults() {
			return {
				height: '40px',
				width: '100%',
				backgroundColor: 'yellow',
				color: 'red'
			};
		}
		// define(Class) {
		// 	console.log('THIS:', Class.name);
		// 	customElements.define('brik-test', Class);
		// }
		created() {
			this.render();
		}
		connectedCallback() {
			setTimeout(() => {
				this.backgroundColor = 'pink';
			}, 1000);
			setTimeout(() => {
				this.setAttribute('background-color', 'orange');
			}, 2000);
			setTimeout(() => {
				this.backgroundColor = 'green';
			}, 3000);
			setTimeout(() => {
				this.setAttribute('background-color', 'lightgray');
			}, 4000);
		}
		attributeChangedCallback() {
			this.render();
		}
		render() {
			this.style = `display: inline-flex; align-items: center; justify-content: center; background-color: ${
				this.props.backgroundColor
			}; color: ${this.props.color}; height: ${this.props.height}; width: ${
				this.props.width
			};`;
		}
	}
);
Header.define();

// ---------------------
// Build supernav links.
//
const supernav = document.querySelector('brik-super-nav');
supernav.props.links = [
	{
		label: 'Home',
		href: '#!/home',
		icon: 'home'
	},
	{
		label: 'News',
		href: '#!/news',
		icon: 'newspaper'
	},
	{
		label: 'Business',
		icon: 'chart-line',
		menu: {
			title: 'Business',
			links: [
				{
					label: 'Team Dashboard',
					href: '#!/team-dashboard'
				},
				{
					label: 'Visual Tree',
					href: '#!/visual-tree'
				},
				{
					label: 'Report Center',
					href: '#!/report-center'
				},
				{
					label: 'Volume History',
					href: '#!/volume'
				},
				{
					label: 'Commission Earnings',
					href: '#!/earnings'
				},
				{
					label: 'Commission Checks',
					href: '#!/checks'
				},
				{
					label: 'Placement Suite',
					href: '#!/placement'
				},
				{
					label: 'New Enrollment',
					href: '#!/enrollment'
				}
			]
		}
	},
	{
		label: 'Orders',
		icon: 'cart',
		menu: {
			title: 'Orders',
			links: [
				{
					label: 'Place an Order',
					href: '#!/order'
				},
				{
					label: 'Manage Autoship',
					href: '#!/autoship'
				},
				{
					label: 'Order History',
					href: '#!/order-history'
				},
				{
					label: 'Marketing Mall',
					href: '#!/mall'
				},
				{
					label: 'Stock Out Status',
					href: '#!/stock-status'
				}
			]
		}
	},
	{
		label: 'Tools',
		icon: 'wrench',
		menu: {
			title: 'Tools',
			links: [
				{
					label: 'Documents & Media',
					href: '#!/docs-media'
				},
				{
					label: 'Calendar',
					href: '#!/calendar'
				},
				{
					label: 'Community',
					href: '#!/community'
				},
				{
					label: 'Prospect Manager',
					href: '#!/prospects'
				},
				{
					label: 'Funnels Signup',
					href: '#!/funnels-sign-up'
				},
				{
					label: 'Funnels Login',
					href: '#!/funnels-login'
				},
				{
					label: 'Taxbot',
					href: '#!/taxbot'
				}
			]
		}
	},
	{
		label: 'Events',
		icon: 'calendar-text',
		menu: {
			title: 'Events',
			links: [
				{
					label: 'Weekly Call Schedule',
					href: '#!/weekly-calls'
				},
				{
					label: 'Meeting Calendar',
					href: '#!/calendar'
				}
			]
		}
	},
	{
		label: 'Training',
		icon: 'presentation',
		menu: {
			title: 'Training',
			links: [
				{
					label: 'Training Courses',
					href: '#!/training'
				},
				{
					label: 'Recorded Calls and Webinars',
					href: '#!/webinars'
				}
			]
		}
	},
	{
		label: 'Settings',
		icon: 'settings',
		menu: {
			title: 'Settings',
			links: [
				{
					label: 'Account',
					href: '#!/account'
				},
				{
					label: 'Marketing Site',
					href: '#!/marketing'
				},
				{
					label: 'Communication',
					href: '#!/communication'
				},
				{
					label: 'Billing',
					href: '#!/billing'
				}
			]
		}
	},
	{
		label: 'Support',
		icon: 'lifebuoy',
		menu: {
			title: 'Support',
			links: [
				{
					label: 'Contact Us',
					href: '#!/contact'
				},
				{
					label: 'Support Center',
					href: '#!/support'
				}
			]
		}
	},
	{
		label: 'Sign Out',
		href: '#!/sign-out',
		icon: 'power-standby',
		separator: true
	}
];
supernav.render();

// Add temporary right sidebar toggle.
const rightToggle = document.querySelector('.toggle__right');
const page = document.querySelector('brik-page');
rightToggle.addEventListener('click', () => {
	page.toggleSidebar('right');
});
