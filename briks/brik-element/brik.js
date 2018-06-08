/** ------------------------------------------------------------------------------------------------
 *  @filename  brik.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Extensible class to assist in creating Brikcss Custom Elements.
 *  @credit  Thank you to @WebReflection for the awesome HyperHTML set of libraries. Much of the
 *      inspiration for BrikElement was drawn from this work:
 *      https://github.com/WebReflection/hyperHTML-Element.
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

		// observedAttributes create a mechanism to reflect attributes to props and vice versa. For
		// each observedAttributes, an accessor is defined at `this[prop]` which, when set, will
		// reflect the value to props. Note: attributes are converted to kebab-case, while props are
		// converted to camelCase.
		if (!Class.observedAttributes) {
			const defaults = Object.assign({}, Class.prototype.defaults, Class.defaults);
			Class.observedAttributes = Object.keys(defaults).map((prop) => {
				return camelToKebabCase(prop);
			});
		}
		(Class.observedAttributes || []).forEach((attr) => {
			const prop = kebabToCamelCase(attr);
			if (!(prop in Class.prototype)) {
				Object.defineProperty(Class.prototype, prop, {
					configurable: true,
					get() {
						return this.props[prop];
					},
					set(value) {
						this.props[prop] = value;
						this.setAttribute(attr, value);
					}
				});
			}
		});

		// Wrapper around child's attributeChangedCallback to reflect attribute changes to props. It
		// also upgrade the child's attributeChangedCallback to only run if the value has changed,
		// which prevents triggering attributeChangedCallback more than once.
		// NOTE: In the initial render, attributes are not set in the DOM. This is because it
		// creates unnecessary renders and can bloat the markup. As soon as any attribute or prop
		// changes, however, it gets reflected in the DOM.
		const created = Class.prototype.created;
		const onChanged = Class.prototype.attributeChangedCallback;
		const hasChange = !!onChanged;
		if (created || hasChange) {
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
						if (value === 'true') this.props[prop] = true;
						else if (['false', 'null', 'undefined'].includes(value)) {
							this.props[prop] = false;
						} else this.props[prop] = value;
						if (hasChange) onChanged.call(this, prop, oldValue, value, attr);
						if (typeof this['on' + propCapitalized] === 'function') {
							this['on' + propCapitalized].call(this, value, oldValue, prop, attr);
						}
					}
				}
			});
		}

		// Created() replaces constructor() and ensures the node is fully known to the browser. It
		// is ensured to run either after DOMContentLoaded or once there is a next sibling. This
		// ensures you have full access to element attributes and/or childNodes.
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

	// Default props.
	get defaults() {
		return {};
	}

	// Overwrite this method with your own render
	render() {}

	// the state with a default
	get props() {
		return this._props || (this.props = this.defaults);
	}

	// it can be set too if necessary, it won't invoke render()
	set props(value) {
		Object.defineProperty(this, '_props', { configurable: true, value });
	}

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
			init.call(this);
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

function init() {
	// Set up defaults.
	this.props = Object.assign({}, this.props, this.constructor.defaults, this.defaults);
	Object.keys(this.props).forEach((prop) => {
		this.props[prop] = this.getAttribute(camelToKebabCase(prop)) || this.props[prop];
	});
	Object.defineProperty(this, '_initialized', { value: true });
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
