/** ------------------------------------------------------------------------------------------------
 *  @filename  brik.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Extensible class to assist in creating Brikcss Custom Elements.
 *  @credit  Thank you to @WebReflection for the awesome HyperHTML set of libraries. Much of the
 *      inspiration for BrikElement was drawn from this work:
 *      https://github.com/WebReflection/hyperHTML-Element.
 *  @features  BrikElement extends HTMLElement with the following features:
 *             - created() replaces constructor(). No super(). Element is known to
 *               browser and you have full access to attributes and childNodes.
 *             - define() auto attaches observedAttributes from child's static get defaults().
 *             - props (this.props):
 *                 - observedAttributes are reflected (by default) in element attributes and props
 *                   and vice versa. This can be configured with config.reflect.attrs and
 *                   config.reflect.props (both can be set with `config.reflect = <boolean>`).
 *                 - props are automatically converted to camelCase, and attributes are converted
 *                   to kebab-case.
 *                 - update() updates props and (by default) calls render() after updating props. It
 *                   can optionally set attributes as well, in which case it will not call render().
 *                 - To summarize:
 *                     - For any observedAttribute, call `this[prop] = <value>` or
 *                       `this.setAttribute(...)` to update attr/prop and render().
 *                     - Call `this.update(props, {})` to update multiple props and optionally
 *                       render() (renders by default). Call `this.update(null, {})` to update all
 *                       props. This can optionally reflect props to attributes.
 *                     - For attributes that are not observed, props and attributes are not
 *                       reflected. This is useful to prevent unnecessary renders, but it also means
 *                       you will need to do the following after updating props or attributes:
 *                         - manually call update() and optionally reflect props to attributes.
 *                         - manually reflect props to attrs (hint: use the hyperhtml template).
 *                         - manually call render().
 *                 - NOTE: Generally do not set props with `this.props[prop] = ...;` since
 *                   attributes do not get reflected this way.
 *             - attributeChangedCallback is only called on child if the value changes.
 *             - Event handling:
 *                 - handleEvent() handles events by context. Ex: `onclick="${this}"` binds the
 *                   click event to this.shadowRoot, this._shadowRoot, or this.
 *                 - handle*() can handle any event (i.e., handleClick()). Ex:
 *                   `onclick="${this.handleClick}"`.
 *                 - data-call handles any event. Ex: `data-call="onAnyEvent"` binds any event to
 *                   the onAnyEvent(e) method.
 *                 - Event handling. Ex: `onclick=${this.handleClick}` binds click event to the
 *                   handleClick() method.
 *             - Flexible ways to call define(config, Class):
 *                 - Can be called on a Class or on BrikElement itself. Ex:
 *                     - `MyClass.define(...);`
 *                     - `BrikElement.define(...);`.
 *                 - Flexible ways of passing arguments:
 *                     - Config can be Object or String. String will set config.tag.
 *                     - config.tag can be omitted in favor of the Class name, converted to
 *                       kebab-case.
 *                     - Config can be omitted (and Class can be first argument).
 *                     - Or both config and Class can be omitted.
 *                     - Examples:
 *                         - `BrikElement.define('my-element', MyClass);
 *                         - `BrikElement.define({tag: 'my-element', ...}, MyClass);
 *                         - `MyClass.define({tag: 'my-element', ...});
 *                         - `MyClass.define();` // so long as MyClass has a define method.
 *                         - `BrikElement.define(MyClass); // so long as MyClass has define method.
 ** --------------------------------------------------------------------------------------------- */

import { Component, bind, define, hyper, wire } from 'hyperhtml';

