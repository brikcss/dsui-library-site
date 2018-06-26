export default (props) => {
	return {
		display: 'inline-flex',
		verticalAlign: 'text-bottom',
		height: props.size,
		width: props.size,
		fill: props.fill,
		stroke: props.stroke
	};
};
