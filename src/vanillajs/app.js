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

/** ================================================================================================
 *  Dependencies
 ** ------------ */

// -------------------
// Modules and Classes.
//

import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

// import 'document-register-element';
import Page from '../../briks/page/page.js';
import PageViewport from '../../briks/page/page-viewport.js';
import PageContent from '../../briks/page/page-content.js';
import PageOverlay from '../../briks/page/page-overlay.js';
import Sidebar from '../../briks/page/sidebar.js';
import SuperNav from '../../briks/supernav/supernav.js';
import Icon from '../../briks/icons/icon.js';
import Header from '../../briks/header/header.js';
import BurgerButton from '../../briks/burger-button/burger-button.js';
import Scroller from '../../briks/scroller/scroller.js';
import Tabs from '../../briks/tabs';
import BrikElement from '../../briks/brik-element/brik.js';

// ------
// Routes.
//
import routes from './routes';

/** ================================================================================================
 *  Global configuration
 ** -------------------- */

window.brikcss = window.brikcss || {};

/** ================================================================================================
 *  Set up app
 ** ---------- */

const app = {
	page: document.querySelector('brik-page'),
	supernav: document.querySelector('brik-super-nav'),
	rightSidebarToggle: document.querySelector('.toggle__right'),
	content: document.querySelector('brik-page-content')
};

/** ================================================================================================
 *  Router
 ** ------ */

app.router = createRouter(routes, {
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
})
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

routes.forEach((route) => {
	// Add route listener for root routes, node listener for route that has children.
	let listenerType = 'addRouteListener';
	if (route.children) listenerType = 'addNodeListener';
	app.router[listenerType](route.name, (toState, fromState) => {
		// Close sidebars.
		app.page.toggleSidebar('');
		if (typeof route.render === 'function') route.render(app, toState, fromState);
	});
	// Add route listener for each child route.
	(route.children || []).forEach((child) => {
		app.router.addRouteListener([route.name, child.name].join('.'), (toState, fromState) => {
			// Close sidebars.
			app.page.toggleSidebar('');
			if (typeof child.render === 'function') child.render(app, toState, fromState);
		});
	});
});

/** ================================================================================================
 *  Define custom elements
 ** ---------------------- */

Page.define();
PageViewport.define();
PageContent.define();
PageOverlay.define();
Sidebar.define();
SuperNav.define();
Scroller.define();
Tabs.define();
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

/** ================================================================================================
 *  Build supernav links
 ** -------------------- */

app.supernav.props.links = routes;
app.supernav.render();

/** ================================================================================================
 *  Temporary
 ** --------- */

// Add temporary right sidebar toggle.
app.rightSidebarToggle.addEventListener('click', () => {
	app.page.toggleSidebar('right');
});

// Render initial state.
const initialRoute = findRoute(routes, app.router.getState().name);
if (initialRoute.render) initialRoute.render(app);

function findRoute(routesArray, name) {
	let result;
	routesArray.find((route) => {
		if (route.name === name) {
			result = route;
			return true;
		}
		if (name.includes('.') && name.split('.')[0] === route.name && route.children) {
			return route.children.find((child) => {
				result = child;
				return child.name === name.split('.')[1];
			});
		}
	});
	return result || routesArray[0];
}
