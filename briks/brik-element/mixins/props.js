import { dashCase, empty, keys } from '../utilities.js';

function normaliseAttributeDefinition(name, prop) {
	const { attribute } = prop;
	const obj =
		typeof attribute === 'object'
			? Object.assign({}, attribute)
			: {
					source: attribute,
					target: attribute
			  };
	if (obj.source === true) {
		obj.source = dashCase(name);
	}
	if (obj.target === true) {
		obj.target = dashCase(name);
	}
	return obj;
}

function normalisePropertyDefinition(name, prop) {
	const { coerce, default: def, deserialize, serialize } = prop;
	return {
		attribute: normaliseAttributeDefinition(name, prop),
		coerce: coerce || ((v) => v),
		default: def,
		deserialize: deserialize || ((v) => v),
		serialize: serialize || ((v) => v)
	};
}

function defineProps(constructor) {
	if (constructor.hasOwnProperty('_propsNormalised')) return;
	const { props } = constructor;
	keys(props).forEach((name) => {
		let func = props[name];
		if (!['function', 'object'].includes(typeof func) || func instanceof Array) {
			func = Object.assign(types[func instanceof Array ? 'array' : typeof func], {
				default: func
			});
		}
		if (typeof func !== 'function') func = type(func);
		func({ constructor }, name);
	});
}

function delay(fn) {
	if (window.Promise) {
		Promise.resolve().then(fn);
	} else {
		setTimeout(fn);
	}
}

function type(definition) {
	const propertyDefinition = definition || {};

	// Allows decorators, or imperative definitions.
	const func = function({ constructor }, name) {
		const normalised = normalisePropertyDefinition(name, propertyDefinition);

		// Ensure that we can cache properties. We have to do this so the _props object literal doesn't modify parent
		// classes or share the instance anywhere where it's not intended to be shared explicitly in userland code.
		if (!constructor.hasOwnProperty('_propsNormalised')) {
			constructor._propsNormalised = {};
		}

		// Cache the value so we can reference when syncing the attribute to the property.
		constructor._propsNormalised[name] = normalised;
		const {
			attribute: { source, target }
		} = normalised;

		if (source) {
			constructor._observedAttributes.push(source);
			constructor._attributeToPropertyMap[source] = name;
			if (source !== target) {
				constructor._attributeToAttributeMap[source] = target;
			}
		}

		Object.defineProperty(constructor.prototype, name, {
			configurable: true,
			get() {
				const val = this._props[name];
				return val == null ? normalised.default : val;
			},
			set(val) {
				const {
					attribute: { target },
					serialize
				} = normalised;
				if (target) {
					const serializedVal = serialize ? serialize(val) : val;
					if (serializedVal == null) {
						this.removeAttribute(target);
					} else {
						this.setAttribute(target, serializedVal);
					}
				}
				this._props[name] = normalised.coerce(val);
				this.triggerUpdate();
			}
		});
	};

	// Allows easy extension of pre-defined props { ...prop(), ...{} }.
	Object.keys(propertyDefinition).forEach((key) => (func[key] = propertyDefinition[key]));

	return func;
}

const propsMixin = (Base = HTMLElement) => {
	var _class, _temp2;

	return (
		(_temp2 = _class = class extends Base {
			constructor(...args) {
				var _temp;

				return (
					// eslint-disable-next-line constructor-super
					(_temp = super(...args)),
					(this._prevProps = {}),
					(this._prevState = {}),
					(this._props = {}),
					(this._state = {}),
					_temp
				);
			}

			static get observedAttributes() {
				// We have to define props here because observedAttributes are retrieved
				// only once when the custom element is defined. If we did this only in
				// the constructor, then props would not link to attributes.
				defineProps(this);
				return this._observedAttributes;
			}

			static get props() {
				return this._props;
			}

			static set props(props) {
				this._props = props;
			}

			get props() {
				return keys(this.constructor.props).reduce((prev, curr) => {
					prev[curr] = this[curr];
					return prev;
				}, {});
			}

			set props(props) {
				const ctorProps = this.constructor.props;
				keys(props).forEach((k) => k in ctorProps && (this[k] = props[k]));
			}

			get state() {
				return this._state;
			}

			set state(state) {
				this._state = state;
				this.triggerUpdate();
			}

			attributeChangedCallback(name, oldValue, newValue) {
				const {
					_attributeToAttributeMap,
					_attributeToPropertyMap,
					props
				} = this.constructor;

				if (super.attributeChangedCallback) {
					super.attributeChangedCallback(name, oldValue, newValue);
				}

				const propertyName = _attributeToPropertyMap[name];
				if (propertyName) {
					const propertyDefinition = props[propertyName];
					if (propertyDefinition) {
						const { default: defaultValue, deserialize } = propertyDefinition;
						const propertyValue = deserialize ? deserialize(newValue) : newValue;
						this._props[propertyName] =
							propertyValue == null ? defaultValue : propertyValue;
						this.triggerUpdate();
					}
				}

				const targetAttributeName = _attributeToAttributeMap[name];
				if (targetAttributeName) {
					if (newValue == null) {
						this.removeAttribute(targetAttributeName);
					} else {
						this.setAttribute(targetAttributeName, newValue);
					}
				}
			}

			connectedCallback() {
				if (super.connectedCallback) {
					super.connectedCallback();
				}
				this.triggerUpdate();
			}

			shouldUpdate() {
				return true;
			}

			triggerUpdate() {
				if (this._updating) {
					return;
				}
				this._updating = true;
				delay(() => {
					const { _prevProps, _prevState } = this;
					if (this.updating) {
						this.updating(_prevProps, _prevState);
					}
					if (this.updated && this.shouldUpdate(_prevProps, _prevState)) {
						this.updated(_prevProps, _prevState);
					}
					this._prevProps = this.props;
					this._prevState = this.state;
					this._updating = false;
				});
			}
		}),
		(_class._attributeToAttributeMap = {}),
		(_class._attributeToPropertyMap = {}),
		(_class._observedAttributes = []),
		(_class._props = {}),
		_temp2
	);
};

const { parse, stringify } = JSON;
const attribute = Object.freeze({ source: true, target: true });
const zeroOrNumber = (val) => (empty(val) ? 0 : Number(val));

const any = type({
	attribute
});

const array = type({
	attribute,
	coerce: (val) => (Array.isArray(val) ? val : empty(val) ? null : [val]),
	default: Object.freeze([]),
	deserialize: parse,
	serialize: stringify
});

const boolean = type({
	attribute,
	coerce: Boolean,
	default: false,
	deserialize: (val) => !empty(val),
	serialize: (val) => (val ? '' : null)
});

const number = type({
	attribute,
	default: 0,
	coerce: zeroOrNumber,
	deserialize: zeroOrNumber,
	serialize: (val) => (empty(val) ? null : String(Number(val)))
});

const object = type({
	attribute,
	default: Object.freeze({}),
	deserialize: parse,
	serialize: stringify
});

const string = type({
	attribute,
	default: '',
	coerce: String,
	serialize: (val) => (empty(val) ? null : String(val))
});

const types = {
	any,
	array,
	boolean,
	number,
	object,
	string
};

export { types, normaliseAttributeDefinition, normalisePropertyDefinition, type, propsMixin };
