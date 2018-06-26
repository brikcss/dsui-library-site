const header = (hideAt) => {
	const burgerStyles = {
		display: 'block',
		marginRight: '2rem'
	};
	if (hideAt) {
		burgerStyles[`@media (min-width: ${hideAt})`] = {
			display: ['none', '!important']
		};
	}
	return {
		header: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			height: 'var(--header-height, 8rem)',
			minHeight: 'var(--header-height, 8rem)',
			padding: 'var(--header-padding, 0 4rem)',
			backgroundColor: 'var(--header-fill, hsl(194, 76%, 65%))',
			color: 'var(--header-color, hsl(0, 0%, 100%))',
			boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.3)'
		},
		left: {
			display: 'flex',
			alignItems: 'center',
			flexGrow: 1
		},
		content: {
			display: 'flex',
			alignItems: 'center'
		},
		burger: burgerStyles,
		title: {
			fontWeight: 400,
			display: 'flex',
			alignItems: 'center',
			color: 'var(--color__light)'
		},
		icon: {
			fill: 'var(--color__light)'
		}
	};
};

export default header;
