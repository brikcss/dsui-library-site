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

// ----------
// Polyfills.
//
import 'document-register-element';
import '@webcomponents/shadydom/src/shadydom.js';

// -------
// Router.
//
import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

// ----------------
// Custom Elements.
//
import Page from '../../briks/page/page.js';
import PageViewport from '../../briks/page/page-viewport.js';
import PageContent from '../../briks/page/page-content.js';
import Overlay from '../../briks/overlay/overlay.js';
import Sidebar from '../../briks/page/sidebar.js';
import SuperNav from '../../briks/supernav/supernav.js';
import Icon from '../../briks/icons/icon.js';
import Header from '../../briks/header/header.js';
import BurgerButton from '../../briks/burger-button/burger-button.js';
import Scroller from '../../briks/scroller/scroller.js';
import Tabs from '../../briks/tabs';
import Editor from '../../briks/editor/editor.js';
import Code from '../../briks/editor/code.js';

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
	header: document.querySelector('brik-header'),
	supernav: document.querySelector('brik-super-nav'),
	leftbar: document.querySelector('brik-sidebar[side="left"]'),
	rightbar: document.querySelector('brik-sidebar[side="right"]'),
	rightSidebarToggle: document.querySelector('.toggle__right'),
	content: document.querySelector('brik-page-content')
};

/** ================================================================================================
 *  Router
 ** ------ */

app.router = createRouter(routes, {
	// allowNotFound: true,
	// autoCleanUp: true,
	defaultRoute: '404',
	// defaultParams: {},
	queryParams: {
		arrayFormat: 'default',
		nullFormat: 'default',
		booleanFormat: 'default'
	},
	queryParamsMode: 'default',
	trailingSlashMode: 'default',
	strictTrailingSlash: false,
	caseSensitive: true
});
app.router
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
		renderRoute(route, toState, fromState);
	});
	// Add route listener for each child route.
	(route.children || []).forEach((child) => {
		app.router.addRouteListener([route.name, child.name].join('.'), (toState, fromState) => {
			child.parent = route;
			renderRoute(child, toState, fromState);
		});
	});
});

function renderRoute(route, toState, fromState) {
	// Close sidebars.
	Object.keys(window.brikcss.sidebars).forEach((group) => {
		if (window.brikcss.sidebars[group].active) {
			window.brikcss.sidebars[group].active.active = false;
		}
	});
	// Update header.
	app.header.title = `${
		route.parent
			? (route.parent.title || route.parent.label) +
			  ' <brik-icon name="chevron-right" size="1.2em" fill="hsl(0, 0%, 100%)"></brik-icon> '
			: ''
	}${route.title || route.label || 'Unknown'}`;
	// Render route.
	if (typeof route.render === 'function') route.render(app, toState, fromState);
}

/** ================================================================================================
 *  Define custom elements
 ** ---------------------- */

Page.define();
PageViewport.define();
PageContent.define();
Overlay.define();
Sidebar.define();
SuperNav.define();
Scroller.define();
Tabs.define();
Editor.define();
Code.define();
Icon.define({ size: '4rem' });
BurgerButton.define();
Header.define();

/** ================================================================================================
 *  Build supernav links
 ** -------------------- */

app.supernav.props.links = routes.filter((route) => !route.hide);
app.supernav.render();

/** ================================================================================================
 *  Temporary
 ** --------- */

// Add temporary right sidebar toggle.
document.querySelectorAll('.toggle__right').forEach((element) => {
	element.addEventListener('click', () => {
		app.rightbar.active = !app.rightbar.active;
	});
});

// Render initial state.
const initialRoute = findRoute(routes, app.router.getState().name);
if (initialRoute.render) renderRoute(initialRoute);

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
				result.parent = route;
				return child.name === name.split('.')[1];
			});
		}
	});
	return result || routesArray[0];
}
