import BrikElement from '../brik-element/brik.js';
import tpl from './editor.tplit.html';
import styles from '../styles/styles.js';
import css, { paneCss } from './editor.css.js';

export default class Editor extends BrikElement {
	static get defaults() {
		return {
			livePreview: false,
			editable: false
		};
	}

	static get observedAttributes() {
		return ['live-preview', 'editable', 'lang'];
	}

	// Create the Custom Element.
	created() {
		// Create dom, styles, and pre-render a skeleton screen.
		this.attachShadow({ mode: 'open' });
		this.props.tabs = [];
		this.props.liveMarkup = '';
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-' });
		this.render();

		// Cache dom.
		this.classList.add(this.css.classes.editor);
		this.dom = {
			previewer: this.shadowRoot.querySelector('.' + this.css.classes.preview),
			window: this.shadowRoot.querySelector('.' + this.css.classes.window),
			panes: Array.from(this.children)
		};
		if (this.props.editable) {
			this.dom.panes.forEach((pane) => (pane.editable = true));
		}

		// Set default props.
		this.props.ticking = false;
		this.props.throttled = false;
		this.props.live = {};
		this.props.dirty = false;

		// Create tabs.
		this.props.tabs = [];
		this.dom.panes.forEach((pane, i) => {
			if (this.dom.panes.length > 1) {
				styles.createRule(paneCss({ active: false, index: i })).applyTo(pane);
			}
			this.props.tabs.push({
				id: pane.lang,
				label: pane.label || pane.getAttribute('label') || pane.lang.toUpperCase(),
				index: i
			});
		});

		// Activate tab.
		this.activateTab(this.props.tabs[0]);

		// Live preview.
		if (this.props.livePreview) this.refreshPreview();

		// Render.
		this.render();
	}

	/**
	 *  Activate a tab.
	 *  @param   {String}  tab  Name of tab to activate.
	 */
	activateTab(tab) {
		// De-activate previously active tab.
		if (this.props.activeTab) {
			styles
				.createRule(paneCss({ active: false, index: this.props.activeTab.index }))
				.applyTo(this.dom.panes[this.props.activeTab.index]);
		}
		// Activate new tab.
		this.props.activeTab = tab;
		styles
			.createRule(paneCss({ active: true, index: this.props.activeTab.index }))
			.applyTo(this.dom.panes[this.props.activeTab.index]);
		// Re-render.
		this.render();
	}

	refreshPreview() {
		if (!this.props.livePreview) return;
		if (!this.props.throttled) {
			let insertScript = false;
			this.props.liveMarkup = '';
			this.dom.panes.forEach((pane, i) => {
				let code = pane.textContent || pane.props.raw;
				// Create new content.
				if (this.props.tabs[i].id === 'html') {
					this.props.liveMarkup += code;
				}
				if (this.props.tabs[i].id === 'css') {
					this.props.liveMarkup += '<style>' + code + '</style>';
				}
				if (this.props.tabs[i].id === 'js') {
					insertScript = code;
				}
			});
			// To re-execute a script, it must be removed and re-inserted into the dom. So we render
			// everything else first, then if JS exists we remove and append it.
			this.render();
			if (insertScript) {
				const currentScript = this.dom.previewer.querySelector('script');
				const script = document.createElement('script');
				try {
					script.appendChild(document.createElement(insertScript));
				} catch (e) {
					script.text = insertScript;
				}
				if (currentScript) this.dom.previewer.removeChild(currentScript);
				this.dom.previewer.appendChild(script);
			}
			this.props.throttled = true;
			setTimeout(() => {
				this.props.throttled = false;
			}, 200);
		}
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		return tpl(this.html, this, BrikElement);
	}
}
