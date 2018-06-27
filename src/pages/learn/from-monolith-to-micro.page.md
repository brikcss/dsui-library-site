# Taking a Front End from Monolith to Micro

## The problem: The Monolith

Originally our Dev team was looking for a way to split up monolithic front end codebases into smaller, cohesive pieces. These pieces needed to be:

- Roll independent.
- Source control independent.
- Share infrastructure, where possible.

Eventually I created my own wish list:

- _Modular / self-contained_:
	- Fits into the microservice/modular approach. Each microservice does one thing well.
	- Each piece deploys independently.
	- If a library becomes obsolete, we only need to rewrite/replace the library, not the entire app or framework.
- _Interoperable_. Parts that might be reusable by other teams should be built in a way that allows other teams to use it and fit it into their technology/environment.
	- Works with any popular framework.
	- Perhaps even works with multiple frameworks on the same page with no reload.
- Embraces _ES6/ES2015_. Take advantage of cool new features such as modules, promises, template literals, etc. Most ES6 features meet our browser support policy, and others can be polyfilled as needed.
- Favors _native_ JS/DOM APIs over custom APIs.
- Embraces (or enables you to embrace) _web standards_ and [progressive web app standards](https://developers.google.com/web/progressive-web-apps/).
- _Flexible_ tooling. Not tied to a specific toolset.

## The solution: Micro Front Ends

From my research, which mirrored the research of another Developer assigned to the researching this issue, the phrase "[Micro Front Ends](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16)" kept appearing, and seemed to meet all of our criteria.

### What is a Micro Front End?

The phrase is relatively new, and its definition seems to vary slightly from Developer to Developer. I will define it as:

> A larger front-end app or system which is composed of smaller, self-contained components or apps which can be developed and deployed independently of each other.

## What makes up a Micro Front End?

There are [many ways to adopt a Micro Front End architecture](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16). Generally speaking, each approach has the following code layers:

- _Page Composition:_ Smaller components that make up a page.
- _App Shell:_ Provides an entry point to an app and organizes page components to present to a user.
- _Page Transitions / Routing:_ Enables and controls page transitions.
- _The Build:_ Bundles an app together, prepares for production, and deploys.

### Part 1: Page Composition

_Page Composition_ is the biggest layer of an app. It consists of the various components that will reside on a page. These components must be:

- Independently packaged and deployed.
- Source control independent.
- Framework agnostic.

#### Web Components

**Web Components perfectly fit in with the Micro Front End architecture and fulfill all of our listed requirements.**

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is a suite of native web technologies which allow you to create reusable custom elements (components) that can be reused anywhere. A Web Component can provide a public API for interacting with a component, which is abstracted away from everything else under the hood that its consumers do not need to know. Write once, share anywhere, easy to interact with, update as needed, isolated from everything else. Some benefits:

- [Can be used anywhere](https://custom-elements-everywhere.com/), regardless of framework or environment.
- Write once. Share anywhere. Update once. Deploy everywhere.
- Native technology. JS/DOM acts as the public API.
- Modular, self-contained, and independently deployable.
- Future proof.
- Works seamlessly with ES modules (ES6). Dependencies are imported, the build system glues it together.
- Embraces web standards, progressive web app standards, and native technologies.

#### Browser support

Currently Chrome and Safari (including mobile) support Web Components. Firefox has experimental support underneath a flag, which is set to be enabled soon. Edge is working on its implementation. There are polyfills available which have been used in production for some time -- used by Polymer, GitHub, and others -- which will bring browser support to our requirements.

#### JS Components

I am defining a JS component as an ES Module which exports certain functionality that can be imported elsewhere. JS Components also perfectly fit in with the Micro Front End architecture and fulfill all of our listed requirements.

Web Components are instantiated as custom HTML elements, and they may rely on other JS scripts or components which you might want to reuse in multiple places. This includes any JS script that isn't a Web Component, such as helper or utility scripts, and even libraries. Examples might be a merge utility, a virtual DOM library, or any other script that might be needed. Typically these scripts would be included globally (like in index.html), which would make them part of the App Shell. _However, in Micro Front Ends, including JS components in the App Shell layer should be avoided as much as possible._ Instead, JS components (scripts) should be included in the Page Composition layer. This is accomplished with ES Modules, by importing JS components into each Web Component that relies on it. The build system will de-duplicate components that are imported multiple times and glue it all together.

_See "Dependency handling" in "Part 5: Other Considerations" for more details._

### Part 2: App Shell

The _App Shell_ is a larger codebase which glues components together in an organized fashion to present to the user. The App Shell always includes:

- Entry point (index.html).
- Global CSS/JS.

The App Shell _may or may not_ include app-specific features such as:

- Routing
- User sessions
- Custom events bus
- etc.

The App Shell should be thin. As thin as possible. Serious thought should be given before including anything in the App Shell. **Always favor building a feature as a Web Component or reusable library over putting it into the App Shell. There should be good reasons for something to be part of the App Shell.**

Remember, almost anything can be a component.

### Part 3: Page Transitions / Routing

The router is a big part of any app since it enables and controls transitioning from page to page. In Micro Front Ends, the router might be part of the App Shell or it might be part of Page Composition (its own component). It might be created in-house or imported as a third party library. It might even be part of a larger framework.

The reason this is listed out separately is because the router is a big enough part of any app that it deserves its own special considerations. How you implement the router should depend on the needs of the app, but _any routing solution should favor the native history API and work with Custom Elements (part of the Web Components spec)._

### Part 4: The Build System

The purpose of the build process is to glue everything together, prepare the app for production, and deploy. No specific build system is required, but, for our purposes, it must:

- Glue all of the components together, along with their dependencies.
- Compile ES6+ syntax to browser supported JS, and hopefully auto-include polyfills based on browser support policy (babel).
- Split the app into code bundles (code splitting / multiple entry files). This significantly helps app performance, especially on initial load.
- Be fast.
- Prepare the app for production.

Most browsers now support most ES6 features (which is awesome). Browsers expect Web Components to be written using ES6 classes; ES5 syntax does not work. [Polymer recommends compiling both an ES6 and an ES5 bundle for production](https://www.polymer-project.org/2.0/toolbox/build-for-production), and using browser feature detection to serve the correct bundle.

Potential build tooling options:

- [Webpack](https://webpack.js.org/)
- [RollupJS](https://rollupjs.org/)
- [ParcelJS](https://parceljs.org/)
- [Babel](https://babeljs.io/) (Note: Babel is typically used in tandem with another build tool to transpile from ES6 source to your list of supported browsers)

### Part 5: Other Considerations

#### Dependency handling

##### Import dependencies to the Web Component which relies on it, not the App Shell

With the ES module system, dependencies can be easily imported to a Web Component or to the App Shell. However, dependencies should typically be imported to the Web Component which relies on it, not to the App Shell. The build system will de-duplicate code for you, so do not worry about the same dependency being imported to multiple Web Components in an App; the build system will make sure it is only included once.

##### Use extreme caution when importing dependencies

**A library or framework should only be included if it adds a feature we need that isn't natively available.** For example, Angular directives are unnecessary because Custom Elements (part of Web Components) do the same thing natively. This makes Angular less useful since it provides many features we don’t need. However, including a library for reactive data binding would be useful, since it is something we need that is not natively available.

##### Avoid importing dependencies to the App Shell

Remember, almost everything can be a Web Component or a library, and Web Components and libraries manage their own dependencies while the build system glues it all together. Just because a framework _can_ live in the App Shell doesn't mean it _should_. This is a shift in how we think about frameworks like Angular, React, or Vue, which or often the first thing to include in an app. Instead, these should be treated like any other library: as a Web Component or library dependency.

#### Shared events bus

Custom Elements (part of Web Components) can and should communicate via properties, attributes, and events. It may or may not be useful to include a [shared events bus](https://www.quora.com/Is-there-a-micro-service-architecture-approach-for-front-end-development/answer/Mohamed-Abdel-Maksoud) for components that need it. Something like [Eev](https://github.com/chrisdavies/eev).

## The Prototype

[Live code](https://github.com/brikcss/dsui-library-site) | [App repo](https://brikcss.github.io/dsui-library-site)

Micro Front Ends sound great, on paper. But we wanted to prove it out with a prototype to see how that transitioned over to the real world. I started by building a single Web Component. It worked so well I built the UI Library entirely as Web Components.

### File Structure

- `/node_modules`: Web Components imported as NPM Packages. Installed with `npm install`.
- `/src/`
	- `index.html`: Entry point.
	- `app.css`: App Shell styles.
	- `app.js`: App Shell scripts.
	- `routes.js`: Page / view routes.
- Approximately 600 lines of JS/CSS in the App Shell, which mostly consist of the router setup and routes data.

### The Tech

- _Custom Elements_: A set of JavaScript APIs that allow you to define custom elements and their behaviour, which can then be used as desired in your user interface.
- _Shadow DOM_: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.
- [JSS](http://cssinjs.org/): 6kb library which allows you to use CSS in JS. Used as a Shadow DOM fallback since it creates scoped CSS selectors. Once Shadow DOM is fully supported this will become less necessary.
- [HyperHTML](https://viperhtml.js.org/hyperhtml/documentation/): 4kb library. Think of it as an alternative to "virtual dom" made popular by React, only built with native JS/ES/DOM technologies.
- [Router5](https://router5.js.org/): A framework and library agnostic universal router.
- The build:
	- [RollupJS](https://rollupjs.org/guide/en): A JS module bundler, similar to Webpack.
	- [PostCSS](https://github.com/postcss/postcss): A CSS post processor, allowing you to process CSS with JS plugins. You probably already use it with Autoprefixer.
	- NPM with NPM scripts: Task runner which allows you to run JS scripts from the command line. Also provides access to NPM's enormous JS ecosystem.

### Conclusions

Once you master the ins and outs and are familiar with the technologies, building Web Components is easy and straight forward. The most challenging part to it is creating the build system to tie it all together and achieve maximum browser support. Overall there are some tricky phases, but the end experience and outcome has been more than satisfying. _So satisfying, in fact, that I recommend we adopt this approach everywhere on the front end._

## Step by step to adopting a Micro Front End

The thought of tearing down a Monolith and turning it into a Micro Front End is daunting. However, with some simple changes in how we all approach front end work in general, the Monolith can be broken down, over time, as part of your normal, everyday routine.

### Step 1: Adopt a components-based approach to front end development

An app is no longer made up of "pages". It consists of reusable components. The Platform Team has adopted [Style Guide Driven Design and Development (SGDDD)](https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit?usp=sharing), a proven, components-based approach to front-end development based on the success and failures of other companies.

A simplified step by step approach to SGDDD is as outlined in the two phases below.

#### Phase one: The Interface Inventory

1. Take screenshots of the entire UI (each screen where the UI changes).
2. From the screenshots build a "master list" of UI patterns.
3. Use the Master List to prioritize components to be built.

#### Phase two: Building the Style Guide

Phase two is about changing how UX Designers and Developers work together on a daily basis. _This process should be followed not only for every pattern in the components Master List, but also for every feature or page or design discussed or created in the future._

1. Define the pattern / feature. Write down its purpose and requirements.
2. Break the pattern down into components. Compare with existing Style Guide components and create a list:
	- What existing component(s) / patterns can be reused?
	- What existing component(s) / patterns need to be extended?
	- What component(s) need to be created?
	- Create stories and tasks from this list of components.
3. Build a design prototype.
4. Build a code prototype _in an isolated environment_ (UI Library / Style Guide site). Iterate with UX until prototype is approved.
5. Prepare component(s) for production and integrate.

Each team should adopt this approach. **This approach requires "buy in" from all of UX an Developers.** Note: See the [full detailed explanation of SGDDD here](https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit#heading=h.8dazjiktil).

#### Coordinating work with the Platform team

All teams should coordinate with and work together with the Platform team before building any component. This will prevent work from being duplicated, and also determine how each component or pattern fits in to the global UI. Components that should end up in the global UI Library can be prioritized into the Platform team's work. At the same time, teams won't have to wait for the Platform team's limited resources to build a component they need. Components can be initially created by teams and later adopted into the UI Library by the Platform team.

#### Benefits of adopting this approach

- Go from monolith to micro front end one small step at a time (eat the elephant one bite at a time).
- Speed up the work of creating the DS UI Library / Style Guide of components.
- Solve challenges identified in discovery such as:
	- Mobile bugs and functionality that doesn't work.
	- Significantly reduce bugs. Code / patterns are tested in their own isolated environment. From Monolith to Micro Front End.
	- Mobile and responsive optimization.
	- Unification of the UI.
	- Make life easier for developers.

### Step 2: Build the App Shell

Once a components-based approach to UI development is adopted, the App Shell must be created. This be a simple or more involved process, depending on the codebase. The goal of this step is to prepare the codebase for Web Components. It might be decided to build the App Shell before any component is integrated into the app, or in correlation with the integration of the first component. Either way, here are some considerations:

- Will a JS framework be used? It seems the main reason we would use it with the Web Components approach is for developer comfort and familiarity. Is that enough to add a framework? Or are there other benefits it may provide?
- Create global CSS and JS (app.css and app.js). At this point, these should both likely be extremely thin, possibly empty.
- Move temporary styles/scripts to a separate “temp” folder so they are “marked” for deprecation and eventual removal. No new styles or scripts should be added to these files anymore.
- Prepare entry file (index.html). Add app.css and app.js. Clean it up as needed. Mark sections for deprecation and removal. Mark what needs to be built as a component.
- Build out the router and/or any other pieces that will be included in the App Shell instead of integrated as its own component.

### Step 3: Build the build

The build system should glue everything together and prepare the app for production. There are many ways this can be done. It is recommended to use NPM Scripts as the task runner, since it provides the most flexibility in building and running custom scripts, and also provides an enormous ecosystem of libraries, helpers, and build tools.

### Step 4: Use the Master List to build one component at a time

This process is detailed in [“Phase Two” of the SGDDD documentation](https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit#heading=h.8dazjiktil). The purpose is to phase out the old (the Monolith) and bring in the new (the Micro Front End). As each new Web Component is built, old code must be removed. Over time the old goes away completely, and the app morphs into something new and beautiful.

#### Suggestions on building components

- Each component must reside in its own repo.
- Each component should be published to NPM.
- Each component should be tested in isolation, including unit tests and UI screenshot regression tests.
- In UI screenshot tests, make sure to remove unimportant elements before taking a screenshot so as to only test the things that are important and shouldn't change frequently.
- Each component should also be cross browser tested in its own environment, such as the UI Library / Style Guide site.

## References

### Why Web Components

- [A microservice approach to front end web development](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16)
- [The Case for Custom Elements](https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133) (also [part 1](https://medium.com/dev-channel/the-case-for-custom-elements-part-1-65d807b4b439))
- [Complaints against Web Components](https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/) and [a rebuttle](https://robdodson.me/regarding-the-broken-promise-of-web-components/) (great conversation which outlines two different perspectives)
- [Demythstifying Web Components](http://www.backalleycoder.com/2016/08/26/demythstifying-web-components/)
- [Micro Front-Ends](https://micro-frontends.org/) with Web Components
- [Slideshow on Micro Front-Ends](https://speakerdeck.com/naltatis/micro-frontends-building-a-modern-webapp-with-multiple-teams)
- [Custom Elements that work anywhere](https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48)
- [Does framework “x” support custom elements?](https://custom-elements-everywhere.com/)

### Style Guide Driven Design and Development (SGDDD)

- [Summary of SGDDD](https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit?usp=sharing)
- [Design Systems book](https://drive.google.com/open?id=1ZMjUQOEDbX5t5AEZ6RQi5CPZrlvYPvu5)
- [Designing Modular UI Systems via SGDDD - Smashing Magazine](https://www.smashingmagazine.com/2016/06/designing-modular-ui-systems-via-style-guide-driven-development/)
- [Style Guide Driven Development - Bitovi](https://www.bitovi.com/blog/style-guide-driven-development)
- [Comprehensive Guide to Design Systems - Invision](https://www.invisionapp.com/blog/guide-to-design-systems/)
- [Ancestry Style Guide site](http://standards.ancestry.com/)
- [Illustration of problems that Ancestry's Style Guide site resolves](https://www.ancestry.com/cs/standards/getting-started#try-it-out)
- [PluralSight's Style Guide site](http://design-system.pluralsight.com/)
- [Atomic Design System - Brad Frost](http://atomicdesign.bradfrost.com/table-of-contents/)

### Working with Web Components

- [MDN Web Components with Tutorials](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Google Web Components Fundamentals](https://developers.google.com/web/fundamentals/web-components/)
- [Google Web Component examples](https://github.com/GoogleChromeLabs/ui-element-samples)
- [Web Components tutorials](https://alligator.io/web-components/)
- [Write Web Components with ES5](https://blog.revillweb.com/write-web-components-with-es2015-es6-75585e1f2584)
- [Deploying ES6 code in production](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
- [Slideshow on Web Components](https://slides.com/sara_harkousse/web-components-talk-devoxx-france-2018#/)
- [Guide to Web Components - PluralSight](https://www.pluralsight.com/courses/vanilla-web-components-practical-guide?irgwc=1&mpid=1216269&utm_source=impactradius&utm_medium=digital_affiliate&utm_campaign=1216269&aid=7010a000001xAKZAA2)
- [Comparison of Web Components in different technologies](https://github.com/shprink/web-components-todo)
- [Custom Elements helpful resources](https://github.com/shawnbot/custom-elements)
- [Favor a declarative API](https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48)

### The build

- [How Polymer compiles for production](https://www.polymer-project.org/2.0/toolbox/build-for-production)
- [Webpack](https://webpack.js.org/)
- [RollupJS](https://rollupjs.org/)
- [ParcelJS](https://parceljs.org/)
- [Babel](https://babeljs.io/) (Note: Babel is typically used in tandem with another build tool to transpile from ES6 source to your list of supported browsers)

### Polyfills

- [Custom Elements polyfill](https://github.com/WebReflection/document-register-element) using mutation observers.
- [Suite of polyfills for Web Components](https://github.com/WebComponents/webcomponentsjs) (can be automated) and a tutorial.
- [On-demand automatic polyfill delivery system](https://polyfill.io/v2/docs/) for all the things.
- [Polymer](https://www.polymer-project.org/) (Google)
- [X-Tag](http://x-tag.github.io/) (Microsoft)
- [Core-js](https://github.com/zloirock/core-js) suite of es6 polyfills

### Potentially useful libraries

- Web Component authoring libraries:
	- [SkateJS](http://skatejs.netlify.com/)
	- [SlimJS](http://slimjs.com/)
	- [StencilJS](https://stenciljs.com/)
- Virtual DOM libraries:
	- [HyperHTML](https://viperhtml.js.org/hyper.html)
	- [Snabbdom](https://github.com/snabbdom/snabbdom)
- Universal routers:
	- [Router5](http://router5.github.io/)
	- [Navigo](https://github.com/krasimir/navigo)
	- [Universal Router](https://www.kriasoft.com/universal-router/)
- Other libraries:
	- [Eev](https://github.com/chrisdavies/eev) - Shared event bus.
