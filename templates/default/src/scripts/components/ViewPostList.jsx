((app) => {
	class ViewPostList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const postHelper = this.props.postHelper;

			if (postHelper.allPosts.length === 0)
				return (<div>No posts to display</div>);

			if (postHelper.loadingPost)
				return (<div>Loading selected post</div>);

			let urlSegments = this._getUrlSegments();
			let title = app.state.layout !== 'archives' ? 'Posts (Latest)' : 'Archives';
			const onViewPostClickHandler = (post) => { this.props.onPostSelected(post); };

			if (urlSegments.length == 4) {
				if (urlSegments[3] === 'all') {
					title = `Posts from ${urlSegments[2]}`;
				} else {
					title = `Posts from ${urlSegments[2]}-${urlSegments[3].padStart(2, '0')}`;
				}
			}

			return (<div className="post-list">
				<h1>{title}</h1>

				<div className="bc-filter">
					<ul>
						<li key='latest' onClick={postHelper.clearSelectedPost}>Latest</li>
						{Object.keys(postHelper.postsIndex).map(year => {
							return (<li key={year} onClick={() => postHelper.listPosts(year, 'all')}>{year}</li>);
						})}
					</ul>
				</div>

				{urlSegments.length === 4 && urlSegments[3] !== 'add' && (
					<div className="bc-filter">
						<ul>
							<li key='all' onClick={() => postHelper.listPosts(urlSegments[2], 'all')}>All</li>
							{Object.keys(postHelper.postsIndex[urlSegments[2]]).map(month => {
								return (<li key={month} onClick={() => postHelper.listPosts(urlSegments[2], month)}>{month.padStart(2, '0')}</li>);
							})}
						</ul>
					</div>
				)}

				<semanticUIReact.Item.Group divided>
					{this._getFilteredPosts().map(post => {
						return (<app.components.PostListEntry key={post.id} post={post} onViewPostClick={onViewPostClickHandler} />);
					})}
				</semanticUIReact.Item.Group>
			</div>);
		}

		_getFilteredPosts = () => {
			const postHelper = this.props.postHelper;
			const urlSegments = this._getUrlSegments();
			if (!urlSegments || urlSegments.length < 4) return postHelper.allPosts.slice(0, 10);
			if (urlSegments[3] === 'all') return postHelper.allPosts.filter(x => x.postYear == urlSegments[2]);
			return postHelper.allPosts.filter(x => x.postYear == urlSegments[2] && x.postMonth == urlSegments[3]);
		}

		_getUrlSegments = () => {
			let urlSegments = app.helpers._windowHelper.getUrlHash().split('/');

			if (app.state.layout === 'archives') {
				if (urlSegments[1] !== 'posts') return [];
			}

			return urlSegments;
		};
	}

	app.components.ViewPostList = ViewPostList;
})(RnSSG);
