# Authoring Web Components

## Terminology

For the purposes of this document, the usage of the following terms will be defined as follows:

- _Web Components_: The native set of web APIs which allow you to create custom, reusable, encapsulated DOM elements (tags).
- _Web Component_: An individual element (or tag) which is authored using the _Web Components_ spec.
- _Custom Element_: The native DOM specification / APIs for creating custom DOM elements, one part of a Web Component.
- _Shadow DOM_: The native DOM specification / APIs for creating encapsulated styles and markup in a Web Component, which is rendered separately from the main DOM (Light DOM).
- _Light DOM_: The traditional part of the DOM, not part of an element's Shadow DOM.
- _Host_: The DOM element which a shadow root is attached to.
- _Shadow Root_: The root node of a Shadow DOM subtree, which is rendered separately from the main DOM (Light DOM).
- _Shadow Tree_: An element's Shadow DOM, or subtree, rendered separately from the main DOM (Light DOM).

## Why Web Components

Why native Web Components over other potential solutions, such as React, Vue, or Angular? {.font__subtitle}

A large amount of research went into the selection of native JavaScript Web Components as the tech of choice. For a good understanding of the benefits and reasons for Web Components, here are some great reads:

- [Why Web Components are so important](https://blog.revillweb.com/why-web-components-are-so-important-66ad0bd4807a)
- [From monolith to micro](#!/learn/from-monolith-to-micro)

## The DSUI Library Web Components tech stack

One of the great benefits of Web Components is they allow you to do just about anything. One big challenge in writing Web Components is they allow you to do just about anything. This leaves open many decisions that need to be made in order to author Web Components. Our Web Components "tech stack" is a small number of libraries we use to make writing or extending components easy, and also helps to achieve full browser support.

A brief overview of our Web Components tech stack is as follows:

- **ECMAScript 2015 (ES2015/ES6)**: ECMAScript sets the standard for JavaScript implementations. ECMAScript 2015 is the version of ECMAScript we use in authoring Web Components. [Most features of ES2015 are already supported in web browsers](https://kangax.github.io/compat-table/es6/), though ES2015 can be easily transpiled for greater browser support. While you are likely already familiar with many ES2015 specs, in authoring Web Components it is especially important to be familiar with [Modules](https://ponyfoo.com/articles/es6#modules), [Classes](https://ponyfoo.com/articles/es6#classes), and [Template Literals](https://ponyfoo.com/articles/es6#template-literals).

- **Brik Element**: A thin abstraction over native Web Components which removes boilerplate, simplifies and standardizes the authoring of Web Components, and makes them extremely extensible. Brik Element is at the core of each individual Web Component, and uses the two primary specs contained in native Web Components: _Custom Elements_ and _Shadow DOM_.

- **[HyperHTML](https://viperhtml.js.org/hyperhtml/documentation/)**: Think of it as an alternative to the "virtual DOM" made popular by ReactJS, only built with native JS/ECMAScript. Its job is to efficiently render the DOM and should be used anywhere nodes will be rendered to the DOM.

- **[JSS](http://cssinjs.org/)**: A library which allows you to use CSS in JavaScript. JSS creates scoped CSS selectors, so we use this primarily as a Shadow DOM fallback. Though there are other benefits JSS provides, once Shadow DOM is fully supported in all required browsers we can remove this library from the stack.

While these are the main libraries used for authoring Web Components, other tech we use is as follows:

- **[NPM](#!/learn/working-with-npm)**: NPM (Node Package Manager) is Node's public package manager which also provides many amazing tools to work with JavaScript. DSUI Library uses NPM Scripts -- an NPM tool to run JS scripts from the command line -- as a task runner to run all of its build steps.

- **[RollupJS](https://rollupjs.org/guide/en)**: Rollup is a module bundler -- similar to Webpack -- which compiles small pieces of code into something larger and more complex, such as a library or application. It is perfect for use with Web Components. Combined with [Babel](https://babeljs.io/), you can configure which browsers you wish to support and RollupJS will automatically transpile the latest ECMAScript to JavaScript that is understood by your configured browsers.

- **[PostCSS](https://github.com/postcss/postcss)**: If you already use [Autoprefixer](https://github.com/postcss/autoprefixer), you already use PostCSS. PostCSS is a tool for transforming CSS with JavaScript. While not currently used for CSS in Web Components (JSS is used for that), DSUI Library uses PostCSS to compile global styles.

- **[Router5](https://router5.js.org/)**: While a router is not required to author Web Components it is an important part of any web app. Router5 is a framework agnostic router which is used by the DSUI Library website, though your web app can use any router.

## Brik Element

Brik Element is a thin abstraction over native Web Components, and is the core of our authoring of Web Components. A Brik Element extends a native Web Component (Custom Element), so it can do everything a native Custom Element can do, while also removing a lot of boilerplate for common Web Component features and making composing Web Components easier. Brik Element consists of:

1. _Base_: A thin Base Class.
2. _Mixins_: [JS mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/), which can be used to extend any element with specific behavior. JS mixins make Brik Elements extensible, allowing you to build and apply custom features through your own custom mixins.

Full documentation is available for Brik Element, which you will want to be familiar with.

## Creating a Brik Element

Consider the following example:

```js {label="my-element.js"}
// 1) Import components of Brik Element we'd like to use.
import { Brik, propsMixin, renderMixin, types, type } from 'brik-element';

// 2) Export a Class which extends Brik() and also includes the props and render mixins.
export default class MyElement extends Brik().with(propsMixin, renderMixin) {
	// 3) Use the props mixin to defines props `name` (a string) and `active` (a boolean).
	static get props() {
		return {
			name: type(Object.assign({}, types.string, {default: 'World'})),
			active: types.boolean
		};
	}

	// 4) Create Shadow DOM.
	connectedCallback() {
		this.attachShadow({mode: 'true'});
	}

	// 5) Use the render mixin to render the element.
	render() {
		return super.render()`<div class="${this.active ? 'active' : ''}">Hello ${this.name}!</div><style>div { background-color: blue; }</style>`;
	}
}
```

This is a very simple component that display "Hello {name}!" in the DOM, and toggles a class based on whether it is `active` or not. Despite the simplicity of its code, a lot is going on:

1. `import`: This element is importing its own dependencies with ES2015 modules. This gives us everything we need while keeping the component modular and self contained.
2. `export`: A lot is happening on this line:
	- Again we are using ES2015 modules to export the functionality we want users to have...
	- ...which, in this case, is a `Class`...
	- ...which extends `Brik()`...
	- ...which is also extended with the `props` and `render` mixins.
3. `props`: Inside of the element's Class, we define properties using the `props` mixin syntax. This will make the `name` and `active` properties reflective and reactive. In other words, you can change properties by changing its corresponding DOM attribute, and vice versa.
4. `attachShadow()`: This creates the Shadow DOM, which encapsulates the styles and makes them local to the component.
5. `render()`: Using the `render` mixin we call `super.render()` with our HTML template inside of a template literal. This works with the `props` mixin so whenever a property is updated (via DOM or programmatically), the DOM will be re-rendered as efficiently as possible.

## Using Web Components

Now let's take the component we created and put it inside our app:

```html {label="index.html"}
<!-- Create an instance with its own properties. -->
<brik-my-element name="World" active="true"></brik-my-element>
```

```js {label="app.js"}
// 1) Import the element.
import MyElement from '../path/to/my-element.js';

// 2) Register the Custom Element to the DOM. By default the element / tagName
// registered will be `brik-<dashCase(Class.name)>` (which, in this case,
// would be 'brik-my-element' since the Class name defined in the last section
// is MyElement).
MyElement.define();

// OR: You can also register the element with a custom tagName:
// MyElement.define('my-element');

// 3) Grab an element instance to be able to interact with it.
const myElementInstance = document.querySelector('brik-my-element');

// 4) Interact with it. Each prop defines a getter/setter on the element itself. This allows you to easily get/set properties in a declarative way.
console.log('NAME:', myElementInstance.name); // Grabs element's `name` attribute, or 'World' by default.
console.log('ACTIVE?', myElementInstance.active); // Grabs element's `active` attribute, or `false` by default.
// Change element properties, which are automatically reflected to the DOM.
myElementInstance.active = true;
myElementInstance.name = 'Jonny';
```

### Understanding how Shadow DOM renders

Styles inside a shadow tree are scoped to that subtree and _do not affect elements outside the shadow tree_. Styles outside the shadow tree do not match selectors inside the shadow tree, though certain inheritable style properties still inherit from host to shadow tree.

Let's build on the previous example and put it in a greater context. It might look something like this:

```html {label="index.html"}
<style>
	body {
		color: white;
	}
	.active {
		background-color: red;
	}
</style>

<brik-my-element name="World" active="true">
	#shadow-root
		<div class="active">Hello, World!</div>
		<style>
			div {
				background-color: blue;
			}
		</style>
</brik-my-element>
```

Take notice of the following:

- The Shadow Root is contained in its own tree, though the element's host is outside the shadow tree.
- The element's `<div>` will have a blue background, not red. This is because _main document selectors do not match elements in the Shadow DOM_, so the global `.active` selector will not be applied.
- However, the text color for `<div>` will be white, because _Shadow DOM elements do inherit style properties which are inheritable_.

### CSS Custom Properties

If global / outside selectors do not get applied to elements inside a Shadow DOM, how can authors allow users to style elements inside a Web Component's shadow tree? The answer is _CSS Custom Properties_ (variables). CSS Custom Properties are an exception to the rule, and get inherited down the tree, even through the shadow tree. In other words, elements inside a shadow tree inherit CSS Custom properties. This allows Web Component authors to provide "style hooks", which give users the ability to modify style properties in controlled way. It essentially provides a styling API for your element.

To illustrate, let's modify the previous example to allow the user to style the `background-color` of the element when it is active:

```html {label="index.html"}
<style>
	:root {
		--active-color: purple;
	}
	body {
		color: white;
	}
</style>

<brik-my-element name="World" active="true">
	#shadow-root
		<div class="active">Hello, World!</div>
		<style>
			div {
				background-color: var(--active-color, red);
			}
		</style>
</brik-my-element>
```

Notice the following:

- The web component's author set the `background-color` property of the element's `div` to: `var(--active-color, red)`. This means:
	- A user can use the `--active-color` custom property to modify the `background-color` property.
	- If the `--active-color` custom property does not exist elsewhere, the author set a default value of `red`.
- In this example, the `background-color` of the `<div>` will be purple, which is the value of the `--active-color` set globally in the `:root` selector.
- The `color` of the `<div>` will still be white.

## Other Considerations for authoring Web Components

This is intended to be a high level overview for getting started in authoring Web Components. To take a deeper dive, consider the following:

_Understand the Brik Element library and its mixins._ {.font__subtitle}

This is the quickest and easiest way to start authoring Web Components. Understand its API and the callbacks that are provided and/or extended.

_In particular, learn about the render mixin, and how it can be used to efficiently render elements._ {.font__subtitle}

The `render()` function uses [HyperHTML](https://viperhtml.js.org/hyperhtml/documentation/) to efficiently render (and re-render) elements to the DOM. This works efficiently for many use cases. _However, the responsibility is on the Web Component author to ensure the component gets rendered as efficiently as possible._ Not understanding how HyperHTML works, and how the render mixin utilizes it in correlation with the `updated()` callback can result in poor rendering performance. This can easily be resolved by extending or overwriting the default `render()` method with HyperHTML's API, which is also provided as part of the render mixin.

_The build process for your web app is vital._ {.font__subtitle}

The build is less important for the actual authoring of web components, but vital for bringing web components in to a larger system of components (a web app). Once the build process is set up you can largely forget about it. But great care should be taken to ensure the build properly compiles web components into code your target browsers understand. For setting up a build inside of a web app you may use the [DSUI Library Site](https://github.com/brikcss/dsui-library-site) as an example to follow. [Contact a FED](mailto:tyson@directscale.com) for help as needed.

_Don't forget the polyfills!_ {.font__subtitle}

This step is also less important for authoring web components, but important when optimizing your web app for production. Make sure web components work in your targeted browsers! For starters, you will likely need to include polyfills for [Custom Elements](https://github.com/WebReflection/document-register-element) and [Shadow DOM](https://github.com/webcomponents/shadydom) in order to support all browsers. It is recommended to use the [Babel preset plugin](https://github.com/babel/babel-preset-env), an awesome tool which ensures compiled code works for your targeted browsers. For our purposes, this will be all you need if you stick to using ES2015 and below.