class BrikElement extends HTMLElement {
	// Defines a Custom Element. Extensible with `class element extends BrikElement {}`. Define with
	// element.define('my-element', {...});
	static define(config = {}, Class) {
		// Allow flexible ways of passing arguments.
		if (typeof config === 'function') {
			Class = config;
			config = {};
		} else {
			Class = Class || this;
			if (typeof config === 'string') config = { tag: config };
		}

		// Set default config.
		window.brikcss = window.brikcss || {};
		config = Object.assign(
			{
				prefix: window.brikcss.prefix || 'brik',
				tag: Class.name ? camelToKebabCase(Class.name) : '',
				define: !Class.prototype.define
			},
			config
		);

		// Set default props.
		Class.prototype.props = Class.defaults || {};

		// observedAttributes create a mechanism to reflect attributes to props and vice versa. For
		// each observedAttributes, an accessor is defined at `this[prop]` which, when set, will
		// reflect the value to props. Note: attributes are converted to kebab-case, while props are
		// converted to camelCase.
		if (!Class.observedAttributes && Class.defaults && Object.keys(Class.defaults).length) {
			Class.observedAttributes = Object.keys(Class.defaults).map((prop) => {
				return camelToKebabCase(prop);
			});
		}
		if (
			typeof Class.observedAttributes === 'object' &&
			Object.keys(Class.observedAttributes).length
		) {
			Class.observedAttributes.forEach((attr) => {
				const prop = kebabToCamelCase(attr);
				if (!(prop in Class.prototype)) {
					Object.defineProperty(Class.prototype, prop, {
						configurable: true,
						get() {
							return this.props[prop];
						},
						set(value) {
							this.props[prop] = value;
							return this.setAttribute(attr, value);
						}
					});
				}
			});
		}

		// Wrapper around child's attributeChangedCallback to reflect attribute changes to props. It
		// also upgrade the child's attributeChangedCallback to only run if the value has changed,
		// which prevents triggering attributeChangedCallback more than once.
		// NOTE: In the initial render, attributes are not set in the DOM. This is because it
		// creates unnecessary renders and can bloat the markup. As soon as any attribute or prop
		// changes, however, it gets reflected in the DOM.
		const onChanged = Class.prototype.attributeChangedCallback;
		const hasChange = !!onChanged;
		Object.defineProperty(Class.prototype, 'attributeChangedCallback', {
			configurable: true,
			value(attr, oldValue, value) {
				if (created && !this._initialized) {
					checkReady.call(this, created);
				}
				if (oldValue !== value) {
					const prop = kebabToCamelCase(attr);
					const propCapitalized = prop.replace(/(?:^|\s)\S/g, function(a) {
						return a.toUpperCase();
					});
					this.props[prop] = value;
					if (hasChange) onChanged.call(this, prop, oldValue, value, attr);
					if (typeof this['on' + propCapitalized] === 'function') {
						this['on' + propCapitalized].call(this, value, oldValue, prop, attr);
					}
				}
			}
		});

		// Created() replaces constructor() and ensures the node is fully known to the browser. It
		// is ensured to run either after DOMContentLoaded or once there is a next sibling. This
		// ensures you have full access to element attributes and/or childNodes.
		const created = Class.prototype.created;
		if (created) {
			// Ensures create() is only called once.
			Object.defineProperty(Class.prototype, '_initialized', {
				configurable: true,
				writable: true,
				value: false
			});

			// Wrapper around child's connectedCallback to check if element has initialized.
			const onConnected = Class.prototype.connectedCallback;
			const hasConnect = !!onConnected;
			Object.defineProperty(Class.prototype, 'connectedCallback', {
				configurable: true,
				value() {
					if (!this._initialized) {
						checkReady.call(this, created);
					}
					if (hasConnect) {
						onConnected.apply(this, arguments);
					}
				}
			});
		}

		// Define lazily all handlers:
		// class { handleClick() { ... }
		// render() { `<a onclick=${this.handleClick}>` } }
		Object.getOwnPropertyNames(Class.prototype).forEach((key) => {
			if (/^handle[A-Z]/.test(key)) {
				const _key = '_' + key;
				const method = Class.prototype[key];
				Object.defineProperty(Class.prototype, key, {
					configurable: true,
					get() {
						return this[_key] || (this[_key] = method.bind(this));
					}
				});
			}
		});

		// handleEvent() allows you to pass the element itself as an EventListener:
		// https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
		// class Reactive extends BrikElement {
		//   oninput(e) { console.log(this, 'changed', e.target.value); }
		//   render() { this.html`<input oninput="${this}">`; }
		// }
		if (!('handleEvent' in Class.prototype)) {
			Object.defineProperty(Class.prototype, 'handleEvent', {
				configurable: true,
				value(event) {
					this[(event.currentTarget.dataset || {}).call || 'on' + event.type](event);
				}
			});
		}

		// If child has a define method, run it now. Also, in this case config.define will be set to
		// false, unless it is explicitly set to true. This means customElements.define() must be
		// called manually if child.define() exists (unless config.define is set to true).
		const onDefine = Class.prototype.define;
		const hasDefine = !!onDefine;
		if (hasDefine) {
			// Call child's define method.
			onDefine.apply(Class, arguments);
		}

		// Define the Custom Element.
		if (config.define) {
			customElements.define(
				`${config.prefix ? config.prefix + '-' : ''}${config.tag}`,
				Class
			);
		}

		return Class;
	}

