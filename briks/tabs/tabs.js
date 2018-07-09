import { Brik, propsMixin, renderMixin, eventsMixin, types, empty } from '../brik-element';
import tpl from './tabs.tplit.html';
import css from './tabs.shadow.css';

export default class Tabs extends Brik().with(propsMixin, renderMixin, eventsMixin) {
	static get props() {
		return {
			tabs: {
				attribute: true,
				default: [],
				coerce: (val) => (Array.isArray(val) ? val : empty(val) ? null : [val]),
				deserialize: (value) => value.split(/,\s+/),
				serialize: (values) => values.map((value) => value.label || value.id).join(',')
			},
			activeTab: types.string
		};
	}

	connectedCallback() {
		// Set up state.
		this.state.tabNames = [];
		// Create shadow dom.
		this.attachShadow({ mode: 'open' });
		// Set the css.
		this.css = css;
		// Parse tabs.
		this.tabs = this.parseTabs(this.tabs);
		// Default active tab to the first one.
		if (!this.activeTab && this.tabs.length) {
			this.activeTab = this.tabs[0].id;
		}
		// Add class to tab content elements.
		Array.from(this.children).forEach((child) => {
			child.classList.add('brik-tabs__content');
		});
		// Render.
		this.render();
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.events.onButtonClick);
	}

	get events() {
		return {
			onButtonClick: (event) => {
				this.activeTab = event.currentTarget.dataset.tab;
			}
		};
	}

	updated(prevProps) {
		if (prevProps.activeTab !== this.activeTab) {
			this.activateTab();
		}
	}

	parseTabs(tabs) {
		// Cache tabs as an Array of Objects.
		this.state.tabNames = [];
		tabs.forEach((tab, i) => {
			tab = tab.split(':');
			tabs[i] = {
				id: tab[0].toLowerCase(),
				label: tab[1] || tab[0]
			};
			this.state.tabNames.push(tabs[i].id);
		});
		return (this.tabs = tabs);
	}

	activateTab(tab) {
		tab = this.getActiveTab(tab);
		this.activeTab = tab.id;
		const tabIndex = this.state.tabNames.indexOf(tab.id);
		const activeTab = this.tabs.find((tab) => tab.active);
		const activeContentEl = this.querySelector('.brik-tabs__content--active');
		if (activeTab) activeTab.active = false;
		tab.active = true;
		if (activeContentEl) activeContentEl.classList.remove('brik-tabs__content--active');
		this.children[tabIndex].classList.add('brik-tabs__content--active');
		this.render();
	}

	getActiveTab(tab) {
		if (tab instanceof Object) return tab;
		if (typeof tab === 'string') tab = this.tabs.find((tab) => tab.id === tab);
		if (!tab) {
			tab = this.activeTab
				? this.tabs.find((tab) => tab.id === this.activeTab)
				: this.tabs[0];
		}
		return tab;
	}

	get tpl() {
		return tpl;
	}
}
