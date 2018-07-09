import { Brik, propsMixin, renderMixin, types } from '../brik-element';
import tpl from './editor.tplit.html';
import styles from '../styles/styles.js';
import css, { paneCss } from './editor.css.js';

export default class Editor extends Brik().with(propsMixin, renderMixin) {
	static get props() {
		return {
			livePreview: types.boolean,
			editable: types.boolean
		};
	}

	connectedCallback() {
		// Set default state.
		this.state = {
			tabs: [],
			liveMarkup: '',
			throttled: false,
			live: {},
			dirty: false
		};
		// Create dom, styles, and pre-render a skeleton screen.
		this.attachShadow({ mode: 'open' });
		this.css = styles.createStyleSheet(css, { classNamePrefix: 'brik-' });

		// Cache dom.
		this.classList.add(this.css.classes.editor);
		this.dom = {
			previewer: this.shadowRoot.querySelector('.' + this.css.classes.preview),
			window: this.shadowRoot.querySelector('.' + this.css.classes.window),
			panes: Array.from(this.children)
		};
		if (this.editable) {
			this.dom.panes.forEach((pane) => (pane.editable = true));
		}

		// Create tabs.
		this.dom.panes.forEach((pane, i) => {
			if (this.dom.panes.length > 1) {
				styles.createRule(paneCss({ active: false, index: i })).applyTo(pane);
			}
			this.state.tabs.push({
				id: pane.lang,
				label: pane.label || pane.getAttribute('label') || pane.lang.toUpperCase(),
				index: i
			});
		});

		// Activate tab.
		this.activateTab(this.state.tabs[0]);

		// Live preview.
		if (this.livePreview) this.refreshPreview();
	}

	activateTab(tab) {
		// De-activate previously active tab.
		if (this.state.activeTab) {
			styles
				.createRule(paneCss({ active: false, index: this.state.activeTab.index }))
				.applyTo(this.dom.panes[this.state.activeTab.index]);
		}
		// Activate new tab.
		this.state.activeTab = tab;
		styles
			.createRule(paneCss({ active: true, index: this.state.activeTab.index }))
			.applyTo(this.dom.panes[this.state.activeTab.index]);
		// Re-render.
		this.render();
	}

	refreshPreview() {
		if (!this.livePreview) return;
		if (!this.state.throttled) {
			let insertScript = false;
			this.state.liveMarkup = '';
			this.dom.panes.forEach((pane, i) => {
				let code = pane.textContent || pane.state.raw;
				// Create new content.
				if (this.state.tabs[i].id === 'html') {
					this.state.liveMarkup += code;
				}
				if (this.state.tabs[i].id === 'css') {
					this.state.liveMarkup += '<style>' + code + '</style>';
				}
				if (this.state.tabs[i].id === 'js') {
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
			this.state.throttled = true;
			setTimeout(() => {
				this.state.throttled = false;
			}, 200);
		}
	}

	get tpl() {
		return tpl;
	}
}
