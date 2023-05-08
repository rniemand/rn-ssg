((app) => {
  class ViewTags extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;
      const selectedTag = app.helpers._windowHelper.getSelectedUrlTag();
      const posts = selectedTag.length == 0 ? [] : postHelper.getFilteredPosts({
        tag: selectedTag
      });

      const onTagClick = (tag) => {
        app.helpers._windowHelper.setSelectedTagUrl(pageHelper.selectedPage, tag);
        app.instance.render('Tags.onTagClick()');
      };

      const clearTagClick = () => {
        pageHelper.loadSelectedPage(pageHelper.selectedPage);
      };

      if (posts.length === 0) {
        return (<div className="post-tags">
          <h2>Showing All Tags</h2>
          {postHelper.tagNames.map(tag => {
            return (<semanticUIReact.Label key={tag} className="tag" onClick={() => onTagClick(tag)} as='a' active={selectedTag === tag}>
              <semanticUIReact.Icon name='tag' />
              {tag}
              <semanticUIReact.Label.Detail>
                {postHelper.tags[tag].postCount}
              </semanticUIReact.Label.Detail>
            </semanticUIReact.Label>);
          })}
        </div>);
      }

      return (<div className="post-tags">
        {posts.length > 0 && (<div className="posts">
          <h2>Posts Tagged With ({selectedTag}) <semanticUIReact.Icon name='close' color='red' onClick={clearTagClick} /></h2>
          <app.components.PostList posts={posts} onPostSelected={this.props.onPostSelected} />
        </div>)}
      </div>);
    }
  }

  app.components.ViewTags = ViewTags;
})(RnSSG);
