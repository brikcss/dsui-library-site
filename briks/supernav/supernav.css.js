const link = {
	boxSizing: 'border-box',
	fontWeight: 400,
	fontSize: '1em',
	backgroundColor: 'transparent',
	border: 0,
	color: 'var(--color__dark, hsla(0, 0%, 0%, 0.87))',
	textDecoration: 'none',
	cursor: 'pointer',
	display: 'flex',
	padding: 0,
	alignItems: 'center',
	height: '6rem',
	outline: 0,
	transition: 'background-color 250ms, color 250ms, fill 250ms',
	width: '100%'
};

const styles = {
	supernav: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%'
	},
	scroller: {
		flex: 1,
		overflowY: 'auto'
	},
	header: {
		backgroundColor: 'var(--color__brand4)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'left top',
		color: 'var(--color__light)',
		minHeight: '14rem',
		padding: '2rem 2rem 1rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	close: {
		backgroundColor: 'transparent',
		border: 0,
		display: 'block',
		fill: 'var(--color__light)',
		padding: 0,
		'& brik-icon': {
			fill: 'inherit'
		}
	},
	avatar: {
		borderRadius: '50%',
		height: '8rem',
		width: '8rem',
		marginTop: '-2rem'
	},
	username: {
		margin: '0.5rem 0 0'
	},
	logo: {
		backgroundColor: 'var(--color__supernav)',
		color: 'hsl(0, 0%, 100%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '6rem',
		outline: 0,
		'& img': {
			maxHeight: '5rem',
			maxWidth: '90%'
		}
	},
	nav: {
		flex: 1
	},
	menu: {
		height: '6rem',
		willChange: 'height',
		transition: 'height 300ms cubic-bezier(0.6, 0, 0.2, 1.1), background-color 300ms',
		overflow: 'hidden',
		position: 'relative'
	},
	link: Object.assign({}, link, {
		position: 'relative'
	}),
	divider: {
		height: 'calc(6rem - 1px)',
		borderTop: '1px solid var(--color__dark4)'
	},
	'link-label': {},
	icon: {
		fill: 'var(--color__brand1)',
		height: '3rem',
		width: '3rem',
		marginLeft: '2rem',
		marginRight: '2.5rem',
		transition: 'fill 250ms'
	},
	submenu: {},
	sublink: Object.assign({}, link, {
		paddingLeft: '7.5rem',
		transition: 'color 250ms, background-color 250ms'
	}),
	chevron: {
		height: '2.5rem',
		width: '2.5rem',
		position: 'absolute',
		right: '2rem',
		top: 'calc(50% - 1.25rem)',
		willChange: 'transform',
		transition: 'transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3), fill 250ms'
	},
	title: {
		display: 'none'
	},
	active: {},
	'active-menu': {
		backgroundColor: 'hsla(0, 0%, 0%, 0.14)',
		'& $chevron': {
			fill: 'var(--color__light)',
			transform: 'rotate(180deg)'
		}
	},
	'show-menus': {
		'& $menu': {
			height: 'auto'
		},
		'& $sublink': {
			backgroundColor: 'transparent'
		},
		'& $chevron': {
			display: ['none', '!important']
		}
	},
	'theme-dark': {
		backgroundColor: 'var(--color__supernav)',
		color: 'var(--color__light)',
		'& $link, & $sublink': {
			color: 'var(--color__light2)',
			fill: 'var(--color__supernav--icon)',
			'&:hover, &:focus': {
				color: 'var(--color__light)'
			}
		},
		'& $link:hover, & $sublink:hover': {
			backgroundColor: 'hsla(0, 0%, 0%, 0.18)'
		},
		'& $link:focus, & $sublink:focus': {
			backgroundColor: 'hsla(0, 0%, 0%, 0.24)'
		},
		'& $icon': {
			fill: 'var(--color__light2)'
		},
		'& $chevron': {
			fill: 'var(--color__light2)'
		},

		'& $link:hover $icon, & $link:focus $icon': {
			fill: 'var(--color__light)'
		},
		'& $link:hover $chevron, & $link:focus $chevron': {
			fill: 'var(--color__light)'
		},
		// '& $link:before, &$showMenus $sublink:before': {
		'& $link:before': {
			content: '""',
			display: 'block',
			backgroundColor: 'var(--color__brand3)',
			position: 'absolute',
			left: '-0.5rem',
			top: 'calc(50% - 0.25rem)',
			width: '0.5rem',
			height: 0,
			transitionProperty: 'left, top, height',
			transitionDuration: '300ms',
			transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)'
		},
		'& $link:hover:before, & $link:focus:before, & $sublink:hover:before, & $sublink:focus:before': {
			left: 0,
			top: 'calc(50% - 3rem)',
			height: '6rem',
			transitionDuration: '400ms, 300ms, 300ms'
		}
		// '&$showMenus $sublink': {
		// 	position: 'relative'
		// }
	}
};

