import BrikElement from '../brik-element/brik.js';

export default class Content extends BrikElement {
	// Each key correlates to a route and sets the markup for that route. Each value can be a string
	// or a Promise to return a string. Use HyperHTML to efficiently render the DOM.
	get content() {
		return {
			home: '<h2>Home page</h2>',
			about: [
				new Promise((resolve) => {
					setTimeout(() => {
						if (this.router.getState().name === 'about') {
							resolve('<h2>About us</h2>');
						}
					}, 2000);
				}),
				'<p>This is all about us.</p>'
			],
			user: () => {
				return new Promise((resolve) => {
					return setTimeout(() => {
						this.props.user = 'Sam';
						if (this.router.getState().name === 'user') {
							resolve([`<p>${this.props.user}'s page.</p>`]);
						}
						return;
					}, 1500);
				});
			},
			loading: '<h2>Loading...</h2>'
		};
	}

	// Element constructor.
	created() {
		// this.attachShadow({ mode: 'open' });
		this.render(this.router.getState().name);
		this.router.addNodeListener('', (to) => {
			this.render(to.name);
		});
	}

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render(content = '') {
		content = this.content[content];
		if (typeof content !== 'string') this.render('loading');
		if (typeof content === 'function') content = content();
		if (typeof content === 'string') content = [content];
		if (!content) content = '<h2>Uh oh... not found...</h2>';
		return this.html`${BrikElement.wire(this)`${content}`}`;
	}

	get router() {
		return this.parentNode.parentNode.router;
	}
}
