# Brik Element

## Features

### `base.js`

- `with(...mixins)`: Method to apply an unlimited number of mixins to the base Custom Element. Each `mixin` should follow this syntax: `export const myMixin = (Base = HTMLElement) => { return class extends Base {...}; }`. See [background about JavaScript mixins with classes](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/).

- `define(tagName, Class, config)`: Helper method to define and register the Custom Element to the DOM.
	- `tagName`  _{String}_  (`Class.name`)  Name of tag to use for Custom Element.
	- `Class`  _{Function}_  (`this`)  Class to use for Custom Element.
	- `config`  _{Object}_  (`{}`)  Custom Element configuration.

- `this.root`: Provides an easy way to return the root element. Returns `shadowRoot`, if it exists, or `this` if it doesn't. Can also set the root if needed.

### `props.js`

- `props`: Props is what makes DOM attributes "reactive", abstracting away the native `observedAttributes` Custom Element property. Props makes it easy to automatically update element properties when a DOM attribute is changed, reflect property values to and from DOM attributes, make changes in a more declarative way, enforce certain data types on element properties, and coerce and (de)serialize data to and from DOM attributes. The intention of `props` is to contain all public properties, so anything public should be defined in `props` (see also `state` below, which is intended for private properties). Each prop is defined as a function which determines how that prop behaves. See `types` and `type` for more information.
- `types`  _{Object}_: A set of predefined prop data types exported by `props.js`, for use with `props`. This allows to you set any prop like this: `myProp: types.string`. The predefined types are as follows:
	- `types.string`: String.
	- `types.number`: Number.
	- `types.boolean`: Boolean.
	- `types.object`: Object.
	- `types.array`: Array.
	- `types.any`: Any data type.
- `type`  _{Function}_: A function exported by `props.js` whch can be called to define your own prop data type. You can define your own prop type as follows: `myProp: type(params)`, where `params` is an object with any of the following properties:
	- `attribute`  _{Object|Boolean}_  (`{source: true, target: true}`)  Defines how to reflect prop to its DOM attribute. `attribute.source` (_String_) is the source attribute that prop comes from; whereas `attribute.target` (_String_) is DOM attribute to reflect the prop to. `true` (or `{source: true, target: true}`) will use the dash cased value of prop for both source and target, and `false` will not reflect a `source` or `target`.
	- `coerce`  _{Function}_  (`(v) => v`)  Called when setting a prop value, intended to coerce its value to the proper data type.
	- `default`  _{any}_  Default falsy/null value.
	- `deserialize`  _{Function}_  (`(v) => v`)  Optional callback, called when an attribute changes, used to deserialize from a DOM attribute to a prop.
	- `serialize`  _{Function}_  (`(v) => v`)  Optional callback, called when a prop is set and just before `coerce()` is called, used to serialize from a prop to a DOM attribute.
- `state`  _{Object}_  Used to track internal state, not intended for public consumption. The `updated()` callback is automatically triggered when the `state` property is set.
- `shouldUpdate(prevProps, prevState)`  _{Function}_  (`() => true;`): Allows you to prevent updates if certain updates will be expensive. This is called just prior to calling the `updated()` callback. `updated()` will not run if `shouldUpdate()` returns false. Simply allows you more control over when the `updated()` callback is run to prevent expensive renders or operations.
- Life cycle callbacks:
	- `updated(prevProps, prevState)`: Called after props (or attributes) get updated. This is essentially an abstract over the `attributeChangedCallback()` callback, though you can still extend or overwrite the `attributeChangedCallback()` callback.
	- `updating(prevProps, prevState)`: Called on every single update, whether `shouldUpdate()` returns true or false.

### `render.js`

- Extends `updated()` callback to 1) Call `super.updated()`; 2) call `this.rendering()`; 3) call `this.renderer()`, which calls `this.render()`; 4) call `this.rendered()`.
- Adds `renderer()`, which renders to DOM. It will render to `this.root || this.shadowRoot || this`.
- Adds lifecycle callbacks:
	- `rendering()`: Called before rendering.
	- `rendered()`: Called just after rendering.

### `children.js`

- Adds a mutation observer, which observes child elements. When a change is observed, will update `this.props.children` with the new child elements.

### `events.js`

- `handleEvent()`:

### `lifecycle.js`

- Adds lifecycle callbacks:
	- `connecting()`: Runs just prior to `connectedCallback()`.
	- `connected()`: Runs immediately after to `connectedCallback()`.
	- `disconnecting()`: Runs just prior to `disconnectedCallback()`.
	- `disconnected()`: Runs immediately after to `disconnectedCallback()`.

## Wish List

- `reflectedProps`: Properties that get reflected to DOM attributes. By default, all `props` are reflected, unless `reflectedProps` exists. Note: Only basic primitives can be reflected to DOM; Rich data (Objects and Arrays) are never reflected to the DOM.

- [x] Rename `defaults` to `props` to create default `props`.

- [x] HIGH: Optionally (`withUpdate`): element will react to changes on `props` or attributes.

- [x] MEDIUM: Optionally (`withChildren`): Adds `childrenUpdated()` lifecycle method which allows element to react to changes to its child elements.

- MEDIUM: Optionally (`withContext`): allow element to inherit context from its parents.

