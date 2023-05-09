((app) => {
	class PostHeader extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const post = this.props.post;
			const dateFormatted = post.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

			return (<div className="header">
				<h1>{post.title}</h1>
				<div className="post-info">
					<div className="posted">Posted: {dateFormatted}</div>
					<div className="author">Author: {post.author}</div>
					<app.components.PostTagList tags={post.tags || []} />
				</div>
			</div>);
		}
	}

	app.components.PostHeader = PostHeader;
})(RnSSG);
