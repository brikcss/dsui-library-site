export default (props) => {
	return {
		display: 'inline-flex',
		height: props.size,
		width: props.size,
		fill: props.fill,
		stroke: props.stroke
	};
};
