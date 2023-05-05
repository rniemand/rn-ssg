((app) => {
	class PostsList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const postHelper = this.props.postHelper;
			const pageHelper = this.props.pageHelper;
			
			if(postHelper.selectedPost) return null;
			if(pageHelper.selectedPage) return null;


			if (postHelper.allPosts.length === 0) {
				return (<div>No posts to display</div>);
			}

			if(postHelper.loadingPost) {
				return (<div>Loading selected post</div>);
			}

			const onViewPostClickHandler = (post) => {
				this.props.onPostSelected(post);
			};

			return (<div>
				{postHelper.allPosts.slice(0, 10).map(entry => {
					return (<app.components.PostListEntry
						key={entry.id}
						entry={entry}
						onViewPostClick={onViewPostClickHandler}
					/>);
				})}
			</div>);
		}
	}

	app.components.PostsList = PostsList;
})(RnSSG);
