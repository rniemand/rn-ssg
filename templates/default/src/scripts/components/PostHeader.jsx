((app) => {
	class PostHeader extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const post = this.props.post;
      
			return (<div className="header">
				<h1>{post.title}</h1>
			</div>);
		}
	}

	app.components.PostHeader = PostHeader;
})(RnSSG);
