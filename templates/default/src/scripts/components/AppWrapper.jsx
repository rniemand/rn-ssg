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
          <table className="main">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <app.components.PageNav pageHelper={pageHelper} onPageSelected={onPageSelectedHandler} />
                </td>
              </tr>
              <tr>
                <td>
                  <app.components.PostArchiveList postHelper={postHelper} onPostSelected={onPostSelectedHandler} onListPostsClick={onListPostsClickHandler} />
                </td>
                <td>
                  <app.components.CurrentPage pageHelper={pageHelper} />
                  <app.components.PostsList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />
                  <app.components.CurrentPost postHelper={postHelper} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  app.components.AppWrapper = AppWrapper;
})(RnSSG);
