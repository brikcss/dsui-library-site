export default (props) => {
	const styles = {
		sidebar: {
			display: 'block',
			backgroundColor: `var(--sidebar-${props.side}-bg)`,
			height: '100vh',
			width: `var(--sidebar-${props.side}-width)`,
			minWidth: `var(--sidebar-${props.side}-width)`,
			[`margin-${props.side}`]: `calc(-1 * var(--sidebar-${props.side}-width))`,
			position: 'relative',
			willChange: 'transform, box-shadow',
			transform: 'translate3d(0, 0, 0)',
			transitionProperty: 'transform, box-shadow',
			transitionDuration: '350ms',
			transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)',
			zIndex: '10',
			'&:before': {
				content: '""',
				backgroundColor: 'inherit',
				position: 'absolute',
				top: 0,
				bottom: 0,
				[props.side]: '-40px',
				width: '40px'
			}
		},
		active: {
			boxShadow:
				'0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11)',
			transform: `translate3d(${
				props.side === 'right'
					? 'calc(-1 * var(--sidebar-right-width))'
					: 'var(--sidebar-left-width)'
			}, 0, 0)`
		},
		pushed: {
			transform: `translate3d(${
				props.side === 'left'
					? 'calc(-1 * var(--sidebar-left-push))'
					: 'var(--sidebar-right-push)'
			}, 0, 0)`
		}
	};

	if (props.miniAt) {
		const miniQuery =
			props.miniAt.indexOf('@') === 0 ? props.miniAt : `@media (min-width: ${props.miniAt})`;
		styles[miniQuery] = {
			sidebar: {
				width: 'var(--sidebar-mini-width)',
				minWidth: 'var(--sidebar-mini-width)',
				boxShadow: [
					'0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11)',
					'!important'
				],
				[`margin-${props.side}`]: 0,
				zIndex: 1,
				transform: ['none', '!important']
			}
		};
	}

	if (props.pinAt) {
		const pinQuery =
			props.pinAt.indexOf('@') === 0 ? props.pinAt : `@media (min-width: ${props.pinAt})`;
		styles[pinQuery] = {
			sidebar: {
				boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.12)',
				width: `var(--sidebar-${props.side}-width)`,
				minWidth: `var(--sidebar-${props.side}-width)`,
				[`margin-${props.side}`]: 0,
				zIndex: 1,
				transform: ['none', '!important']
			}
		};
	}

	return styles;
};
