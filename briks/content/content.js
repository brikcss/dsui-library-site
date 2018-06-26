import BrikElement from '../brik-element/brik.js';
import styles from '../styles/styles.js';

export default class Content extends BrikElement {
	created() {
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

	// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
	// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
	// See https://viperhtml.js.org/hyperhtml/documentation/
	render(content = '', padding = '4rem') {
		this.css.update({ padding });
		this.props.content = content;
		return this.html`${[content]}<style>${this.css.toString()}</style>`;
	}
}
