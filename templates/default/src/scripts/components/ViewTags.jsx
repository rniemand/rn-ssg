((app) => {
  class ViewTags extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;
      const selectedTag = app.helpers._windowHelper.getSelectedUrlTag();

      // if (selectedTag.length > 0) {
      //   postHelper.getFilteredPosts({
      //     tag: selectedTag
      //   });
      // }

      const onTagClick = (tag) => {
        app.helpers._windowHelper.setSelectedTagUrl(pageHelper.selectedPage, tag);
        app.instance.render('Tags.onTagClick()');
      };

      return (<div className="post-tags">
        <h2>Tags</h2>
        {postHelper.tagNames.map(tag => {
          return (<semanticUIReact.Label key={tag} className="tag" onClick={() => onTagClick(tag)} as='a'>
            <semanticUIReact.Icon name='tag' />
            {tag}
            <semanticUIReact.Label.Detail>
              {postHelper.tags[tag].postCount}
            </semanticUIReact.Label.Detail>
          </semanticUIReact.Label>);
        })}
      </div>);
    }
  }

  app.components.ViewTags = ViewTags;
})(RnSSG);
