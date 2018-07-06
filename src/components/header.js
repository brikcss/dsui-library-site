import { types } from '../../briks/brik-element';
import tpl from './header.tplit.html';
import BrikHeader from '../../briks/header/header.js';

export default class Header extends BrikHeader {
	static get props() {
		return Object.assign({}, super.props, {
			pageEditLink: types.string
		});
	}

	get tpl() {
		return tpl;
	}
}
