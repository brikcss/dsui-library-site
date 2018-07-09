import { Brik, propsMixin, renderMixin, eventsMixin, types, type } from '../brik-element';
import prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-bash';
import tpl from './code.tplit.html';
import css from './code.css.js';
import prismCss from 'prismjs/themes/prism-tomorrow.css';
import styles from '../styles/styles.js';

export default class Code extends Brik().with(propsMixin, renderMixin, eventsMixin) {
	static get props() {
		return {
			editable: types.boolean,
			lang: types.string,
			label: types.string,
			text: type(Object.assign({}, types.string, { attribute: false })),
			showHeader: type(Object.assign({}, types.boolean, { default: true }))
		};
	}

	connectedCallback() {
		// Set up.
		this.state.raw = '';
		this.css = { classes: {} };
		this.attachShadow({ mode: 'open' });
		this.render();
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-' });

		// Build dom.
		this.dom = {
			pre: this.root.querySelector('pre'),
			code: this.root.querySelector('code'),
			editor: this.parentNode.tagName === 'BRIK-EDITOR' ? this.parentNode : null
		};
		this.dataset.tab = this.lang;
		this.state.raw = this.textContent.trim();
		this.textContent = '';

		// Set default props.
		this.label = this.label || this.lang.toUpperCase();

		// If this is part of an editor element, create a tab.
		if (this.dom.editor) {
			this.showHeader = false;
		}

		// Update editability.
		if (this.editable && !this.state.listeners) {
			this.makeEditable();
		}
	}

	disconnectedCallback() {
		if (this.state.listeners) {
			this.removeEditability();
		}
	}

	get events() {
		return {
			input: () => {
				if (this.dom.editor) {
					this.dom.editor.state.dirty = true;
					this.dom.editor.render();
				}
				this.state.raw = this.dom.code.textContent;
			},
			focus: () => {
				this.text = this.state.raw;
				this.render();
			},
			blur: () => {
				this.render();
			},
			keydown: (event) => {
				if ((event.ctrlKey || event.metaKey) && event.keyCode == 13) this.refreshPreview();
			}
		};
	}

	updated(prevProps) {
		super.updated && super.updated(...arguments);
		if (prevProps.editable !== this.editable) {
			if (this.editable && !this.state.listeners) {
				this.makeEditable();
			} else if (!this.editable && this.state.listeners) {
				this.removeEditability();
			}
		}
	}

	makeEditable() {
		this.dom.code.addEventListener('input', this);
		this.dom.code.addEventListener('focus', this);
		this.dom.code.addEventListener('blur', this);
		this.dom.code.addEventListener('keydown', this);
		this.state.listeners = true;
	}

	removeEditability() {
		this.dom.code.removeEventListener('input', this);
		this.dom.code.removeEventListener('focus', this);
		this.dom.code.removeEventListener('blur', this);
		this.dom.code.removeEventListener('keydown', this);
		this.state.listeners = false;
	}

	refreshPreview() {
		this.dom.editor.state.dirty = false;
		this.dom.editor.refreshPreview();
	}

	get tpl() {
		return tpl;
	}

	rendering() {
		if (this.lang) {
			this.text = this.state.raw
				? prism.highlight(this.state.raw, prism.languages[this.lang])
				: '';
		} else {
			this.text = (this.state.raw || '').replace(/</g, '&lt;');
		}
		// console.log('HIGHLIGHT:', this.textContent);
		// console.log('HIGHLIGHT:', prism.highlight(this.textContent, prism.languages[this.lang]));
		// this.innerHTML = prism.highlight(this.textContent, prism.languages[this.lang]);
		this.cssString = [prismCss, this.css.toString()].join('\n');
	}
}
