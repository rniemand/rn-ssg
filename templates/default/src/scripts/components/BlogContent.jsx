((app) => {
  class BlogContent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;

      const onPostSelectedHandler = (post) => {
        pageHelper.clearSelectedPage(true);
        postHelper.loadSelectedPost(post);
      };

      app.logger.debug(`Current page layout: ${app.state.layout}`);
      switch (app.state.layout.toLowerCase()) {
        case 'page': return (<app.components.ViewPage pageHelper={pageHelper} />);
        case 'post': return (<app.components.ViewPost postHelper={postHelper} />);
        case 'posts': return (<app.components.ViewPostList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />);
        case 'categories': return (<app.components.ViewCategories postHelper={postHelper} pageHelper={pageHelper} onPostSelected={onPostSelectedHandler} />);
        case 'tags': return (<app.components.ViewTags postHelper={postHelper} pageHelper={pageHelper} onPostSelected={onPostSelectedHandler} />);
        case 'archives': return (<app.components.ViewPostList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />);

        default: return (<div>
          <h1>Unsupported Page Layout</h1>
          <p>The page layout <strong>{app.state.layout}</strong> is not supported!</p>
        </div>);
      }
    }
  }

  app.components.BlogContent = BlogContent;
})(RnSSG);
