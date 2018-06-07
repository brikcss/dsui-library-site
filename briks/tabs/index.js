import BrikElement from '../brik-element/brik.js';
import tpl from './tabs.tplit.html';
import css from './tabs.shadow.css';

export default class Tabs extends BrikElement {
	static get defaults() {
		return {
			tabs: [],
			activeTab: ''
		};
	}

	static get observedAttributes() {
		return ['active-tab'];
	}

	attributeChangedCallback(prop, oldValue, value) {
		if (prop === 'tabs') {
			this.props.tabs = this.parseTabs(value);
		}
		this.activateTab();
	}

	// Create the Custom Element.
	created() {
		// Create shadow dom.
		this.attachShadow({ mode: 'open' });
		// Render tabs/
		// this.render();
	}

	connectedCallback() {
		// Set the css.
		this.props.css = css;
		// Parse tabs.
		this.props.tabs = this.parseTabs(this.props.tabs);
		// Default active tab to the first one.
		if (!this.props.activeTab) {
			this.props.activeTab = this.props.tabs[0].id;
		}
		// Add class to tab content elements.
		Array.from(this.children).forEach((child) => {
			child.classList.add('brik-tabs__content');
		});
		// Activate tab.
		if (this.props.tabs.length) {
			this.activateTab(this.props.activeTab);
		}
		// Render.
		this.render();
	}

	parseTabs(tabs) {
		// Cache tabs as an Array of Objects.
		tabs = tabs.split(/,\s+/);
		this.props.tabNames = [];
		tabs.forEach((tab, i) => {
			tab = tab.split(':');
			this.props.tabNames.push(tab[0]);
			tabs[i] = {
				id: tab[0],
				label: tab[1] || tab[0]
			};
		});
		return (this.props.tabs = tabs);
	}

	activateTab(tab) {
		tab = this.getActiveTab(tab);
		this.props.activeTab = tab.id;
		const tabIndex = this.props.tabNames.indexOf(tab.id);
		const activeTab = this.props.tabs.find((tab) => tab.active);
		const activeContentEl = this.querySelector('.brik-tabs__content--active');
		if (activeTab) activeTab.active = false;
		tab.active = true;
		if (activeContentEl) activeContentEl.classList.remove('brik-tabs__content--active');
		this.children[tabIndex].classList.add('brik-tabs__content--active');
		this.render();
	}

	getActiveTab(tab) {
		if (tab instanceof Object) return tab;
		if (typeof tab === 'string') tab = this.props.tabs.find((tab) => tab.id === tab);
		if (!tab) {
			tab = this.props.activeTab
				? this.props.tabs.find((tab) => tab.id === this.props.activeTab)
				: this.props.tabs[0];
		}
		return tab;
	}

	// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
	// nodes, data or attributes that change. See
	// https://viperhtml.js.org/hyperhtml/documentation/.
	render() {
		return tpl(this.html, this, BrikElement);
	}
}
