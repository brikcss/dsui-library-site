// handleEvent() lets you pass element as an EventListener, i.e.: `onclick="${}this"`. See
// https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
// When an event is triggered, it will call either: 1) this.events[name] or 2) 'on' + EventName
// (first letter capitalized), whichever it finds first.
export const eventsMixin = (Base = HTMLElement) => {
	return class extends Base {
		handleEvent(event) {
			const name = (event.currentTarget.dataset || {}).call || event.type;
			if (this.events && this.events[name]) {
				this.events[name](event);
			} else if (this['on' + name.charAt(0).toUpperCase() + name.slice(1)]) {
				this['on' + name.charAt(0).toUpperCase() + name.slice(1)](event);
			}
		}
	};
};
