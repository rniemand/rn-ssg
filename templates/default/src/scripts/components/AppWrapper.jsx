((app) => {
  class AppWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;

      const onPostSelectedHandler = (post) => {
        pageHelper.clearSelectedPage();
        postHelper.loadSelectedPost(post);
      };

      const onPageSelectedHandler = (page) => {
        postHelper.clearSelectedPost();
        pageHelper.loadSelectedPage(page);
      };

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
                  <app.components.PostArchiveList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />
                </td>
                <td>
                  <app.components.CurrentPage pageHelper={pageHelper} />
                  <app.components.PostsList postHelper={postHelper} pageHelper={pageHelper} onPostSelected={onPostSelectedHandler} />
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
