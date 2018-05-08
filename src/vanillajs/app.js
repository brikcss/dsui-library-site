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
 ** --------------------------------------------------------------------------------------------- */

// -------------------
// Import dependencies.
//
// import 'document-register-element';
//
import Page from '../../briks/page/page.js';
import Sidebar from '../../briks/page/sidebar.js';
import PageContent from '../../briks/page/page-content.js';
import Icon from '../../briks/icons/icon.js';
import Header from '../../briks/header/header.js';
import BurgerButton from '../../briks/burger-button/burger-button.js';
import Scroller from '../../briks/scroller/scroller.js';
import Content from '../../briks/content/content.js';
import BrikElement from '../../briks/brik-element/brik.js';

// ---------------------
// Global configuration.
//
window.brikcss = window.brikcss || {};

// -----------------------
// Define custom elements.
//
Page.define();
Sidebar.define();
Scroller.define();
// Icon.define({ size: '4rem' });
BrikElement.define(
	class extends Icon {
		static get defaults() {
			return Object.assign({}, Icon.defaults, {
				size: '4rem'
			});
		}
	}
);
PageContent.define();
BurgerButton.define();

BrikElement.define(
	class Test extends BrikElement {
		static get defaults() {
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
Content.define();