- LOW: Optionally (`withLifecycle`): Creates additional sugar on top of lifecycle callbacks. This allows you to add lifecycles without having to remember to call super.

- LOW: Optionally (`withRenderer`): element can generate its own DOM and output to `renderRoot` (`shadowRoot` by default).

## Native Custom Elements API

- `window.customElements.define(tag, Class, options)`: defines / registers custom element to the DOM.
	- Element name **must contain a dash**.
	- Can't register the same element more than once, it will throw a `DOMException`.
	- Custom Elements can not be self closing.

- Custom Element can extend `HTMLElement` or other native DOM elements, such as `HTMLButtonElement`.

- The HTML specification allows any elements to be used in the DOM. This means a Custom Element will be an instance of `HTMLUnknownElement` until it is registered, in which case it will be an instance of `HTMLElement` (or the native element it extends). Also, you can know when a tag name is defined with the `window.customElements.whenDefined()` function.

- Custom Element lifecycle hooks:
	- `constructor()`: element instance is created or upgraded. Useful for initializing state, setting up vent listeners, creating shadow dom, etc.
	- `connectedCallbac()`: Called each time element is inserted into the DOM. Useful for running setup code, fetching resources, or rendering. Generally you should delay work until this time.
	- `disconnectedCallback()`: Called each time element is removed from the DOM. Useful for cleaning up code / memory.
	- `attributedChangedCallback(attrName, oldValue, newValue)`: Called when an [observed attribute](https://developers.google.com/web/fundamentals/web-components/customelements#attrchanges) has been added, removed, updated, or replaced. Also called for initial values when an element is created or upgraded. _Only attributes listed in `observedAttributes` property will receive this callback._

- Reflecting properties to attributes is helpful to keep the DOM representation in sync with an element's state. There are many ways this can be implemented...
	- One way is to create a custom getter/setter for a given property:
		```
		get disabled() {
			return this.hasAttribute('disabled');
		}
		set disabled(value) {
			if (value) {
				this.setAttribute('disabled', '');
			} else {
				this.removeAttribute('disabled');
			}
			this.toggleDrawer();
		}
		```
	- The downside to the getter/setter approach is the DOM will be re-rendered each time the property changes. It might be more efficient / better for performance create a custom render method which reflects all desired properties to the DOM. The advantage with doing so is you can reflect and render multiple property changes to the DOM at once.

- You can pre-style unregistered elements with the `:defined` and `:not(:defined)` selectors.

- Use `super` to access the parent / extended element.

- `customElements` API:
	- `define(tagName, constructor, options)`: defines Custom Element and registers to DOM.
	- `get(tagName)`: Returns Custom Element's constructor, or `undefined` if it hasn't been registered.
	- `whenDefined(tagName)`: Returns a Promise that resolves when the Custom Element is defined. If it is already defined it resolves immediately. Rejects if the tag name is not a valid Custom Element name.

- Polyfills:
	- [webcomponents custom element](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js)

## Native Shadow DOM API

- Solves for:
	- Isolated DOM: `document.querySelector()` won't return nodes in a component's Shadow DOM.
	- Scoped CSS: CSS inside Shadow DOM is scoped to the component.
	- Simplifies CSS: Scoped CSS means you can use simple CSS selectors, generic id/class names without naming conflicts.
	- Composition: Design a declarative, markup-based API for a component.
	- Productivity: Apps become independent chunks of DOM rather than one large global page.

- Light DOM versus Shadow DOM:
	- Light DOM is the markup the user writes, which lives outside a Web Component.
	- Shadow DOM is the DOM a component author writes, which is hidden inside its own shadow document.

- `<slot></slot>`: Slots are placeholders inside a component that users can fill with their own markup.
	- Slots can be named with the `name` attribute.
	- Users utilize slots with the `slot` attribute.

- Styling Shadow DOM:
	- `:host` and `:host-context()`: selectors for styling the host element (which resides in the light DOM). With host selectors, outside / global styles always win. However, these selectors cannot be polyfilled, so they are not ready for production use.
	- `::slotted()`: matches nodes that are distrubuted into a slot.
	- Style hooks: Component authors can allow user to style certain CSS properties in the Shadow DOM by providing CSS custom properties (CSS variables).

- `contain`: Use the CSS [`contain`](https://developers.google.com/web/updates/2016/06/css-containment) property to limit the amount of work the browser needs to do to render and re-render elements.

- Polyfills:
	- [ShadyDOM](https://github.com/webcomponents/shadydom) polyfills Shadow DOM slots.
	- [ShadyCSS](https://github.com/webcomponents/shadycss) polyfills scoped styles and CSS custom properties. See its usage for how to scope styles.
	- To use the polyfills:
		```js
		function loadScript(src) {
			return new Promise(function(resolve, reject) {
				const script = document.createElement('script');
				script.async = true;
				script.src = src;
				script.onload = resolve;
				script.onerror = reject;
				document.head.appendChild(script);
			});
		}
		// Lazy load the polyfill if necessary.
		if (!supportsShadowDOMV1) {
			loadScript('/bower_components/shadydom/shadydom.min.js')
				.then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
				.then(e => {
					// Polyfills loaded.
				});
		} else {
		  // Native shadow dom v1 support. Good to go!
		}
		```