	// Lazily bind hyperhtml to the element. This attaches to Shadow DOM element, if present, or the
	// element itself if no Shadow DOM is used. NOTE: If using a closed Shadow DOM, do this:
	// `this._shadowRoot = this.attachShadow({mode: 'close'});`
	get html() {
		return this._html || (this.html = bind(this.shadowRoot || this._shadowRoot || this));
	}

	// `html` can be set, if necessary. It won't invoke render().
	set html(value) {
		Object.defineProperty(this, '_html', { configurable: true, value: value });
	}

	// Overwrite this method with your own render
	render() {}

	// Shallow copies props to this.props, and (by default) calls this.render() after updating
	// props. It can optionally set each element property, in which case it will not render.
	update(props, { render = true, setAttr = false } = {}) {
		const target = this.props;
		const source = typeof props === 'function' ? props.call(this, target) : props || this.props;
		for (const key in source) {
			const attr = kebabToCamelCase(key);
			if (setAttr && this.getAttribute(attr) !== source[key]) {
				this.setAttribute(attr, source[key]);
			}
			if (target[key] !== source[key]) target[key] = source[key];
		}
		if (render && !setAttr) this.render();
		return this;
	}
}

// Expose hyperhtml methods.
BrikElement.Component = Component;
BrikElement.bind = bind;
BrikElement.intent = define;
BrikElement.wire = wire;
BrikElement.hyper = hyper;

export default BrikElement;

// ----------
// DOM ready.
// Allows created() method to ensure the element is fully known to the browser.
const dom = {
	handleEvent: function(e) {
		if (dom.ready) {
			document.removeEventListener(e.type, dom, false);
			dom.list.splice(0).forEach(function(fn) {
				fn();
			});
		}
	},
	get ready() {
		return document.readyState === 'complete';
	},
	list: []
};

if (!dom.ready) {
	document.addEventListener('DOMContentLoaded', dom, false);
}

/**
 *  Check if DOM is ready.
 *
 *  @param   {Function}  created  created().
 */
function checkReady(created) {
	if (dom.ready || isReady.call(this, created)) {
		if (!this._initialized) {
			created.call(Object.defineProperty(this, '_initialized', { value: true }));
		}
	} else {
		dom.list.push(checkReady.bind(this, created));
	}
}

/**
 *  Helper to check if DOM is ready.
 *
 *  @param   {Function}  created  created().
 *  @return  {Boolean}  Whether DOM is ready.
 */
function isReady(created) {
	let el = this;
	do {
		if (el.nextSibling) return true;
	} while ((el = el.parentNode));
	setTimeout(checkReady.bind(this, created));
	return false;
}

/**
 *  Convert string from camelCase to kebab-case.
 *
 *  @param   {String}  string  String to convert.
 *  @return  {String}  kebab-case string.
 */
function camelToKebabCase(string) {
	return string
		.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1-$2')
		.toLowerCase();
}

/**
 *  Convert string from kebab-case to camelCase.
 *
 *  @param   {String}  string  String to convert.
 *  @return  {String}  camelCase string.
 */
function kebabToCamelCase(string) {
	return string.replace(/\W+(.)/g, (x, char) => char.toUpperCase());
}
