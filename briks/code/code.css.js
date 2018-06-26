export default {
	header: {
		backgroundColor: 'var(--color__brand4, hsl(0, 0%, 40%))',
		color: 'var(--color__light, hsl(0, 0%, 100%))',
		borderColor: 'var(--color__dark4)',
		borderWidth: '1px 1px 0',
		borderStyle: 'solid',
		display: 'flex',
		alignItems: 'center',
		height: '3rem',
		padding: '0 2rem'
	},
	pre: {
		lineHeight: '2rem',
		margin: '0 !important',
		padding: '2rem !important'
	},
	code: {
		padding: '0 !important',
		'&:focus': {
			outline: 'none'
		}
	}
};
