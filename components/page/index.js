export default class icon extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		const wrapper = document.createElement('span');
		wrapper.setAttribute('class', 'wrapper');
		wrapper.textContent = this.getAttribute('text');

		const style = document.createElement('style');
		style.textContent = `.wrapper {
			color: blue;
			padding: 1rem;
		}`;

		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}
