import { Brik, renderMixin } from '../brik-element';

export default class Scroller extends Brik().with(renderMixin) {
	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	render() {
		return this.bind(this.root)`<slot></slot><style>:host {
			overflow-y: auto;
		}</style>`;
	}
}
