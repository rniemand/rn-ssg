((app) => {
	class PostsList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const postHelper = this.props.postHelper;
			const pageHelper = this.props.pageHelper;

			if (postHelper.selectedPost) return null;
			if (pageHelper.selectedPage) return null;


			if (postHelper.allPosts.length === 0) {
				return (<div>No posts to display</div>);
			}

			if (postHelper.loadingPost) {
				return (<div>Loading selected post</div>);
			}

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
