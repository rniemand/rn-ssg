((app) => {
	class PostHeader extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const post = this.props.post;
      
      console.log(post)

			return (<div>
				more to come
			</div>);
		}
	}

	app.components.PostHeader = PostHeader;
})(RnSSG);
