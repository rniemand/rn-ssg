((app) => {
	class PostsList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			if (app.state.currentMode !== 'home' && app.state.currentMode !== 'post-list') return null;
			const postHelper = this.props.postHelper;

			if (postHelper.allPosts.length === 0) return (<div>No posts to display</div>);
			if (postHelper.loadingPost) return (<div>Loading selected post</div>);

			const onViewPostClickHandler = (post) => {
				this.props.onPostSelected(post);
			};

			return (<semanticUIReact.Item.Group divided>
				{postHelper.allPosts.slice(0, 10).map(post => {
					return (<app.components.PostListEntry key={post.id} post={post} onViewPostClick={onViewPostClickHandler} />);
				})}
			</semanticUIReact.Item.Group>);
		}
	}

	app.components.PostsList = PostsList;
})(RnSSG);
