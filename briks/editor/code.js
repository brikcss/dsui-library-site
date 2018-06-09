import prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-bash';
import BrikElement from '../brik-element/brik.js';
import tpl from './code.tplit.html';
import css from './code.shadow.css';

export default class Code extends BrikElement {
	static get defaults() {
		return {
			editable: false,
			lang: '',
			label: '',
			text: '',
			showHeader: true
		};
	}

	static get observedAttributes() {
		return ['editable', 'lang', 'label', 'show-header'];
	}

	attributeChangedCallback(prop) {
		if (prop === 'editable') {
			this.updateEditability();
		}
		if (['editable', 'showHeader'].includes(prop) && typeof prop === 'string')
			prop = prop === 'true';
		this.render();
	}

	// Create the Custom Element.
	created() {
		// Create shadow dom and pre-render a skeleton screen.
		this.attachShadow({ mode: 'open' });
		if (typeof this.props.showHeader === 'string')
			this.props.showHeader = this.props.showHeader === 'true';
		this.render();
	}

	connectedCallback() {
		// Build dom.
		this.dom = {
			pre: this.shadowRoot.querySelector('pre'),
			code: this.shadowRoot.querySelector('code'),
			editor: this.parentNode.tagName === 'BRIK-EDITOR' ? this.parentNode : null
		};
		this.classList.add('brik-code');
		this.dataset.tab = this.props.lang;
		this.props.raw = this.textContent.trim();
		this.textContent = '';

		// Set default props.
		this.props.ticking = false;
		this.props.css = css;
		this.props.label = this.props.label || this.props.lang.toUpperCase();
		this.props.inputTimeout;

		// If this is part of an editor element, create a tab.
		if (this.dom.editor) {
			this.props.showHeader = false;
			this.classList.add('brik-code--has-tabs');
		}

		// Update editability.
		this.updateEditability();

		// Render.
		this.render();
	}

	disconnectedCallback() {
		this.updateEditability();
	}

	updateEditability() {
		this.props.editable =
			this.props.editable || this.dom.editor ? this.dom.editor.editable : false;
		if (!this.dom) return;
		if (this.props.editable) {
			this.dom.code.addEventListener('input', this.handleInput);
			this.dom.code.addEventListener('focus', this.handleFocus);
			this.dom.code.addEventListener('blur', this.handleBlur);
			this.dom.code.addEventListener('keydown', this.handleKeydown);
		} else {
			this.dom.code.removeEventListener('input', this.handleInput);
			this.dom.code.removeEventListener('focus', this.handleFocus);
			this.dom.code.removeEventListener('blur', this.handleBlur);
			this.dom.code.removeEventListener('keydown', this.handleKeydown);
		}
	}

	handleFocus() {
		this.props.text = this.props.raw;
		this.render();
	}

	handleBlur() {
		this.render();
	}

	handleInput() {
		if (this.dom.editor) {
			this.dom.editor.props.dirty = true;
			this.dom.editor.render();
		}
		this.props.raw = this.dom.code.textContent;
	}

	handleKeydown(event) {
		if ((event.ctrlKey || event.metaKey) && event.keyCode == 13) this.refreshPreview();
	}

	refreshPreview() {
		this.dom.editor.props.dirty = false;
		this.dom.editor.refreshPreview();
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		this.props.text = this.props.raw
			? prism.highlight(this.props.raw, prism.languages[this.props.lang])
			: '';
		return tpl(this.html, this, BrikElement);
	}
}
