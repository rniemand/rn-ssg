((app) => {
	class PostHeader extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const post = this.props.post;
			const metadata = this.props.metadata;
			const dateFormatted = post.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

			console.log('metadata', metadata)
      
			return (<div className="header">
				<h1>{post.title}</h1>
				<div className="post-info">
					<div className="posted">Posted: {dateFormatted}</div>
					<div className="author">Author: {post.author}</div>
					<app.components.PostTagList tags={metadata.tags || ''} />
				</div>
			</div>);
		}
	}

	app.components.PostHeader = PostHeader;
})(RnSSG);
