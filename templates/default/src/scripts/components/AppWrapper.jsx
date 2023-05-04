((app) => {
  class AppWrapper extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;

      return (
        <div className="core-app">
          <p>This is a placeholder FOR the application!</p>
          <p>post index loaded: <strong>{postHelper.postIndexLoaded ? 'yes' : 'no'}</strong></p>
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
        </div>
      );
		}
	}

  app.components.AppWrapper = AppWrapper;
})(RnSSG);
