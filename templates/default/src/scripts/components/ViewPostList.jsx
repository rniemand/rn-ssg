((app) => {
	class ViewPostList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (<div>
				posts list here
			</div>);
		}
	}

	app.components.ViewPostList = ViewPostList;
})(RnSSG);
