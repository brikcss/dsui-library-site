export default class SidebarsService {
	constructor() {
		this.left = {
			active: false,
			el: null,
		};
		this.right = {
			active: false,
			el: null,
		};
		this.parent = null;
		this.content = null;
	}

	create(id, element, options = {}) {
		options = Object.assign(
			{
				base: 'sidebars',
				left: 0,
				content: element.children.length > 2 ? 2 : 1,
				right: element.children.length > 2 ? 2 : null,
			},
			options
		);
		// Cache elements.
		this.parent = element;
		this.content = element.children[options.content];
		this.left.el = element.children[options.left];
		this.right.el = element.children[options.right];
		// Build DOM.
		this.parent.classList.add(options.base);
		if (typeof options.content === 'number') {
			this.content.classList.add(options.base + '__content');
		}
		if (typeof options.left === 'number') {
			this.left.el.classList.add(options.base + '__left');
		}
		if (typeof options.right === 'number') {
			this.right.el.classList.add(options.base + '__right');
		}
		return this;
	}

	toggle(side = 'left') {
		if (this[side].el.classList.contains('--is-active')) {
			this.close(side);
		} else {
			this.open(side);
		}
	}

	open(side = 'left') {
		this.parent.classList.add(`--${side}-active`);
		this[side].el.classList.add('--is-active');
		this[side].active = true;
	}

	close(side = 'left') {
		this.parent.classList.remove(`--${side}-active`);
		this[side].el.classList.remove('--is-active');
		this[side].active = false;
	}
}
