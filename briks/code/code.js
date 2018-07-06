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
			text: types.string,
			showHeader: type(Object.assign({}, types.boolean), { default: true })
		};
	}

	static get observedAttributes() {
		return ['editable', 'lang', 'label', 'show-header'];
	}

	connectedCallback() {
		// Create default state.
		this.state.raw = '';

		// Create styles and dom.
		this.attachShadow({ mode: 'open' });
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-' });
		if (typeof this.showHeader === 'string') this.showHeader = this.showHeader === 'true';
		this.render();

		// Build dom.
		this.dom = {
			pre: this.shadowRoot.querySelector('pre'),
			code: this.shadowRoot.querySelector('code'),
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
		this.updateEditability();

		// Render.
		this.render();
	}

	disconnectedCallback() {
		this.updateEditability();
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
		if (prevProps.editable !== this.props.editable) {
			this.updateEditability();
		}
	}

	updateEditability() {
		this.editable = this.editable || this.dom.editor ? this.dom.editor.editable : false;
		if (!this.dom) return;
		if (this.editable) {
			this.dom.code.addEventListener('input', this);
			this.dom.code.addEventListener('focus', this);
			this.dom.code.addEventListener('blur', this);
			this.dom.code.addEventListener('keydown', this);
		} else {
			this.dom.code.removeEventListener('input', this);
			this.dom.code.removeEventListener('focus', this);
			this.dom.code.removeEventListener('blur', this);
			this.dom.code.removeEventListener('keydown', this);
		}
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
		this.cssString = [prismCss, this.css.toString()].join('\n');
	}
}
