import { dashCase } from '../utilities.js';

function Brik(Base = HTMLElement) {
	return class extends Base {
		/**
		 *  Extend base `with` other mixins.
		 *
		 *  @param   {...Function}  mixins  Mixin Classes to extend base element with.
		 *  @return  {Function}  Extended Class.
		 */
		static with(...mixins) {
			mixins.unshift(Brik);
			return mixins.reduce((context, mixin) => mixin(context), Base);
		}

		/**
		 *  Define and register the Custom Element to the DOM.
		 *  @description  The following are valid ways to call it:
		 *    1) element.define(tagName, Class, config);
		 *    2) element.define(Class, config);
		 *    3) element.define(config);
		 *
		 *  @string  tagName  (Class.name)  Tag name of the Custom Element. Can be omitted.
		 *  @function  Class  (this)  Class to register as a Custom Element. Can be omitted.
		 *  @object  config  ({})  Configuration options. Can be omitted.
		 *  @return  {Object}  Class constructor.
		 */
		static define(...args) {
			window.brikcss = window.brikcss || {};
			const Class =
				typeof args[0] === 'function'
					? args[0]
					: typeof args[1] === 'function'
						? args[1]
						: this;
			const config = Object.assign(
				{
					prefix:
						typeof args[0] === 'string' ? undefined : window.brikcss.prefix || 'brik',
					tagName: typeof args[0] === 'string' ? args[0] : Class.name
				},
				args[0] instanceof Object
					? args[0]
					: args[1] instanceof Object
						? args[2]
						: args[2] instanceof Object
							? args[2]
							: {}
			);

			// Define and register the Custom Element to the DOM.
			window.customElements.define(
				`${config.prefix ? config.prefix + '-' : ''}${dashCase(config.tagName)}`,
				Class,
				config
			);

			return Class;
		}

		/**
		 *  Getter/setter to get/set root element, which is shadowRoot or root element.
		 *  @return  {Object}  Root element.
		 */
		get root() {
			return this._root || (this._root = this.shadowRoot || this);
		}
		set root(value) {
			Object.defineProperty(this, '_root', {
				configurable: true,
				value
			});
		}
	};
}

export { Brik };
