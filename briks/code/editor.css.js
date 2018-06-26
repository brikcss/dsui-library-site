export default {
	editor: {
		display: 'block'
	},
	header: {
		backgroundColor: 'var(--color__brand4, hsl(0, 0%, 40%))',
		color: 'var(--color__light, hsl(0, 0%, 100%))',
		borderColor: 'var(--color__dark4)',
		borderWidth: '1px 1px 0',
		borderStyle: 'solid',
		display: 'flex',
		alignItems: 'center',
		height: '3rem',
		padding: '0 1rem',
		position: 'relative',
		zIndex: 2
	},
	tabs: {
		flexGrow: 1
	},
	tab: {
		cursor: 'pointer',
		height: '3rem',
		appearance: 'none',
		backgroundColor: 'transparent',
		border: 'none',
		color: 'var(--color__light2)',
		fontSize: '1em',
		fontWeight: '400',
		textTransform: 'none',
		'& + $tab': {
			marginLeft: '0.25rem'
		},
		'&:focus': {
			outlineWidth: '2px',
			outlineStyle: 'solid'
		},
		'&:active': {
			outline: 'none'
		}
	},
	'tab--active': {
		color: 'var(--color__light1)'
	},
	preview: {
		borderColor: 'var(--color__dark4)',
		borderWidth: '1px 1px 0',
		borderStyle: 'solid',
		padding: 'calc(2rem - 1px) 2rem 2rem',
		position: 'relative'
	},
	window: {
		display: 'flex',
		backgroundColor: 'hsl(220, 13%, 18%)',
		color: 'var(--color__light)'
	},
	toolbar: {
		color: 'var(--color__light2)'
	},
	refresh: {}
};

export const paneCss = (props) => {
	return {
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		minWidth: '100%',
		marginTop: 0,
		marginLeft: props.index === 0 ? 0 : '-100%',
		opacity: props.active ? 1 : 0,
		zIndex: props.active ? 0 : 1,
		transition: 'opacity 0.3s, transform 0.25s'
	};
};
