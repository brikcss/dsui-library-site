import { Brik, renderMixin } from '../brik-element';
import styles from '../styles/styles.js';

export default class Content extends Brik().with(renderMixin) {
	connectedCallback() {
		this.css = styles.createStyleSheet({
			content: {
				boxSizing: 'border-box',
				overflowY: 'auto',
				overflowX: 'hidden',
				padding: (props) => props.padding
			}
		});
		this.classList.add(this.css.classes.content);
		this.render();
	}

	render(content = '', padding = '4rem') {
		this.css.update({ padding });
		return this.bind(this.root)`${[content]}<style>${this.css.toString()}</style>`;
	}
}
