const bun = {
	backgroundColor: 'var(--burger-bg, hsla(0, 0%, 100%, 1))',
	display: 'block',
	height: 'var(--burger-line-size, 0.375rem)',
	width: 'var(--burger-size, 3rem)',
	position: 'absolute',
	left: 0,
	transition: 'all 200ms cubic-bezier(0.6, 0, 0.2, 1.2)'
};
const burger = {
	button: {
		backgroundColor: 'transparent',
		border: 'none',
		height: 'var(--burger-size, 3rem)',
		width: 'var(--burger-size, 3rem)',
		cursor: 'pointer',
		position: 'relative'
	},
	top: Object.assign({}, bun, {
		willChange: 'transform, top',
		top:
			'calc(50% - (var(--burger-line-size, 0.375rem) / 2) - (var(--burger-line-size, 0.375rem) * (var(--burger-line-spacing, 1.4) + 1)))'
	}),
	bottom: Object.assign({}, bun, {
		willChange: 'transform, bottom',
		bottom:
			'calc(50% - (var(--burger-line-size, 0.375rem) / 2) - (var(--burger-line-size, 0.375rem) * (var(--burger-line-spacing, 1.4) + 1)))'
	}),
	toppings: {
		position: 'absolute',
		backgroundColor: 'var(--burger-bg, hsla(0, 0%, 100%, 1))',
		width: '100%',
		height: 'var(--burger-line-size, 0.375rem)',
		top: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))',
		right: 0,
		opacity: 1,
		willChange: 'transform',
		transition: 'transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2)'
	},
	active: {
		transform: 'rotate(360deg)',
		'& $top': {
			transform: 'rotate(135deg)',
			top: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))'
		},
		'& $bottom': {
			transform: 'rotate(-135deg)',
			bottom: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))'
		},
		'& $toppings': {
			transform: 'scaleX(0)'
		}
	}
};

export default burger;