const pinnedNav = {
	close: {
		display: 'none'
	}
};
const miniNav = {
	supernav: {
		flexDirection: 'column-reverse'
	},
	header: {
		display: 'none'
	},
	menu: {
		height: ['9rem', '!important'],
		position: 'static'
	},
	link: {
		color: 'var(--color__light2)',
		fill: 'var(--color__supernav--icon)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '1.5rem',
		height: '100%',
		position: 'relative',
		transition: 'color 350ms, background-color 350ms',
		'$menu:hover &, $menu:focus &': {
			backgroundColor: 'var(--color__supernav--dark)',
			color: 'var(--color__light)'
		},
		'&:before': {
			content: '""',
			display: 'block',
			backgroundColor: 'var(--color__brand3)',
			position: 'absolute',
			left: '-0.5rem',
			top: 'calc(50% - 0.25rem)',
			width: '0.5rem',
			height: 0,
			transitionProperty: 'left, top, height',
			transitionDuration: '300ms',
			transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)'
		},
		'$menu:hover &:before, $menu:focus &:before': {
			left: 0,
			top: 'calc(50% - 4.5rem)',
			height: '9rem',
			transitionDuration: '400ms, 300ms, 300ms'
		}
	},
	icon: {
		fill: 'inherit',
		height: '4rem',
		width: '4rem',
		transition: 'fill 350ms',
		'$menu:hover &, $menu:focus &': {
			fill: 'var(--color__light)'
		}
	},
	'link-label': {
		marginTop: '0.5rem'
	},
	logo: {
		height: '8rem',
		transition: 'background-color 250ms'
	},
	submenu: {
		backgroundColor: 'var(--color__supernav--dark)',
		height: '100vh',
		width: '30rem',
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: -1,
		willChange: 'transform',
		transform: 'translate3d(0, 0, 0)',
		transitionProperty: 'transform, box-shadow, color',
		transitionDuration: '350ms',
		transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)',
		'&:before': {
			content: '""',
			backgroundColor: 'inherit',
			position: 'absolute',
			right: '100%',
			top: 0,
			width: '4rem',
			height: '100%'
		},
		'$menu:hover &, $menu:focus &': {
			boxShadow: '0 3rem 8rem hsla(0, 0%, 0%, 0.6)',
			transform: 'translate3d(30rem, 0, 0)'
		}
	},
	sublink: {
		paddingLeft: '2rem',
		paddingRight: '2rem',
		'&:hover, &:focus': {
			backgroundColor: ['var(--color__brand3)', '!important']
		}
	},
	chevron: {
		display: ['none', '!important']
	},
	title: {
		fontWeight: 300,
		display: 'flex',
		alignItems: 'center',
		height: '8rem',
		paddingLeft: '2rem',
		paddingRight: '2rem'
	}
};

export default styles;
export { miniNav, pinnedNav };
