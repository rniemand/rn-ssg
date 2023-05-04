((app) => {
  class AppWrapper extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;

      const onPostSelectedHandler = (post) => {
        postHelper.loadSelectedPost(post);
      };

      return (
        <div className="rnssg">
          <table className="main">
            <tbody>
              <tr>
                <td>
                  <app.components.PostArchiveList postHelper={postHelper} onPostSelected={onPostSelectedHandler} />
                </td>
                <td>
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
