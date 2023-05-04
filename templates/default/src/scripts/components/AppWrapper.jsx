((app) => {
  class AppWrapper extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;

      return (
        <div className="core-app">
          <table className="main">
            <tbody>
              <tr>
                <td>
                  <div>Posts List</div>
                  <ul>
                    {Object.keys(postHelper.postsIndex).map(year => {
                      return (<li key={year}>
                        {year}
                        <ul>
                          {Object.keys(postHelper.postsIndex[year]).map(month => {
                            return(<li key={`${year}-${month}`}>
                              {year}-{month} ({postHelper.postsIndex[year][month].length} posts)
                              <ul>
                                {postHelper.postsIndex[year][month].map(postInfo => {
                                  return(<li key={postInfo._id}>{postInfo.title}</li>);
                                })}
                              </ul>
                            </li>);
                          })}
                        </ul>
                      </li>);
                    })}
                  </ul>
                </td>
                <td>
                  <div>POST Content here</div>
                  <app.components.PostsList postHelper={postHelper} />
                  <app.components.CurrentPost postHelper={postHelper} />
                  <h1 id="title"></h1>
                  <div id="date"></div>
                  <div id="tags"></div>
                  <div id="toc"></div>
                  <div id="content"></div>
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
