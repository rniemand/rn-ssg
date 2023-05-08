((app) => {
  class AppWrapper extends React.Component {
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

      const onPageSelectedHandler = (page) => {
        postHelper.clearSelectedPost(true);
        pageHelper.loadSelectedPage(page);
      };

      const onListPostsClickHandler = (year, month) => {
        postHelper.clearSelectedPost(true);
        pageHelper.clearSelectedPage(true);
        postHelper.listPosts(year, month);
      }

      return (
        <div className="rnssg">
          <semanticUIReact.Container>
            <app.components.PageNav pageHelper={pageHelper} onPageSelected={onPageSelectedHandler} />
          </semanticUIReact.Container>

          <semanticUIReact.Container className="main">
            <app.components.CurrentPage pageHelper={pageHelper} />
            <app.components.Categories postHelper={postHelper} />
            <app.components.PostsList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />
            <app.components.CurrentPost postHelper={postHelper} />
          </semanticUIReact.Container>
        </div>
      );
    }
  }

  app.components.AppWrapper = AppWrapper;
})(RnSSG);
